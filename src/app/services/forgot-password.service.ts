import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  generatedPassword: string;
  constructor(private http: HttpClient) { }

  sendMail(mailAddress: string): Observable<any> {
    return this.http.get(`http://localhost:4000/sendmail?username=${mailAddress}`, { responseType: 'text' }).pipe(
      map((res: string) => this.generatedPassword = res)
    );
  }
}
