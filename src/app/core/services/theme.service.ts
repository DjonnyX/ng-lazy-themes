import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Themes } from '../enums/themes';
import { IThemeMiddleware, ThemeMiddlewareHandler } from './interfaces/theme-middleware';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _currentTheme: Themes = Themes.LIGHT;

  private _theme$ = new BehaviorSubject<Themes>(this._currentTheme);
  public theme = this._theme$.asObservable();

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading = this._isLoading$.asObservable(); 

  private _middlewares: IThemeMiddleware = {};

  constructor() { }

  /**
   * @param {string} name unique
   * @param {ThemeMiddlewareHandler} handler 
   */
  public addMiddleware(name: string, handler: ThemeMiddlewareHandler): void {
    this._middlewares[name] = handler;
  }

  public removeMiddleware(name: string): ThemeMiddlewareHandler {
    const handler = this._middlewares[name];
    
    delete this._middlewares[name];

    return handler;
  }

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
