import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pet {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-senai-angular.vercel.app';
  private publicUrl = '/api/pets';
  private adminUrl = '/admin/pets';

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + this.publicUrl);
  }

  create(pet: any): Observable<any> {
    return this.http.post(this.apiUrl + this.adminUrl, pet);
  }
}
