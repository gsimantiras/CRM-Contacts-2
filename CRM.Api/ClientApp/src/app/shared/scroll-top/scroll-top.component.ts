import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent implements OnInit {
  title: 'Back to Top';
  constructor() {}

  scrollTop($event) {
    window.scroll(0, 0);
  }

  ngOnInit() {}
}
