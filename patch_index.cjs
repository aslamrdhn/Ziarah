const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const headInject = `
    <meta name="theme-color" content="#f4f7f4" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Ziarah" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
`;

content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' + headInject);

fs.writeFileSync('index.html', content);
console.log('patched index.html');
