import { Component, OnInit } from '@angular/core';
import { Address } from './shared/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  addresses: Address[] = [];
  showUserModal: boolean;

  constructor() {}

  addressSelected(address: Address) {
    if (address) {
      let addresses = this.addresses.slice();
      if (address.isSelected) {
        addresses.push(address);
      } else {
        addresses = addresses.filter((a) => a.id !== address.id);
      }
      this.addresses = addresses;
    }
  }

  ngOnInit() {}
}
