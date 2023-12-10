const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use("/api", require("./src/routes/api/"));
  console.log("Server configured for /api");

  // Default handler for Next.js pages
  async function handler(req, res) {
    console.log("Request received at /api/post");
    server.all("*", (req, res) => {
      return handle(req, res);
    });
  }

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
