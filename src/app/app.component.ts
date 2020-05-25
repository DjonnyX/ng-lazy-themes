import { Component, OnInit, Inject } from '@angular/core';

export enum Themes {
  LIGHT = "light",
  DARK = "dark"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentTheme: Themes;

  constructor() {}

  ngOnInit() {
    this.themeLoad(Themes.LIGHT);
  }

  themeChange() {
    const theme = this.currentTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.themeLoad(theme);
  }

  themeLoad(theme: Themes) {
    if (theme === Themes.LIGHT) {
      import(
        /* webpackMode: "lazy" */
        '../styles/themes/theme-light.scss' as any)
        .then(() => {
          this.currentTheme = Themes.LIGHT;
        });
    } else if (theme === Themes.DARK) {
      import(
        /* webpackMode: "lazy" */
        '../styles/themes/theme-dark.scss' as any)
        .then(() => {
          this.currentTheme = Themes.DARK;
        });
    }
  }
}