import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpUserCredentials } from '../../core/models/sign-up-user-credentials.model';
import { AuthService } from '../../core/services/auth.service';
import { SignUpService } from './services/signup.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ AuthService, SignUpService ],
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup = new FormGroup({})
  public backendErrorResponse: string = ''
  public formFieldsErrors = {
    name: { required: '' },
    nickname: { required: '', other: '' },
    password: { required: '' },
    team: { required: '', pattern: '' },
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private signUpService: SignUpService,
  ) {}

  ngOnInit(): void {
    this.initFormParent()
  }

  initFormParent(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required, Validators.pattern(/\b(red|blue|yellow)\b(?!\s)/)]),
    })
  }

  onSignUp() {
    if (!this.isFormFieldsCompleted()) return;

    const signUpCredentials: SignUpUserCredentials = this.getValuesFromFields();
    this.signUpService.signUp(signUpCredentials).subscribe(
      (authToken) => this.handleSuccessSignUp(authToken),
      (e) => this.handleBackendError(e)
    )
  }

  private getValuesFromFields(): SignUpUserCredentials {
    return this.signUpForm.value as SignUpUserCredentials
  }

  private handleBackendError(e: HttpErrorResponse) {
    if (e.error === 'USER_ALREADY_EXIST') {
      this.formFieldsErrors.nickname.other = 'Nickname is already in used.'
      return
    }
    if (e.error === 'BAD_CREDENTIALS') {
      this.backendErrorResponse = 'Nickname or password are wrong.';
      return
    }

    this.backendErrorResponse = 'Server error. Please try again later.';
  }

  private handleSuccessSignUp(authToken: string) {
    this.authService.setSession(authToken);
    if (this.authService.isLoggedIn()) this.router.navigate(['/pokemons']);
  }

  private isFormFieldsCompleted(): boolean {
    this.backendErrorResponse = '';
    this.formFieldsErrors.name.required = '';
    this.formFieldsErrors.nickname.required = '';
    this.formFieldsErrors.password.required = '';
    this.formFieldsErrors.team.required = '';
    if (this.signUpForm.valid) {
      return true
    }
    this.formFieldsErrors.name.required = 
    this.signUpForm.get('name')?.errors?.['required'] && 'This field is required';
    this.formFieldsErrors.nickname.required = 
      this.signUpForm.get('nickname')?.errors?.['required'] && 'This field is required';
    this.formFieldsErrors.password.required =
      this.signUpForm.get('password')?.errors?.['required'] && 'This field is required';
    this.formFieldsErrors.team.required =
      this.signUpForm.get('team')?.errors?.['required'] && 'This field is required';
    this.formFieldsErrors.team.pattern =
      this.signUpForm.get('team')?.errors?.['pattern'] && 'Invalid team';
    return false
  }
}
