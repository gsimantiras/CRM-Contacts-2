import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

import { ModalService } from './modal/modal.service';

@NgModule({
  declarations: [ListComponent, LoadingComponent, ModalComponent, ScrollTopComponent],
  imports: [
    // vendor
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // vendor
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // local
    ListComponent,
    LoadingComponent,
    ModalComponent,
    ScrollTopComponent
  ],
  providers: [ModalService],
})
export class SharedModule {}
