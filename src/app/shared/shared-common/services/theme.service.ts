import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Themes } from '../enums/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _currentTheme: Themes = Themes.LIGHT;

  private _theme$ = new BehaviorSubject<Themes>(this._currentTheme);
  public theme = this._theme$.asObservable();

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading = this._isLoading$.asObservable(); 

  constructor() { }

  public toggle() {
    const theme = this._currentTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.load(theme);
  }

  private load(theme: Themes) {
      this._isLoading$.next(true);
      import(
        `../styles/themes/${theme}/index.scss` as any)
        .then(() => {
          this._theme$.next(theme);
          this._isLoading$.next(false);
        })
        .catch(e => {
          console.error(`Theme "${theme}" can't be loaded.`)
        });
  }
}
