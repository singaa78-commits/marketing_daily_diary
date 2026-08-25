const fs = require("fs");
const path = require("path");
const root = __dirname;
const outDir = path.join(root, "dist", "server");
fs.mkdirSync(outDir, { recursive: true });
const files = {
  "/": { contentType: "text/html; charset=utf-8", body: fs.readFileSync(path.join(root, "index.html"), "utf8") },
  "/index.html": { contentType: "text/html; charset=utf-8", body: fs.readFileSync(path.join(root, "index.html"), "utf8") },
  "/styles.css": { contentType: "text/css; charset=utf-8", body: fs.readFileSync(path.join(root, "styles.css"), "utf8") },
  "/app.js": { contentType: "application/javascript; charset=utf-8", body: fs.readFileSync(path.join(root, "app.js"), "utf8") },
};
const worker = [
  "const files = " + JSON.stringify(files) + ";",
  "export default {",
  "  async fetch(request) {",
  "    const url = new URL(request.url);",
  "    const pathname = url.pathname === '/' ? '/' : url.pathname;",
  "    const file = files[pathname] || files['/'];",
  "    return new Response(file.body, {",
  "      headers: {",
  "        'content-type': file.contentType,",
  "        'cache-control': pathname === '/' || pathname === '/index.html' ? 'no-cache' : 'public, max-age=31536000, immutable',",
  "      },",
  "    });",
  "  },",
  "};",
  "",
].join("\n");
fs.writeFileSync(path.join(outDir, "index.js"), worker, "utf8");
console.log("Built dist/server/index.js");
