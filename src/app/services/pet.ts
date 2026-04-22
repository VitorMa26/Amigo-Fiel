import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetModel } from '../models/pets';

@Injectable({
  providedIn: 'root',
})
export class Pet {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-senai-angular.vercel.app';
  private publicUrl = '/api/pets';
  private adminUrl = '/api/admin/pets';

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + this.publicUrl);
  }


  create(data:PetModel): Observable<PetModel>{
    return this.http.post<PetModel>(this.apiUrl + this.adminUrl,data);
  }


//   create(pet: any): Observable<any> {
//     return this.http.post(this.apiUrl + this.adminUrl, pet);
//   }
 }
