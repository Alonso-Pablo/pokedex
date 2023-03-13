import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginUserCredentials } from '../models/login-user-credentials.model';
import { SignUpUserCredentials } from '../models/sign-up-user-credentials.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  static LOCAL_STORAGE_TOKEN_KEY = 'POKEMON_TRAINER_TOKEN';

  constructor(
    private storageService: LocalStorageService,
    private http: HttpClient,
  ) {}

  public isLoggedIn(): boolean {
    return !!this.getAuthTokenFromLocalStorage();
  }

  login({ nickname, password }: LoginUserCredentials): Observable<string> {
    return this.http.post(`${environment.backendUrl}/auth/login`, {
      nickname,
      password,
    },{ responseType: 'text', headers: { 'Access-Control-Allow-Origin': '*' }  })
  }

  signUp({ name, nickname, password, team }: SignUpUserCredentials): Observable<string> {
    return this.http.post(`${environment.backendUrl}/auth/signup`, {
      name,
      nickname,
      password,
      team,
    },{ responseType: 'text', headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  setSession(authResult: string) {
    this.storageService.save(AuthService.LOCAL_STORAGE_TOKEN_KEY, authResult);
  }  

  logout() {
    this.storageService.clear(AuthService.LOCAL_STORAGE_TOKEN_KEY)
  }

  public getAuthTokenFromLocalStorage(): string | null {
    return this.storageService.get(AuthService.LOCAL_STORAGE_TOKEN_KEY)
  }
}
