import { Component, ElementRef, Inject, inject, ViewChild, viewChild } from '@angular/core';
import { Login, User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ApiResponse } from '../../model/api-response';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('loginRegistration') loginRegistration!: ElementRef;
  isLogin: boolean = false;
  userObj: User | any = new User();
  loginObj: Login = new Login();


  constructor(private authService: AuthService) {
    this.loadUserData();
  }

  loadUserData() {
    const loginData = localStorage.getItem("loginObjectData");
    if (loginData) {
      this.userObj = JSON.parse(loginData);
    }
  }

  openloginRegistrationFormModal() {
    if (this.loginRegistration) {
      this.loginRegistration.nativeElement.style.display = "block";
    }
  }

  closeloginRegistrationFormModal() {
    if (this.loginRegistration) {
      this.loginRegistration.nativeElement.style.display = "none";
      this.isLogin = false;
    }
  }

  onRegistration() {
    this.authService.register(this.userObj).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert("Registration is successfull");
        this.closeloginRegistrationFormModal();
      }
    })

  }

  onLogin() {
    this.authService.login(this.loginObj).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert("Login is successfull");
        localStorage.setItem("loginObjectData", JSON.stringify(res.data));
        this.closeloginRegistrationFormModal();
        this.loadUserData();

      }
    })
  }

  logout() {
    localStorage.removeItem("loginObjectData");
    this.userObj = new User();
  }

}
