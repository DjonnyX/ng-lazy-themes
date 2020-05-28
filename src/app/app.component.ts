import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import '../styles/themes/light/index.scss'; // Default theme

export enum Themes {
  LIGHT = "light",
  DARK = "dark"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  currentTheme: Themes;
  private _isLoadingStyles$ = new BehaviorSubject<boolean>(false);
  public isLoadingStyles$ = this._isLoadingStyles$.asObservable();

  constructor() {}

  ngOnInit() {
    this.loadTheme(Themes.LIGHT);
  }

  toggleTheme() {
    const theme = this.currentTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.loadTheme(theme);
  }

  loadTheme(theme: Themes) {
    if (theme === Themes.LIGHT) {
      this._isLoadingStyles$.next(true);
      import(
        '../styles/themes/light/index.scss' as any)
        .then(() => {
          this.currentTheme = Themes.LIGHT;
          this._isLoadingStyles$.next(false);
        });
    } else if (theme === Themes.DARK) {
      this._isLoadingStyles$.next(true);
      import(
        '../styles/themes/dark/index.scss' as any)
        .then(() => {
          this.currentTheme = Themes.DARK;
          this._isLoadingStyles$.next(false);
        });
    }
  }
}