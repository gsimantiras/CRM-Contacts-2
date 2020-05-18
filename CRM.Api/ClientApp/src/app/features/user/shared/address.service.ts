import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Address } from './models';

export class AddressService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.apiURL}/address`);
  }

  getUserAddrsses(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.apiURL}/Address/getUserAddrsses/${userId}`);
  }

  post(address: Address): Observable<Address> {
    return this.http.post<Address>(`${environment.apiURL}/address`, address);
  }
}
