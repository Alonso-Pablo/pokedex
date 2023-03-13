import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SignUpUserCredentials } from '../../../core/models/sign-up-user-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(
    private http: HttpClient,
  ) {}

  signUp({ name, nickname, password, team }: SignUpUserCredentials): Observable<string> {
    return this.http.post(`${environment.backendUrl}/auth/signup`, {
      name,
      nickname,
      password,
      team,
    }, { responseType: 'text' })
  }
}
