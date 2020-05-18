export class UserDTO {
  name: string;
  title: string;
  company: string;
  phoneNumber: string;
  email: string;
  street: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
}

export class ContactInformation {
  id: number;
  phoneNumber: string;
  email: string;
}

export class MapLocation {
  lat: number;
  lng: number;
}

export class Address {
  id: number;
  street: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
  userId: number;
  user: User;
  mode: string;
  fullAddress: string;
  isSelected: boolean;
  location?: MapLocation;
}

export class User {
  id: number;
  name: string;
  title: string;
  company: string;
  contactInformation?: ContactInformation = new ContactInformation();
  addresses: Address[] = [];
}
