import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { Themes } from '../enums/themes';
import { IThemeMiddleware, ThemeMiddlewareHandler } from './interfaces/theme-middleware';
import { Debounse } from 'src/app/utils/debounse.util';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme$ = new BehaviorSubject<Themes>(Themes.LIGHT);
  public theme$ = this._theme$.asObservable();

  private _isLoading$ = new BehaviorSubject<boolean>(true);
  public isLoading$ = this._isLoading$.asObservable();

  private _middlewares: IThemeMiddleware = {};

  private _subscription: Subscription;

  private _debounceLoad = new Debounse(() => {
    this.reload();
  }, 100);

  constructor() { }

  /**
   * @param {string} name unique
   * @param {ThemeMiddlewareHandler} handler 
   */
  public addMiddleware(name: string, handler: ThemeMiddlewareHandler): void {
    this._middlewares[name] = handler;

    this._debounceLoad.call();
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
    for (let i = 0, l = keys.length; i < l; i++) {
      const handler = this._middlewares[keys[i]](theme);
      middlewares.push(handler);
    }

    /*Promise.all(middlewares).finally(() => {
      if (this._isLoading$.value === true) {
        this._theme$.next(theme);
        this._isLoading$.next(false);
      }
    })*/

    this._subscription = forkJoin(middlewares).subscribe(
      () => {
        this._theme$.next(theme);
        this._isLoading$.next(false);
      }
    )
  }
}
