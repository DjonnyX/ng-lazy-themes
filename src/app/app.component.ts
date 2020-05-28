import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme.service';
import { Themes } from './core/enums/themes';

import '../styles/themes/light/index.scss'; // Default theme

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public theme$: Observable<Themes>;

  constructor(private _themesService: ThemeService) {}

  ngOnInit() {
    this.theme$ = this._themesService.theme;
  }

  toggleTheme() {
    this._themesService.toggle();
  }
}