import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = "http://localhost:8080/userservice";

  constructor(private http: HttpClient) { }

  // Create user
  public registerUser(userData: any): Observable<any> {
    return this.http.post(this.API, userData);
  }

  // Get all users
  public getUsers(): Observable<any> {
    return this.http.get(this.API);
  }

  // Get user by ID
  public getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.API}/${userId}`);
  }

  // Delete user
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.API}/${userId}`);
  }

  // Update user
  public updateUser(user: any): Observable<any> {
    return this.http.put(`${this.API}/${user.id}`, user);
  }
}
