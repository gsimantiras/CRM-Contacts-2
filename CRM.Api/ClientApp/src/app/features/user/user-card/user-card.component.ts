import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../shared/user.service';
import { AddressService } from './../shared/address.service';

import { User, Address, ContactInformation } from '../shared/models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User = new User();
  @Input() mode: string;

  @Output() addressSelected: EventEmitter<Address> = new EventEmitter();
  @Output() closeCard: EventEmitter<User> = new EventEmitter();

  get isViewMode() {
    return this.mode !== 'add';
  }

  get anyAddressIsSelected() {
    return this.user.addresses.some((x) => x.isSelected);
  }

  userFormGroup: FormGroup;
  showNewAddressForm: boolean;

  addressControls = ['street', 'streetNumber', 'city', 'country', 'postalCode'];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) {}

  showAddressChanged(address: Address) {
    if (!this.isViewMode) {
      return;
    }
    address.isSelected = !address.isSelected;
    address.user = this.user;
    this.addressSelected.emit(address);
  }

  showAddressForm() {
    this.showNewAddressForm = true;
    this.enableAddress();
    this.resetFormGroupAddress();
  }

  hideAddressForm() {
    this.showNewAddressForm = false;
    this.userFormGroup.disable();
    this.resetFormGroupAddress();
  }

  addAddress() {
    const address = new Address();

    this.addressControls.forEach((control) => {
      address[control] = this.userFormGroup.controls[control].value;
    });
    address.userId = this.user.id;

    this.addressService.post(address).subscribe((res) => {
      address.fullAddress = this.getFullAddress(address);
      this.user.addresses.push(address);
      this.hideAddressForm();
    });
  }

  resetFormGroupAddress() {
    this.addressControls.forEach((control) => {
      this.userFormGroup.controls[control].reset();
    });
  }

  enableAddress() {
    this.addressControls.forEach((control) => {
      this.userFormGroup.controls[control].enable();
    });
  }

  onSubmit(userData) {
    this.userService.post(userData).subscribe((res) => {
      this.user = res;
      this.closeAction(this.user);
    });
  }

  closeAction(user) {
    if (this.user && this.user.id > 0) {
      this.closeCard.emit(this.user);
    } else {
      this.closeCard.emit(null);
    }
    this.userFormGroup.reset();
  }

  getFullAddress(address: Address) {
    const { street, streetNumber, postalCode, city, country } = address;
    return `${street} ${streetNumber}, ${postalCode} ${city}, ${country}`;
  }

  ngOnInit() {
    const { name = '', title = '', company = '' } = this.user;
    const { email = '', phoneNumber = '' } =
      this.user && this.user.contactInformation
        ? this.user.contactInformation
        : new ContactInformation();
    const { addresses = [] } = this.user;
    addresses.forEach(function (x) {
      x.fullAddress = this.getFullAddress(x);
      x.mode = 'view';
    }, this);

    this.userFormGroup = this.formBuilder.group({
      name,
      title,
      email,
      phoneNumber,
      company,
      addresses,
      street: '',
      streetNumber: '',
      city: '',
      country: '',
      postalCode: '',
    });
    if (this.isViewMode) {
      this.userFormGroup.disable();
    }
  }
}
