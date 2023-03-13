import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backend_url = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) {}

  findMe(): Observable<User> {
    return this.http.get<User>(
      `${this.backend_url}/users/me`,
      { headers: { 'Access-Control-Allow-Origin': '*' }}
    )
  }
}
