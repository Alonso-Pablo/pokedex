import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginUserCredentials } from '../../core/models/login-user-credentials.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({})
  public backendErrorResponse: string = ''
  public formFieldsErrors = {
    nickname: { required: '' },
    password: { required: '' },
  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initFormParent()
  }

  initFormParent(): void {
    this.loginForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onLogin() {
    if (!this.isFormFieldsCompleted()) return;

    const loginUserCredentials: LoginUserCredentials = this.getValuesFromFields();
    this.authService.login(loginUserCredentials).subscribe(
      (authToken) => this.handleSuccessLogin(authToken),
      this.handleBackendError
    )
  }

  private getValuesFromFields(): LoginUserCredentials {
    return this.loginForm.value as LoginUserCredentials
  }

  private handleBackendError(e: HttpErrorResponse) {
    if (e.error === 'BAD_CREDENTIALS') {
      this.backendErrorResponse = 'Nickname or password are wrong.';
      return
    }

    this.backendErrorResponse = 'Server error. Please try again later.';
  }

  private handleSuccessLogin(authToken: string) {
    this.authService.setSession(authToken);
    if (this.authService.isLoggedIn()) this.router.navigate(['/pokemons']);
  }

  private isFormFieldsCompleted(): boolean {
    this.formFieldsErrors.nickname.required = '';
    this.formFieldsErrors.password.required = '';
    if (this.loginForm.valid) {
      return true
    }
    this.formFieldsErrors.nickname.required = 
      this.loginForm.get('nickname')?.errors?.['required'] && 'This field is required';
    this.formFieldsErrors.password.required =
      this.loginForm.get('password')?.errors?.['required'] && 'This field is required';
    return false
  }
}
