# NgLazyThemes

## Examples
First of all, add the following to angular.json
```json
{
        // ...
        "build": {
          "options": {
            // ...
            "extractCss": true,
            "styles": [
              "src/styles.scss",
              {
                "input": "src/styles/themes/theme-dark.scss",
                "bundleName": "theme-dark",
                "inject": false
              },
              {
                "input": "src/styles/themes/theme-light.scss",
                "bundleName": "theme-light",
                "inject": false
              }

```

Next you need to implement loading styles

```ts
{
    themeLoad(theme: Themes) {
    if (theme === Themes.LIGHT) {
      this._isLoadingStyles$.next(true);
      import(
        /* webpackMode: "lazy" */
        '../styles/themes/theme-light.scss' as any)
        .then(() => {
          this.currentTheme = Themes.LIGHT;
          this._isLoadingStyles$.next(false);
        });
    } else if (theme === Themes.DARK) {
      this._isLoadingStyles$.next(true);
      import(
        /* webpackMode: "lazy" */
        '../styles/themes/theme-dark.scss' as any)
        .then(() => {
          this.currentTheme = Themes.DARK;
          this._isLoadingStyles$.next(false);
        });
    }
  }
  }
}
```


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
