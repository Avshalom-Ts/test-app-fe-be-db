import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { StoreName, StoreNameCreate } from './store-name.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreNameServiceService {

  baseIRI: string = environment.API_BASE_URL

  constructor(private http: HttpClient) { }

  createStoreName(storeNameCreate: StoreNameCreate) {
    return this.http.post<StoreName>(this.baseIRI + '/store-name', storeNameCreate);
  }

  getAll() {
    return this.http.get<StoreName[]>(this.baseIRI + '/store-name');
  }
}
