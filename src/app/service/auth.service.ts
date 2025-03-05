import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { throwError, timer } from 'rxjs';
import { catchError, switchMap, takeWhile } from 'rxjs/operators';
import { Login } from 'app/models/data.model';
import { TransactionService } from './transaction.service';
// import * as sha256 from 'sha256';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  public Role: string;
  name: string;
  branch: string;
  id: number;
  password: string;
  res: Login;
  incorrect: boolean = false;
  tra: boolean = false;
  suspended: boolean = false;
  roleincorrect: boolean = false;

  public locked:boolean=false;
  private MAX_FAILED_ATTEMPTS = 10;
  private failedAttempts: { [username: string]: number } = {};
  public accountLocked: { [username: string]: boolean } = {};

  newUser:Login={
    id: 0,
    branch: "",
   fullName: "",
    userName: "",
    password: "",
    role: "",
    branchCode:"",
    updatedBy:"",
    updatedDate:"",
    status:"",
  };
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private transactionService: TransactionService
  ) {}


ngOnInit(){
this.startTokenExpirationTimer()
}

  login(username: string, password: string) {
    this.loginService.getAll().pipe(
   
      switchMap(userExists => {  
         console.log("username",username,userExists)
        const userExistsInMainList = userExists.find(t => t.userName === username);
        if (!userExistsInMainList)
           {
            console.log("userExistsInMainList",userExistsInMainList)
          // User not found in the main list, attempt to fetch user details from another database
          return this.transactionService.GetUserDetailByUserName(username).pipe(
            switchMap(userData => {
              // User found in the other database, register with suspended status
              this.newUser.status = 'Suspended';
              this.newUser.branch = userData.brancH_NAME;
              this.newUser.branchCode = userData.branch ? userData.branch.toString().trim().replace(/^0+/, '') : '';
              this.newUser.role = userData.role ? userData.role.toString().trim().replace(/^0+/, '') : '';
              this.newUser.fullName = userData.fulL_NAME;
              this.newUser.updatedBy = "login";
              this.newUser.updatedDate = Date.now().toString();
              this.newUser.password = '123456';
              this.newUser.userName = username;

              console.log("New User Data:", this.newUser);

              // Register user with suspended status
              return this.loginService.register(this.newUser).pipe(
                switchMap(() => {
                  console.log("User registered with suspended status");
                  this.suspended = true;
                  setTimeout(() => this.resetStatusFlags(), 60000);
           // Reset after 1 minute
this.loginService.getAll()
.subscribe({
    next: (t) => {
      userExists=t
         },
    error(response) {
      console.log(response);
    },
  });
 
           
                  return throwError(new Error('User registered with suspended status')); // Continue throwing error to handle suspended message
                })
              );
            }),
            catchError(err => {
              // User not found in either database
              console.error(`User ${username} not found in any database`);
              this.incorrect = true;
              setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 minute
              return throwError(new Error('User not found'));
            })
          );
        }
        
        else {
          if (userExistsInMainList && (userExistsInMainList.status === 'Suspended')) {
           this.suspended=true;
           setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 minute
    
            return;
          }
          else if (userExistsInMainList && (userExistsInMainList.status === 'Locked')) {
            this.locked=true;
            setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 minute
    
          return;
          }
          else{   // User found in the main list, proceed with login attempt
          return this.loginService.login(username, password).pipe(
            catchError(error => {
              if (error.status == 401) {
                // Handle 401 errors (e.g., too many failed login attempts)
                this.handleLoginFailures(username);
              } else {
                // Handle other login errors
                this.incorrect = true;
                setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 minute
                console.error('Login failed:', error);
                return throwError(error);
              }
            })
          );
        }}
      })
    )
    .subscribe(response => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.userData));
        
        this.name = response.userData.userName;
        this.id = response.userData.id;
        this.branch = response.userData.branchCode;
        this.password = response.userData.password;
        this.Role = response.userData.role;
        console.log('rolesss', this.Role);
        
        if (response.userData.status == 'suspended') {
          this.suspended = true;
          console.log('User is suspended');
          // Handle suspended user state
        } else {
          if (this.Role === 'Admin') {
            this.tra = true;
            this.isAuthenticated = true;
            this.router.navigate(['/Admin']);
          }   else if (this.Role === 'User') {
            this.tra = true;
            this.isAuthenticated = true;
            this.router.navigate(['/Reconcilation']);
          }
           else {
            this.getUserData().subscribe({
              next: (tra) => {
                if (tra) {
                  this.tra = true;
                  this.isAuthenticated = true;
                  console.log('rolesss', this.Role);
                  if (this.Role === 'User') {
                    console.log('Navigating to Request');
                    this.router.navigate(['/', 'Reconcilation']);
                  } else if (this.Role === '0048' || this.Role === '0041' || this.Role === '0049') {
                    console.log('Navigating to Approval');
                    this.router.navigate(['/', 'WithdrawalManager']);
                  } else if (this.Role === '0078') {
                    console.log('Navigating to Approval');
                    this.router.navigate(['/', 'WithdrawalHistory']);
                  } else {
                    console.log('Unknown role');
                    this.roleincorrect=true;
                    // Handle unknown roles
                  }
                  this.startTokenExpirationTimer();
                } else {
       
                  console.error('User data not found');
                  this.logout();
                }
              },
              error: (err) => {
                this.transactionService.GetUserDetailByUserName(response.userData.userName).subscribe({
                  next: (userDetail) => {
                    if (userDetail) {
                      response.userData.branchCode=userDetail.branch;
                      response.userData.role=userDetail.role;
                      response.userData.branch=userDetail.brancH_NAME;
                      response.userData.status="Suspended";
                      this.loginService.updateAdminUser(response.userData,response.userData.id).subscribe({
                        next: (updatedUserDetail) => {
                          this.suspended = true;
                          setTimeout(() => this.resetStatusFlags(), 60000); // Reset after 1 minute
                      
                        },
                        error: (updateError) => {
                          console.error('Error updating user detail:', updateError);
                          this.logout();
                        }
                      });
                    } else {
                      console.error('User detail not found by username');
                      this.logout();
                    }
                  },
                  error: (err) => {
                    console.error('Error fetching user detail by username:', err);
                    this.logout();
                  }
                });
                console.error('Error fetching user data:', err);
                this.logout();
              }
            });
          }
        }
      } else {
        console.error('Login failed: Invalid response');
      }
    });
  }

  handleLoginFailures(username: string) {
    this.incorrect = true;
    if (!this.failedAttempts[username]) {
      this.failedAttempts[username] = 0; // Initialize if not exists
    }
    
    this.failedAttempts[username]++;
    setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 minute
    console.log(`Failed attempts for ${username}:`, this.failedAttempts[username]);

    if (this.failedAttempts[username] >= this.MAX_FAILED_ATTEMPTS) {
      this.accountLocked[username] = true;
      this.locked = true;
      setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 minute
      console.error(`Account for ${username} locked due to too many failed login attempts`);

      // Update user status to "Locked" in backend
      this.loginService.getAll().pipe(
        switchMap(userData => {
          const user = userData.find(t => t.userName === username);
          if (user) {
            user.status = 'Locked';
            return this.loginService.updateAdminUser(user, user.id).pipe(
              switchMap(() => {
                console.error(`User ${username} status updated to Locked`);
                return throwError(new Error(`Account for ${username} locked due to too many failed login attempts`));
              })
            );
          } else {
            console.error(`User ${username} not found for locking`);
            return throwError(new Error(`User ${username} not found for locking`));
          }
        })
      ).subscribe({
        error: error => {
          console.error('Error locking account:', error);
        }
      });
    }
  }
  getUserData() {
    const role = this.getrole();
    const branch = this.getbranch();
    const user = this.getuser();
    console.log('r,b,u',role,branch,user);
    return this.transactionService.getUserDetails(branch, user, role);
  }

  getincorrect(): boolean {
    return this.incorrect;
  }

  getrole(): string {
    return this.Role;
  }

  getbranch(): string {
    return this.branch;
  }

  getuser(): string {
    return this.name;
  }

  getid(): number {
    return this.id;
  }

  getpassword(): string {
    return this.password;
  }
  hashPassword(password: string): string {
    // Basic hashing function (not very secure)
    let hash = 0;
    if (password.length == 0) return hash.toString();
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash &= hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
  getres(): Login {
    this.res = JSON.parse(localStorage.getItem('userData'));
    return this.res;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.Role = '';
    this.router.navigate(['/login']);
  }

  isitAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public startTokenExpirationTimer(): void {
    this.tra=true
    const token = localStorage.getItem('token');
  
  // If token does not exist, log out the user
  if (!token) {
    console.log("token1",token)
    this.logout();
    return;
  }
  console.log("token2",token)
  // Token exists, check if it's valid
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('Invalid token format');
    this.logout();
    return;
  }

  const payload = JSON.parse(atob(tokenParts[1]));
  if (!payload || !payload.exp) {
    console.error('Expiration time not found in token payload');
    this.logout();
    return;
  }

  // Check if token is expired
  const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
  const currentTime = Date.now();

  // If token is expired, log out immediately
  if (expirationTime <= currentTime) {
    console.log("tokenexpired")
    this.logout();
    return;
  }

  // If token is valid, set up a timer to refresh it
  const refreshTime = expirationTime - currentTime - 5 * 60 * 1000; // Refresh 5 mins before expiration
  if (refreshTime > 0) {
    timer(refreshTime).subscribe(() => {
      this.refreshToken();
    });
  }
}

  
  private refreshToken() {
    // Trigger the login flow again to get a new token
    const username = this.getuser();
    const password = this.getpassword();
    this.login(username, password); // Re-login to get a new token
  }
  
  
  private resetStatusFlags(): void {
    this.incorrect = false;
    this.locked = false;
    this.suspended = false;
    this.roleincorrect = false;
  }
}
