// CI-only REST fixture. Production failures must still throw, never become empty content.
import { createServer } from "node:http";

createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:54329");
  if (request.method === "GET" && url.pathname === "/rest/v1/blog_posts") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end("[]");
    return;
  }
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Unexpected CI fixture request" }));
}).listen(54329, "127.0.0.1");
