import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ThemeService } from 'src/app/core/services/theme.service';
import { Themes } from 'src/app/core/enums/themes';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LazyComponent implements OnInit {

  constructor(private _themesService: ThemeService) { }

  ngOnInit(): void {
    this._themesService.addMiddleware('root', (theme: Themes) => {
      if (theme === Themes.DARK)
        return import('../../../../../styles/modules/lazy/themes/dark/index.scss' as any).catch(e => {
          console.error(`Theme "${theme}" can't be loaded. ${e}`);
        });

      return import('../../../../../styles/modules/lazy/themes/light/index.scss' as any).catch(e => {
        console.error(`Theme "${theme}" can't be loaded. ${e}`);
      });
    });
  }
}
