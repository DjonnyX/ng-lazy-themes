import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  currentTheme: Themes = Themes.LIGHT;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.themeLoad();
  }

  themeChange() {
    this.currentTheme = this.currentTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.themeLoad();
  }

  themeLoad() {
    if (this.currentTheme === Themes.LIGHT) {
      import(
        /* webpackMode: "lazy" */
        '../styles/themes/theme-light.scss' as any);
    } else if (this.currentTheme === Themes.DARK) {
      import(
        /* webpackMode: "lazy" */
        '../styles/themes/theme-dark.scss' as any);
    }
  }
}