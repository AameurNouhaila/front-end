import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseURL = "http://localhost:8086/la-poste/clients";
  http: any;

  constructor(private httpClient: HttpClient) { }

  getClientList(): Observable<Client[]>{
    
    return this.httpClient.get<Client[]>(`${this.baseURL}/list`);
  }


  deleteClient(_id: string): Observable<Object>{
    /* const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3VoYS5hbXJAZ21haWwuY29tIiwiZXhwIjoxNjkxNTcxNTc5LCJpYXQiOjE2OTE0ODUxNzksImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.WlaqyBbeSGSfoElMbIfXT2zu7Yju15KaJDf1FckLCpo'
    }); */
    return this.httpClient.delete(`${this.baseURL}/${_id}`);
  }

  getClientById(_id: string): Observable<Client>{
    /* const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3VoYS5hbXJAZ21haWwuY29tIiwiZXhwIjoxNjkxNTcxNTc5LCJpYXQiOjE2OTE0ODUxNzksImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.WlaqyBbeSGSfoElMbIfXT2zu7Yju15KaJDf1FckLCpo'
    }); */
    return this.httpClient.get<Client>(`${this.baseURL}/findById/${_id}`);
  }

  
  downloadPDF(startDate: Date, endDate: Date): Observable<Blob> {
    /* const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3VoYS5hbXJAZ21haWwuY29tIiwiZXhwIjoxNjkxNTcxNTc5LCJpYXQiOjE2OTE0ODUxNzksImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.WlaqyBbeSGSfoElMbIfXT2zu7Yju15KaJDf1FckLCpo'
    }); */
  
    const dateFormat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    });
    
    const formattedStartDate = dateFormat.format(startDate);
    const formattedEndDate = dateFormat.format(endDate);
    
    const params = new HttpParams()
    .set('dateDebut', startDate.toISOString())  // Format as 'yyyy-MM-ddTHH:mm:ss.SSSZ'
    .set('dateFin', endDate.toISOString())      // Format as 'yyyy-MM-ddTHH:mm:ss.SSSZ'
    
    
  
    return this.httpClient.get(`${this.baseURL}/download`, {
      responseType: 'blob',
      params: params,
    });
  }
  
}
