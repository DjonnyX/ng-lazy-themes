import { Themes } from '../../enums/themes';

export interface IThemeMiddleware {
    [x: string]: ThemeMiddlewareHandler;
}

export type ThemeMiddlewareHandler = (theme: Themes) => Promise<void>;