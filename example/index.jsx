import React from 'react';
import EmbeddedBrowser from 'react-embedded-browser';

function show() {
    let eb = document.querySelector('.embedded-browser');
    eb.className = 'embedded-browser anime-slidein';
    eb.open('https://google.com');
}

React.render(
    <div>
        <button type="button" onClick={show}>push me</button>
        <EmbeddedBrowser id="scaffolded-browser" />
    </div>,
    document.getElementById('example1')
);
