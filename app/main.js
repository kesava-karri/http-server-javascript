const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // console.log("1: " + data);
    data = data.toString("utf-8").split(" ");
    resp = "";
    if (data[1] === "/") {
      resp += "HTTP/1.1 200 OK\r\n\r\n";
    } else if (data[1].startsWith("/echo/")) {
      temp = data[1].split("/");
      leftOverPath =
        temp.length > 2 ? temp.slice(2, temp.length).join("/") : "";
      resp +=
        "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: " +
        String(leftOverPath.length) +
        "\r\n\r\n";
      resp += leftOverPath + "\r\n";
    } else {
      resp += "HTTP/1.1 404 Not Found\r\n\r\n";
    }
    console.log(resp);
    socket.write(resp);
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
