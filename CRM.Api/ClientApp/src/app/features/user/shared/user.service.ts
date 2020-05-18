import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from './models';

export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users`);
  }

  get(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users/${id}`);
  }

  post(user: User): Observable<User> {
    // return this.http.put<User>(`${environment.apiURL}/users/${2}`, user);
    return this.http.post<User>(`${environment.apiURL}/users`, user);
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiURL}/users/${user.id}`);
  }
}
