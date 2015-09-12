import React from 'react';
import EmbeddedBrowser from 'react-embedded-browser';

function show() {
    let eb = document.querySelector('.embedded-browser');
    eb.className = 'embedded-browser anime-slidein';
    eb.open('https://github.com');
}

React.render(
    <div className="main">
        <button type="button" onClick={show}>push me</button>
        <EmbeddedBrowser/>
    </div>,
    document.body
);
