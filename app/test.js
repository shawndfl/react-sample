require("http").createServer((inRequest, inResponse) => {
	inResponse.end("I hope this works");
}).listen(8080);
