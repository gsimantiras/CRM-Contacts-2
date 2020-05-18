import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../shared/user.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { Address, User } from '../shared/models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Output() addressSelected: EventEmitter<Address> = new EventEmitter();

  users$: Observable<User[]>;
  showUserModal: boolean;

  constructor(
    private service: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.service.getAll().pipe(
      tap(res=>{
        console.log(res);
      })
    );
  }

  addressSelectedEvt(address){
    this.addressSelected.emit(address)
  }

  deleteUser(user: User) {
    if (user && user.id > 0) {
      this.service.delete(user).subscribe((res) => {
        this.loadUsers();
      });
    }
  }

  showModal() {
    this.toggleModal(true);
  }

  closeModal(userRes) {
    this.toggleModal(false);
    if (userRes) {
      this.loadUsers();
    }
  }

  toggleModal(toggle: boolean) {
    this.showUserModal = toggle;
    const modal = document.getElementById('userModal');
    if (toggle) {
      this.modalService.openModal().call(modal);
    } else {
      this.modalService.closeModal().call(modal);
    }
  }
}
