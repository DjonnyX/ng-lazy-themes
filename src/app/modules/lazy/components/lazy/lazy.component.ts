import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LazyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
