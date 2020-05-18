import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() closeModal;

  constructor(private el: ElementRef, private modalService: ModalService) {}

  close() {
    // tslint:disable-next-line:no-unused-expression
    (this.closeModal && this.closeModal()) ||
      this.modalService.closeModal().call(this.el.nativeElement);
  }

  ngOnInit() {}
}
