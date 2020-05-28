import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Themes } from '../enums/themes';
import { IThemeMiddleware, ThemeMiddlewareHandler } from './interfaces/theme-middleware';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // private _currentTheme: Themes = Themes.LIGHT;

  private _theme$ = new BehaviorSubject<Themes>(Themes.LIGHT);
  public theme$ = this._theme$.asObservable();

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading = this._isLoading$.asObservable();

  private _middlewares: IThemeMiddleware = {};

  private _subscription: Subscription;

  constructor() { }

  /**
   * @param {string} name unique
   * @param {ThemeMiddlewareHandler} handler 
   */
  public addMiddleware(name: string, handler: ThemeMiddlewareHandler): void {
    this._middlewares[name] = handler;
  }

  /**
   * @param {string} name 
   */
  public removeMiddleware(name: string): ThemeMiddlewareHandler {
    const handler = this._middlewares[name];

    delete this._middlewares[name];

    return handler;
  }

  public toggle() {
    const theme = this._theme$.value === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.load(theme);
  }

  public reload(): void {
    this.load(this._theme$.value);
  }

  private load(theme: Themes): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }

    this._isLoading$.next(true);

    const keys = Object.keys(this._middlewares);
    const middlewares = new Array<Promise<void>>();
    for (let i = 0, l = keys.length; i < l; i ++) {
      const handler = this._middlewares[keys[i]](theme);
      middlewares.push(handler);
    }

    this._subscription = forkJoin(middlewares).subscribe(
      () => {
        this._theme$.next(theme);
        this._isLoading$.next(false);
      }
    )
  }
}
