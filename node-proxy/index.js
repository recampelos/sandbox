var http = require('http'),
    httpProxy = require('http-proxy'),
    config = require('./proxy.config.json');

var proxy = httpProxy.createProxyServer({});

http.createServer((req, resp) => {
    console.log(req.url);

    var conf = config.find(proxyConfig => req.url.startsWith(proxyConfig.path));

    if (conf) {
        if (conf.removePath) {
            req.url = req.url.replace(conf.path, '');
            console.log(req.url);
        }
        proxy.web(req, resp, {target: conf.host})
    } else {
        proxy.web(req, resp, {target: 'http://localhost:4200'})
    }
}).listen(80)