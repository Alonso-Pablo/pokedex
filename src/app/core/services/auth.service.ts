import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated: Observable<boolean> = this.isUserAuthenticated.asObservable();
  static LOCAL_STORAGE_TOKEN_KEY = 'POKEMON_TRAINER_TOKEN';

  constructor(
    private storageService: LocalStorageService,
  ) {}

  public isLoggedIn(): boolean {
    return !!this.getAuthTokenFromLocalStorage();
  }

  setSession(authResult: string) {
    this.storageService.save(AuthService.LOCAL_STORAGE_TOKEN_KEY, authResult);
    this.isUserAuthenticated.next(true);
  }  

  endSession() {
    this.storageService.clear(AuthService.LOCAL_STORAGE_TOKEN_KEY)
    this.isUserAuthenticated.next(false);
  }

  public getAuthTokenFromLocalStorage(): string | null {
    return this.storageService.get(AuthService.LOCAL_STORAGE_TOKEN_KEY)
  }
}
