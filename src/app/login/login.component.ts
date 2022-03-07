import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../service/login.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }
  public loginDetails=
  {
    username:'',
    password:'',
   
  };
  ngOnInit(): void {
  }



  formSubmit(myForm:any)
  {
    if(this.loginDetails==null||this.loginDetails.username.trim()=='')
     {
       this.snack.open("User name Required!!",'ok',
       {
         verticalPosition:'top',
         horizontalPosition:'center'
    
      });
  }
  this.login.generateToken(this.loginDetails).subscribe(
    (data:any)=>
    {
     console.log(data);
     swal("Welcome", "success");
    
     //
     this.login.loginUser(data.token);
     this.login.getCurrentUser().subscribe(
       (user:any)=>
       {
         this.login.storeUser(user);
         console.log(user);
         if(this.login.getUerRole()=="ADMIN")
         {
            //admin admin dashboard;
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
            
         }
         else if (this.login.getUerRole()=="USER")
         {
          this.router.navigate(['user']);
          this.login.loginStatusSubject.next(true);
         }
        else
        {
          this.login.logout();
        }

       }
     );
     
   },
    (error)=>
    {
       console.log(error);
      this.snack.open("Oops Invalid Credentials Try again",'ok');
    }
  )
}

  clear(myForm:any)
  {
    myForm.reset();
  }
}
