const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    if (data.at(4) + data.at(5) === "79") {
      // summation of ascii values of / : [slash space]
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
      socket.end();
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      socket.end();
    }
  });

  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
