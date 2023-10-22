const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // console.log("1: " + data);
    data = data.toString("utf-8").split(" ");
    if (data[1] == "/") {
      socket.write("HTTP/1.1 200 OK\r\n");
    } else if (data[1].startsWith("/echo/")) {
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/plain\r\n");
      socket.write("Content-Length: 3\r\n");
      socket.write("\r\n");
      socket.write(data[1].split("/")[2]);
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
