import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';

import { AddressService } from './shared/address.service';
import { UserService } from './shared/user.service';
import { MapLocationService } from './shared/map-location.service';

import { MapLocationComponent } from './map-location/map-location.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserCardComponent,
    UserComponent,
    MapLocationComponent,
  ],
  imports: [SharedModule, UserRoutingModule],
  providers: [UserService, AddressService, MapLocationService],
  entryComponents: [],
})
export class UserModule {}
