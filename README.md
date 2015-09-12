React Embedded Browser Component for Electron
=============================================

This is a React.js component to provide an embedded browser like mobile apps.

![screenshot]()

## Usage

Insall with npm

```
$ npm install react-embedded-browser
```

You can use `default.css` and `EmbeddedBrowser` component as below:

```javascript
import React from 'react';
import EmbeddedBrowser from 'react-embedded-browser';

React.render(
    <div>
        <button onClick={show}>push me</button>
        <EmbeddedBrowser />
    </div>,
    document.body
);
```

And you can open URL with `open()` method of DOM node of `<EmbeddedBrowser/>`.

```
let browser = document.querySelector('.embedded-browser');
browser.open('https://example.com');
```

__Node:__ Only one embedded browser can exist in the app.

## Customization

If you only want to change the design of embedded browser, prepare your favorite CSS file and simply use it.  You can copy the `default.css` and modify it.

If you want to arrange the back/forward buttons, external buttons, title and webview, you can use the each components and you can make your own embedded browser as you like.  Please use `<BackButton>`, `<ForwardButton>`, `<PageTitle>`, `<ExternalButton>` and `<BrowserBody>` as below.

```javascript
render() {
    return (
        <div className="my-so-cool-browser">
            <div className="my-so-cool-title-bar">
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
            </div>
            <BrowserBody className="page-body" ref="body"/>
        </div>
    );
}
```

To tell which URL should be open, you can use `open()` method in `<BrowserBody/>` DOM node.

## License

This repository is licensed under [the MIT License](LICENSE.txt).
