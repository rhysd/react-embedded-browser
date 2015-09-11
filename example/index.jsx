import React from 'react';
import EmbeddedBrowser from 'react-embedded-browser';

function show() {
    console.log('foo!')
    let eb = document.querySelector('.embedded-browser');
    eb.className = 'embedded-browser anime-slidein';
}

React.render(
    <div className="main">
        <button type="button" onClick={show}>push me</button>
        <EmbeddedBrowser/>
    </div>,
    document.body
);
