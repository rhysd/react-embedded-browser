var path = require('path');
var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {
    var win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadUrl('file://' + path.join(__dirname, 'index.html'));
    win.openDevTools();
    win.on('closed', function(){
        win = null;
    });
    win.on('all-window-closed', function(){
        app.quit();
    });
});
