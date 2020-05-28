import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from 'src/app/core/services/theme.service';
import { Themes } from 'src/app/core/enums/themes';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LazyComponent implements OnInit {

  public theme$: Observable<Themes>;

  constructor(private _themesService: ThemeService) { }

  ngOnInit(): void {
    this.theme$ = this._themesService.theme;
  }
}
