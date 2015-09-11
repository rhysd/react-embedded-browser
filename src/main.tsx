import * as React from 'react';
import * as Action from './actions';
import Store from './store';

interface BrowserBodyProps {
    className?: string;
}

export class BrowserBody extends React.Component<BrowserBodyProps, {}> {
    public static defaultProps = {className: ""};

    constructor(props: BrowserBodyProps) {
        super(props);
    }

    componentDidMount() {
        let webview = document.createElement('webview') as ElectronWebview;
        webview.style.height = '100%';
        webview.style.width = '100%';

        // Note: Avoid bug of react.d.ts
        let wrapper = (this.refs['wrapper'] as any).getDOMNode() as HTMLDivElement;
        wrapper.appendChild(webview);

        Action.createInnerFrame(webview);
    }

    render() {
        return (
            <div className={this.props.className} ref="wrapper">
            </div>
        );
    }
}

interface ExternalButtonProps {
    className?: string;
    children?: React.ReactElement<any>[];
}

export class ExternalButton extends React.Component<ExternalButtonProps, {}> {
    public static defaultProps = {className: ""};

    constructor(props: ExternalButtonProps) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}


interface CloseButtonProps {
    className?: string;
    children?: React.ReactElement<any>[];
    onClick?: () => void;
}

export class CloseButton extends React.Component<CloseButtonProps, {}> {
    public static defaultProps = {className: ""};

    constructor(props: CloseButtonProps) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

interface PageTitleProps {
    className?: string;
}

export class PageTitle extends React.Component<PageTitleProps, {}> {
    public static defaultProps = {className: ""};

    title_listener: (title: string) => void;

    constructor(props: PageTitleProps) {
        super(props);
    }

    componentDidMount() {
        this.title_listener = title => {
            // Note: Avoid bug of react.d.ts
            let node = (this.refs['node'] as any).getDOMNode() as HTMLDivElement;
            node.innerText = title;
        };
        Store.on('update-title', this.title_listener);
    }

    componentWillUnmount() {
        if (this.title_listener) {
            Store.removeListener('update-title', this.title_listener);
        }
    }

    render() {
        return (
            <div className={this.props.className} ref="title"/>
        );
    }
}

interface ForwardButtonProps {
    className?: string;
    children?: React.ReactElement<any>[];
}

interface ForwardButtonState {
    enabled: boolean;
}

export class ForwardButton extends React.Component<ForwardButtonProps, ForwardButtonState> {
    public static defaultProps = {className: ""};

    forwardable_listener: (b: boolean) => void;

    constructor(props: ForwardButtonProps) {
        super(props);
        this.state = {enabled: false};
    }

    componentDidMount() {
       this.forwardable_listener = forwardable => this.setState({enabled: forwardable});
       Store.on('update-forwardable', this.forwardable_listener);
    }

    componentWillUnmount() {
        if (this.forwardable_listener) {
            Store.removeListener('update-forwardable', this.forwardable_listener);
        }
    }

    getClassName() {
        if (this.state.enabled) {
            return this.props.className;
        } else {
            return this.props.className + " disabled";
        }
    }

    render() {
        return (
            <div className={this.getClassName()} onClick={Action.goForward}>
                {this.props.children}
            </div>
        );
    }
}

interface BackButtonProps {
    className?: string;
    children?: React.ReactElement<any>[];
}

interface BackButtonState {
    enabled: boolean;
}

export class BackButton extends React.Component<BackButtonProps, BackButtonState> {
    public static defaultProps = {className: ""};

    backable_listener: (b: boolean) => void;

    constructor(props: BackButtonProps) {
        super(props);
        this.state = {enabled: false};
    }

    componentDidMount() {
       this.backable_listener = backable => this.setState({enabled: backable});
       Store.on('update-backable', this.backable_listener);
    }

    componentWillUnmount() {
        if (this.backable_listener) {
            Store.removeListener('update-backable', this.backable_listener);
        }
    }

    getClassName() {
        if (this.state.enabled) {
            return this.props.className;
        } else {
            return this.props.className + " disabled";
        }
    }

    render() {
        return (
            <div className={this.getClassName()} onClick={Action.goBack}>
                {this.props.children}
            </div>
        );
    }
}

interface EmbeddedBrowserProps {
    className?: string;
}

export default class EmbeddedBrowser extends React.Component<EmbeddedBrowserProps, {}> {
    public static defaultProps = {className: "embedded-browser"};

    constructor(props: EmbeddedBrowserProps) {
        super(props);
    }

    close() {
        // Note: Avoid bug of react.d.ts
        let root = (this.refs['root'] as any).getDOMNode();
        root.className = this.props.className + " anime-slideout";
    }

    render() {
        return (
            <div className={this.props.className} ref="root">
                <div className="title-bar">
                    <BackButton className="page-back">
                        <i className="fa fa-arrow-left"/>
                    </BackButton>
                    <ForwardButton className="page-forward">
                        <i className="fa fa-arrow-right"/>
                    </ForwardButton>
                    <PageTitle className="page-title"/>
                    <ExternalButton className="page-external">
                        <i className="fa fa-external-link"/>
                    </ExternalButton>
                    <CloseButton className="browser-close" onClick={this.close.bind(this)}>
                        <i className="fa fa-times"/>
                    </CloseButton>
                </div>
                <BrowserBody className="page-body" />
            </div>
        );
    }
}

