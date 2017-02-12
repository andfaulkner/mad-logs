export declare function isolog(TAG?: string): {
    silly: (...msg: any[]) => void;
    verbose: (...msg: any[]) => void;
    debug: (...msg: any[]) => void;
    info: (...msg: any[]) => void;
    warn: (...msg: any[]) => void;
    error: (...msg: any[]) => void;
    wtf: (...msg: any[]) => void;
};
export declare const isoLog: typeof isolog;
