import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }
  public user=
  {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  ngOnInit(): void {
  }

  formSubmit(myForm:any)
  {
     console.log(this.user);
     if(this.user==null||this.user.username=='')
     {
       this.snack.open("User name Required!!",'ok',{
         verticalPosition:'top',
         horizontalPosition:'center'
    
      });
       return ;
     }
     this.userService.addUser(this.user).subscribe(
       (data:any)=>
       {
        console.log(data);
        swal("Sucessfully Registered!","Your Id is "+data.id, "success");
        myForm.reset();
      },
       (error)=>
       {
          console.log(error);
         this.snack.open(error.error,'ok');
       }
     )
  }
  clear(myForm:any)
  {
    myForm.reset();
  }
}
