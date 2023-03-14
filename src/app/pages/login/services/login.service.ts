import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginUserCredentials } from '../../../core/models/login-user-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
  ) {}

  login({ nickname, password }: LoginUserCredentials): Observable<string> {
    return this.http.post(`${environment.backendUrl}/auth/login`, {
      nickname,
      password,
    }, { responseType: 'text' })
  }
}
