import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn=false;
  user=null;
  constructor(public login:LoginService) {

   }

  ngOnInit(): void 
  { 
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>
      {
        this.isLoggedIn=this.login.isLoggedIn();
       this.user=this.login.getUser();
      })
  }
   logout()
   {
     this.login.logout();
     window.location.reload();
     
   }
}
