import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme.service';
import { Themes } from './core/enums/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public theme$: Observable<Themes>;
  public isThemeLoading$: Observable<boolean>;

  constructor(private _themesService: ThemeService) { }

  ngOnInit() {

    this.theme$ = this._themesService.theme$;
    this.isThemeLoading$ = this._themesService.isLoading$;

    this._themesService.addMiddleware('root', (theme: Themes) => {
      if (theme === Themes.DARK)
        return import('../styles/modules/root/themes/dark/index.scss' as any).catch(e => {
          console.error(`Theme "${theme}" can't be loaded. ${e}`);
        });

      return import('../styles/modules/root/themes/light/index.scss' as any).catch(e => {
        console.error(`Theme "${theme}" can't be loaded. ${e}`);
      });
    });
  }

  toggleTheme() {
    this._themesService.toggle();
  }
}