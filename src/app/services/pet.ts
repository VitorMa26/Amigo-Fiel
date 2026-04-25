import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pet {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-senai-angular.vercel.app/api';
  private publicUrl = '/pets';
  private adminUrl = '/admin/pets';

  getAll(queryParams: string): Observable<any> {
    return this.http.get(this.apiUrl + this.publicUrl + queryParams, {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      }),
    });
  }

  create(pet: any): Observable<any> {
    return this.http.post(this.apiUrl + this.adminUrl, pet);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + this.adminUrl + `/${id}`);
  }
}
