import { Component } from '@angular/core';
import { Login } from 'app/models/data.model';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userAdded:boolean=false;
  usedReset:boolean=false;
  userDeleted:boolean=false;
  userUnsuspended:boolean=false;
  useredit:boolean=false;
  users:Login[]=[]
  singleUser:Login
  suspendedUsers:Login[]=[]
    selectedUserDelete:number;
  selectedUserReset:number;
  selectedUserUnsuspend:number;
  unsuspendedUsers:Login[]=[]

  selectedUserUnlocked:number;
  lockedUsers:Login[]=[]
  userUnlocked:boolean=false;

  lockUserData:Login = { 
    id: 0,
    userName: "",
    password: " ",
    role: "",
    updatedBy:"",
    updatedDate:" ",
    status:"",
    branch:"",
    fullName:"" ,
    branchCode:"" , };

    resetUserData:Login = { 
      id: 0,
      userName: "",
      password: " ",
      role: "",
      updatedBy:"",
      updatedDate:" ",
      status:"",
      branch:"",
      fullName:"" ,
      branchCode:"" , };

      unsuspendUserData:Login = { 
        id: 0,
        userName: "",
        password: " ",
        role: "",
        updatedBy:"",
        updatedDate:" ",
        status:"",
        branch:"",
        fullName:"" ,
        branchCode:"" , };
      deleteUserData:Login = { 
        id: 0,
        userName: "",
        password: " ",
        role: "",
        updatedBy:"",
        updatedDate:" ",
        status:"",
        branch:"",
        fullName:"" ,
        branchCode:"" , };

  constructor(private userService: LoginService) { }


  ngOnInit(): void {

       this.userService.getAll().subscribe((t) => {
        this.users = t
   this.suspendedUsers=t.filter(t=>t.status=='Suspended');
   this.lockedUsers=t.filter(t=>t.status=='Locked');
   this.unsuspendedUsers=t.filter(t=>t.status!='Suspended');
    console.log("con",this.users)
    
  });
    

} 
 
  resetPassword() {
    this.resetUserData.password="123456"
    this.userService.updateAdminUser( this.resetUserData,this.resetUserData.id).subscribe(
      response => {
        console.log('Password reset successful:', response);
       this.usedReset = true;
        setTimeout(() => {
          this.usedReset = false;

      }, 1000);
      
      this.userService.getAll().subscribe((t) => {
        this.users = t
        this.suspendedUsers=t.filter(t=>t.status=='Suspended');
        this.lockedUsers=t.filter(t=>t.status=='Locked');
        this.unsuspendedUsers=t.filter(t=>t.status!='Suspended');
        console.log("con",this.users)
        this.resetUserData= { 
          id: 0,
          userName: "",
          password: " ",
          role: "",
          updatedBy:"",
          updatedDate:" ",
          status:"",
          branch:"",
          fullName:"" ,
          branchCode:"" , };
    
          this.unsuspendUserData={ 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
          this.deleteUserData = { 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
    
      });
        
      },
      error => {
        console.error('Failed to reset password:', error);
        // Handle error and display error message
      }
    );
  }

  removeUser() {
    this.deleteUserData.status='Suspended';
    this.userService.updateAdminUser(this.deleteUserData,this.deleteUserData.id).subscribe(
      response => {
        this.userDeleted = true;
        setTimeout(() => {
          this.userDeleted = false;

      }, 1000);
        console.log('User removed successfully:', response);
        
       this.userService.getAll().subscribe((t) => {
        this.users = t
        this.suspendedUsers=t.filter(t=>t.status=='Suspended');
        this.lockedUsers=t.filter(t=>t.status=='Locked');
        this.unsuspendedUsers=t.filter(t=>t.status!='Suspended');
        this.resetUserData= { 
          id: 0,
          userName: "",
          password: " ",
          role: "",
          updatedBy:"",
          updatedDate:" ",
          status:"",
          branch:"",
          fullName:"" ,
          branchCode:"" , };
    
          this.unsuspendUserData={ 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
          this.deleteUserData = { 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
    
      });
        
      },
      error => {
        console.error('Failed to remove user:', error);
        // Handle error and display error message
      }
    );
  }
unsuspendUser() {
    this.unsuspendUserData.status='';
    this.userService.updateAdminUser(this.unsuspendUserData,this.unsuspendUserData.id).subscribe(
      response => {
        this.userUnsuspended = true;
        setTimeout(() => {
          this.userUnsuspended = false;

      }, 1000);
        console.log('User removed successfully:', response);
        
       this.userService.getAll().subscribe((t) => {
        this.users = t
        this.suspendedUsers=t.filter(t=>t.status=='Suspended');
        this.lockedUsers=t.filter(t=>t.status=='Locked');
        this.unsuspendedUsers=t.filter(t=>t.status!='Suspended');
        this.resetUserData= { 
          id: 0,
          userName: "",
          password: " ",
          role: "",
          updatedBy:"",
          updatedDate:" ",
          status:"",
          branch:"",
          fullName:"" ,
          branchCode:"" , };
    
          this.unsuspendUserData={ 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
          this.deleteUserData = { 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
    
      });
        
      },
      error => {
        console.error('Failed to remove user:', error);
        // Handle error and display error message
      }
    );
  }
  unlockUser() {
    this.lockUserData.status='';
    this.userService.updateAdminUser(this.lockUserData,this.lockUserData.id).subscribe(
      response => {
        this.userUnlocked = true;
        setTimeout(() => {
          this.userUnlocked = false;

      }, 1000);
        console.log('User removed successfully:', response);
        
       this.userService.getAll().subscribe((t) => {
        this.users = t
        this.suspendedUsers=t.filter(t=>t.status=='Suspended');
        this.lockedUsers=t.filter(t=>t.status=='Locked');
        this.unsuspendedUsers=t.filter(t=>t.status!='Suspended');
        this.resetUserData= { 
          id: 0,
          userName: "",
          password: " ",
          role: "",
          updatedBy:"",
          updatedDate:" ",
          status:"",
          branch:"",
          fullName:"" ,
          branchCode:"" , };
    
          this.unsuspendUserData={ 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
          this.deleteUserData = { 
            id: 0,
            userName: "",
            password: " ",
            role: "",
            updatedBy:"",
            updatedDate:" ",
            status:"",
            branch:"",
            fullName:"" ,
            branchCode:"" , };
    
      });
        
      },
      error => {
        console.error('Failed to remove user:', error);
        // Handle error and display error message
      }
    );
  }
  onUserselected(){
    this.userService.getUser(this.selectedUserDelete).subscribe((t) => {
      this.singleUser = t;
      this.deleteUserData=t
    console.log("edit",t)
    });
  }
  onUserselectedReset(){
    this.userService.getUser(this.selectedUserReset).subscribe((t) => {
      this.singleUser = t;
      this.resetUserData=t;
      console.log("this.resetUserData",this.resetUserData)
    
    });
  }
  onUserselectedUnsuspended(){
    this.userService.getUser(this.selectedUserUnsuspend).subscribe((t) => {
      this.singleUser = t;
      this.unsuspendUserData=t
    
    });
  }
  onUserselectedUnlocked(){
    this.userService.getUser(this.selectedUserUnlocked).subscribe((t) => {
      this.singleUser = t;
      this.lockUserData=t
    
    });
  }
}