import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.email = undefined;
    this.roles = undefined;
  }
  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['token'];
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.email = decodedJwt.sub;
    this.roles = decodedJwt.authorities; // my token includes 'authorities' for roles
  }
  

  isAuthenticated : boolean = false;
  roles : any ;
  email: any;
  accessToken!: any;

  constructor(private http:HttpClient) { }

  public login(email: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    let body = {
      email: email,
      password: password
    };

    return this.http.post('http://localhost:8086/auth/authenticate', body, options);
  }
}
