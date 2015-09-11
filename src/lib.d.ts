/// <reference path="../typings/tsd.d.ts" />

// Workaround for browserify
declare module NodeJS {
    interface Global {
        require(m: string): any;
    }
}

interface ElectronWebview extends HTMLElement {
    src: string;
    useragent: string;
    httpreferrer: string;
    preload: string;

    openDevTools(): void;
    goBack(): void;
    goForward(): void;
    canGoBack(): boolean;
    canGoForward(): boolean;
    reload(): void;
    undo(): void;
    redo(): void;
    cut(): void;
    copy(): void;
    paste(): void;
    selectAll(): void;
    executeJavaScript(src: string): void;
    insertCSS(src: string): void;
    getUrl(): string;
    stop(): void;
    getTitle(): string;
}
