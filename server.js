const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8080;

const server = http.createServer((request,response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;

    //log entry
    const logEntry =`${new Date().toISOString()}  ${request.url} \n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) throw err;
    });

    if(path === '/documentation'){
        fs.readFile('documentation.html', (err, data) => {
            if(err){
                response.statusCode = 404;
                response.end('404 - Not Found');
                return;
            }
            console.log(response)
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }else{
        fs.readFile('index.html', (err, data) => {
            if(err){
                response.statusCode = 404;
                response.end('404 - Not Found');
                return;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }

});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
