import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../model/login.model';
import { AuthResponse } from '../model/auth-response.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}

  fb = inject(FormBuilder)
  http = inject(HttpClient)

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  password: string = '';
  showPassword: boolean = false;
  toggleIconClass: string = 'fa-eye';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.toggleIconClass = this.showPassword ? 'fa-eye' : 'fa-eye-slash';
  }

  getPasswordFieldType() {
    return this.showPassword ? 'text' : 'password';
  }
  
  hide =false;
  infoMessage = '';
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params['registered'] !== undefined && params['registered'] === 'true') {
          this.infoMessage = 'Registration Successful! Confirm account on your mail!';
      }
    });
  }

  trimValues() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.loginForm.patchValue({
      email: email?.trim(),
      password: password?.trim()
    });
  }
  emailRequired: boolean = false;
  emailWrong:boolean = false;
  passwordRequired:boolean = false;
  wrongCredentials:boolean = false;

  onSubmit(): void {
    this.emailRequired = false;
    this.emailWrong = false;
    this.passwordRequired = false;
    this.wrongCredentials = false;
    this.trimValues();

    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email?.trim() || "",
        password: this.loginForm.value.password?.trim() || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.jwt);
          this.authService.setUser()
          this.router.navigate(['cert-requests'])
        },
        error:(error) => {
          if(error.status === 403){
            this.wrongCredentials = true;
          } 
        } 
      })
    }
    else{
      if(this.loginForm.value.password === ""){
        this.passwordRequired = true;
      }
      if(this.loginForm.value.email === ""){
        this.emailRequired = true;
      }else{
        this.emailWrong = true;
      }
      
    }
  }


}
