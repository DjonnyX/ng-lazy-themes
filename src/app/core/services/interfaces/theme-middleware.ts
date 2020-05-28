export interface IThemeMiddleware {
    [x: string]: ThemeMiddlewareHandler;
}

export type ThemeMiddlewareHandler = <F = any>() => Promise<F>;