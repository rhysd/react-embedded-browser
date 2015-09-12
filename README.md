React Embedded Browser Component for Electron
=============================================

This is a React.js component to provide an embedded browser like mobile apps.

![screenshot](https://raw.githubusercontent.com/rhysd/ss/master/react-embedded-browser/main.gif)

## Usage

You can try [the example in this repository](example/);

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

__Note:__ Only one embedded browser can exist in the app.

__Note:__ `<EmbeddedBrowser>` depends on [FontAwesome](https://fortawesome.github.io/Font-Awesome/).  Please be sure to install it in your project.

## Customization

If you only want to change the design of embedded browser, prepare your favorite CSS file and simply use it.  You can copy the `default.css` and modify it.

If you want to arrange the back/forward buttons, external buttons, title and webview, you can use the each components and you can make your own embedded browser as you like.  Please use `<BackButton>`, `<ForwardButton>`, `<PageTitle>`, `<ExternalButton>` and `<BrowserBody>` as below.  Note that each elements don't depend on FontAwesome.

```javascript
render() {
    return (
        <div className="my-so-cool-browser">
            <div className="my-so-cool-title-bar">
                <BackButton className="page-back">
                    Back!
                </BackButton>
                <ForwardButton className="page-forward">
                    Forward!
                </ForwardButton>
                <PageTitle className="page-title"/>
                <ExternalButton className="page-external">
                    Open in external browser!
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
