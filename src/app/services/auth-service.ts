import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, catchError, throwError, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:5000/users';

  user = new BehaviorSubject<UserModel | null>(null);
  

  login(email:string, password:string){
    return this.http.post<any>(`${this.URL}/login`, {email, password}).pipe(map((response)=>{
      if(response.token){
        const decoded = jwtDecode<any>(response.token);
        const expirationDate = new Date(decoded.exp *1000);
        const loggedUser = new UserModel(
          decoded.email,
           decoded.id, 
          response.token, 
          expirationDate);


        this.user.next(loggedUser); 

        localStorage.setItem("userData", JSON.stringify(loggedUser));
        console.log(localStorage);

        return response.data.user; 
       
      }else{
        throw new Error("Token not found in response");
      }
    }),
    catchError(this.handleError)
  );
  }

  private handleError(error:any){
    let errorResponse = {status: 'fail', message: 'An unknown error has occurred',
    };

    if(error.error && error.error.status && error.error.message){
      errorResponse = {
        status: error.error.status,
        message: error.error.message
      };
    }
    return throwError(()=> errorResponse);
  }

  signup(newUser: any) {
    return this.http.post<any>(`${this.URL}/signup`, newUser).pipe(
      map((response) => {
        if (response.token) {
          const decoded = jwtDecode<any>(response.token);
          const expirationDate = new Date(decoded.exp * 1000);
          const loggedUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expirationDate
          );
          this.user.next(loggedUser);
          localStorage.setItem('userData', JSON.stringify(loggedUser));
 
          return response.data.user;
        } else {
          throw new Error('Token not found in response');
        }
      }),
      catchError(this.handleError)
    );
  }

  autoLogin(){
    const userDataString = localStorage.getItem("userData");
    if(!userDataString) return;

    const userData = JSON.parse(userDataString);

    const u = new UserModel(userData.email, userData.id, userData._token, new Date (userData.__expiresIn),userData.favBooks || []);
    if (u.token){
      this.user.next(u);
    }
  }

  logOut(){
    this.user.next(null);
    localStorage.removeItem("userData")
  }
}
