import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ThemeService } from 'src/app/core/services/theme.service';
import { Themes } from 'src/app/core/enums/themes';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LazyComponent implements OnInit, OnDestroy {

  public theme$: Observable<Themes>;
  private _themeChangeSubscr: Subscription;

  constructor(private _themesService: ThemeService) { }

  ngOnInit(): void {
    this.theme$ = this._themesService.theme;

    this._themeChangeSubscr = this.theme$.subscribe(theme => {

    })
  }

  ngOnDestroy(): void {
    this._themeChangeSubscr.unsubscribe();
    this._themeChangeSubscr = null;
  }
}
