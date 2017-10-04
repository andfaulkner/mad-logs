import { isoStyles } from './src/isomorphic-styles';
/**************************************** TYPE DEFINITIONS ****************************************/
export interface Log {
    silly<T>(...args: Array<(string | any)>): T;
    verbose<T>(...args: Array<(string | any)>): T;
    debug<T>(...args: Array<(string | any)>): T;
    info<T>(...args: Array<(string | any)>): T;
    warn<T>(...args: Array<(string | any)>): T;
    error<T>(...args: Array<(string | any)>): T;
    wtf<T>(...args: Array<(string | any)>): T;
}
/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object. Logs differently between Node and Browser.
 */
export declare class Log implements Log {
    filename: string;
    styler: typeof isoStyles[keyof typeof isoStyles];
    constructor(filename: string, style: keyof typeof isoStyles);
}