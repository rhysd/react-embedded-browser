import {EventEmitter} from 'events';
import Dispatcher from './dispatcher';
import {ActionType} from './actions';
import {ActionKind} from './constants';

class Store extends EventEmitter {
    forwardable: boolean;
    backable: boolean;
    dispatch_token: string;
    frame: ElectronWebview;

    constructor() {
        super();
        this.frame = null;
        this.forwardable = false;
        this.backable = false;
    }
}

let store = new Store();
export default store;

function updateForwardable(new_value: boolean) {
    if (new_value !== store.forwardable) {
        store.forwardable = new_value;
        store.emit('update-forwardable', new_value);
    }
}

function updateBackable(new_value: boolean) {
    if (new_value !== store.backable) {
        store.backable = new_value;
        store.emit('update-backable', new_value);
    }
}

function goForward() {
    if (store.frame && store.frame.canGoForward()) {
        store.frame.goForward();
    }
}

function goBack() {
    if (store.frame && store.frame.canGoBack()) {
        store.frame.goBack();
    }
}

function createFrame(frame: ElectronWebview) {
    store.frame = frame;
    store.frame.addEventListener('did-finish-load', () => {
        this.emit('update-title', store.frame.getTitle());
        updateForwardable(store.frame.canGoForward());
        updateBackable(store.frame.canGoBack());
    });
}

function openURL(url: string) {
    if (!url) {
        return;
    }

    store.frame.src = url;
}

store.dispatch_token = Dispatcher.register((action: ActionType) => {
    switch(action.type) {
        case ActionKind.GoForward:
            goForward();
            break;
        case ActionKind.GoBack:
            goBack();
            break;
        case ActionKind.CreateInnerFrame:
            createFrame(action.inner_frame);
            break;
        case ActionKind.OpenURL:
            openURL(action.url);
            break;
        default:
            break;
    }
});
