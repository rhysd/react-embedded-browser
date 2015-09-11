import {ActionKind} from './constants';
import Dispatcher from './dispatcher';

export interface ActionType {
    type: ActionKind;
    url?: string;
    iframe: ElectronWebview;
}

export function goForward() {
    Dispatcher.dispatch({
        type: ActionKind.GoForward,
    });
}

export function goBack() {
    Dispatcher.dispatch({
        type: ActionKind.GoBack,
    });
}

export function createInnerFrame(iframe: ElectronWebview) {
    Dispatcher.dispatch({
        type: ActionKind.CreateInnerFrame,
        inner_frame: iframe,
    });
}

export function openURL(url: string) {
    Dispatcher.dispatch({
        type: ActionKind.OpenURL,
        url: url,
    });
}
