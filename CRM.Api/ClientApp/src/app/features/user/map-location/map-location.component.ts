import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { MapLocationService } from './../shared/map-location.service';
import { environment } from './../../../../environments/environment';
import { Address, MapLocation } from '../shared/models';

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.scss'],
})
export class MapLocationComponent implements OnInit, OnChanges {
  constructor(private mapLocationService: MapLocationService) {}
  @Input() addresses: Address[];
  startingLocation: MapLocation = { lat: 37.9587643, lng: 23.7198394 };

  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;
  map: any;
  // tslint:disable-next-line:no-string-literal
  google = window['google'];

  renderMap() {
    // tslint:disable-next-line:no-string-literal
    window['initMap'] = () => {
      this.loadMapAddresses();
    };

    if (!window.document.getElementById('google-map-script')) {
      const s = window.document.createElement('script');
      s.id = 'google-map-script';
      s.type = 'text/javascript';
      s.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&amp;callback=initMap`;

      window.document.body.appendChild(s);
    }
  }

  getMap() {
    return new this.google.maps.Map(this.mapElement.nativeElement, {
      center: this.startingLocation,
      zoom: 10,
    });
  }

  loadMapAddresses() {
    this.map = this.getMap();
    this.addresses.forEach((address, i) => {
      if (address.isSelected) {
        if (!address.location) {
          this.mapLocationService.getLocation(address).subscribe((res) => {
            if (res) {
              address.location = res;
              this.addMarker(address);
            }
          });
        } else {
          this.addMarker(address);
        }
      }
    });
  }

  addMarker(address) {
    const map = this.map;
    const contentString = this.getContentString(address);

    const infowindow = new this.google.maps.InfoWindow({
      content: contentString,
    });

    const marker = new this.google.maps.Marker({
      position: address.location,
      map,
      title: address.id + '',
      draggable: false,
      animation: this.google.maps.Animation.DROP,
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  }

  getContentString(address: Address): string {
    return (
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h4 id="thirdHeading" class="thirdHeading">' +
      address.street +
      ' ' +
      address.streetNumber +
      '</h4>' +
      '<div id="bodyContent">' +
      '<p>' +
      address.user.name +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  ngOnInit() {
    this.renderMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadMapAddresses();
  }
}
