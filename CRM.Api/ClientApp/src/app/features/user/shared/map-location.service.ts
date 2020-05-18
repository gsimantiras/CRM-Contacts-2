import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { MapLocation, Address } from './models';

export class MapLocationService {
  cachedLocations: [] = []; // todo

  constructor(private httpClient: HttpClient) {}

  url = 'https://maps.googleapis.com/maps/api/geocode/json?';

  getLocation(address: Address): Observable<MapLocation> {
    return this.httpClient
      .get<any>(
        `${this.url}address=${address.streetNumber}+${address.street}+${address.city}&key=${environment.googleApiKey}`
      )
      .pipe(
        map((res) => {
          return res.results[0].geometry.location;
        })
      );
  }
}
