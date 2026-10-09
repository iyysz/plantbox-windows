const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const http = require("http");
const fs = require("fs");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json",
  ".wasm": "application/wasm",
};

function distRoot() {
  // Packaged: resources/app.asar/dist or resources/dist
  if (app.isPackaged) {
    const asarDist = path.join(process.resourcesPath, "app.asar", "dist");
    const plainDist = path.join(process.resourcesPath, "dist");
    const appDist = path.join(app.getAppPath(), "dist");
    if (fs.existsSync(path.join(app.getAppPath(), "dist", "index.html"))) return path.join(app.getAppPath(), "dist");
    if (fs.existsSync(path.join(plainDist, "index.html"))) return plainDist;
    return asarDist;
  }
  return path.join(__dirname, "..", "dist");
}

function startStaticServer(root) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
        let filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath);
        if (!filePath.startsWith(root)) {
          res.writeHead(403);
          res.end("Forbidden");
          return;
        }
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          filePath = path.join(root, "index.html");
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
      } catch (err) {
        res.writeHead(500);
        res.end(String(err));
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
    server.on("error", reject);
  });
}

let mainWindow;
let staticServer;

async function createWindow() {
  const root = distRoot();
  const { server, port } = await startStaticServer(root);
  staticServer = server;

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    title: "达丰智慧仓储",
    backgroundColor: "#0b1220",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  await mainWindow.loadURL(`http://127.0.0.1:${port}/#/zh`);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (staticServer) {
    try { staticServer.close(); } catch (_) {}
  }
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
