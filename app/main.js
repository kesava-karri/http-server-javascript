const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const commonString = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    data = data.toString("utf-8").split(" ");
    resp = "";
    if (data[1] === "/") {
      resp += "HTTP/1.1 200 OK\r\n\r\n";
    } else if (data[1].startsWith("/echo/")) {
      let leftOverPath = calculateLeftOverPath(data);
      resp +=
        commonString +
        String(leftOverPath.length) +
        "\r\n\r\n" + leftOverPath + "\r\n";
    } else if (data[1].startsWith("/user-agent")) {
      let userAgent = null;
      if (data[4].startsWith("curl")) {
        userAgent = data[4].split("\n")[0].trimStart().trimEnd();
      } else if (data[4].endsWith("Accept-Encoding:")){
        console.log("data:" + data);
        console.log("here:" + data[5]);
        let s = data[4];
        userAgent = s.substring(0, s.lastIndexOf("Accept-Encoding:")).trimEnd();
      } else {
        userAgent = data[5].trimStart().trimEnd();
      }
      resp +=
        "HTTP/1.1 200 OK\nContent-Type: text/plain\r\nContent-Length: " + 
        String(userAgent.length) +
        "\r\n\r\n" + 
        userAgent + "\r\n";
      console.log("userAgent:" + userAgent);
      console.log("len:" + userAgent.length);
    } else {
      resp += "HTTP/1.1 404 Not Found\r\n\r\n";
    }
    socket.write(resp);
    socket.end();
  });

  socket.on("close", () => {
    // socket.end();
    // server.close();

  });
});

server.listen(4221, "localhost");

function calculateLeftOverPath(data) {
  temp = data[1].split("/");
  leftOverPath = temp.length > 2 ? temp.slice(2, temp.length).join("/") : "";
  return leftOverPath;
}
