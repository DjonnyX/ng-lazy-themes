import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './shared/shared-common/services/theme.service';
import '../styles/themes/light/index.scss'; // Default theme
import { Themes } from './shared/shared-common/enums/themes';

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