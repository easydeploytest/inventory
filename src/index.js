const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const APP = process.env.OTEL_SERVICE_NAME || 'inventory';
const PUBLIC = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const INDEX = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Inventory Experience Prototype - Digital Realty</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--blue:#1E35D8;--ink:#1a1a2e;--muted:#5a5a7a;--line:#e0e2ef;--panel:#fff;--bg:#f5f6fa;--teal:#00838f;--green:#2e7d32}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;padding:32px 20px}
.shell{max-width:1040px;width:100%;margin:0 auto}
.topbar{height:56px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);margin-bottom:44px}
.logo{display:flex;align-items:center;gap:18px;min-width:0}
.brand-logo{width:258px;max-width:52vw;height:auto;display:block;flex:0 0 auto}
.logo-sub{font-size:12px;color:var(--muted);font-weight:700;white-space:nowrap}
.status{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px;font-weight:600}
.status-dot{width:8px;height:8px;border-radius:50%;background:var(--green)}
.intro{max-width:720px;margin-bottom:28px}
.eyebrow{font-size:11px;font-weight:800;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
h1{font-size:32px;font-weight:800;color:var(--ink);margin-bottom:10px;line-height:1.15}
.sub{font-size:15px;color:var(--muted);line-height:1.55}
.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:28px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:24px;text-decoration:none;display:flex;align-items:flex-start;gap:18px;transition:box-shadow .15s,border-color .15s,transform .15s;box-shadow:0 1px 4px rgba(0,0,0,.06);min-height:184px}
.card:hover{border-color:var(--blue);box-shadow:0 8px 24px rgba(30,53,216,.12);transform:translateY(-1px)}
.card:focus-visible{outline:3px solid rgba(30,53,216,.25);outline-offset:3px}
.card-icon{width:48px;height:48px;border-radius:8px;background:#eef0fd;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.card-icon svg{width:24px;height:24px;color:var(--blue)}
.card-body{flex:1;min-width:0}
.card-title{font-size:18px;font-weight:800;color:var(--ink);margin-bottom:8px}
.card-desc{font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:16px}
.card-meta{display:flex;flex-wrap:wrap;gap:8px}
.card-tag{font-size:10px;font-weight:800;text-transform:uppercase;padding:4px 8px;border-radius:999px;display:inline-block}
.tag-blue{background:#eef0fd;color:var(--blue)}
.tag-teal{background:#e0f4f5;color:var(--teal)}
.tag-green{background:#e7f2e8;color:var(--green)}
.card-arrow{color:#c0c4d8;flex:0 0 auto;margin-top:14px}
.footer{margin-top:28px;padding-top:16px;border-top:1px solid var(--line);font-size:12px;color:#777795;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
@media (max-width:760px){body{padding:20px 16px}.topbar{height:auto;align-items:flex-start;gap:16px;flex-direction:column;margin-bottom:32px}.cards{grid-template-columns:1fr}.card{min-height:0}.status{align-self:flex-start}h1{font-size:28px}.logo{align-items:flex-start;flex-direction:column;gap:10px}.brand-logo{max-width:260px;width:72vw}.logo-sub{white-space:normal}}
</style>
</head>
<body>
<div class="shell">
  <header class="topbar">
    <div class="logo">
      <img class="brand-logo" src="/dlr-logo.jpg" alt="Digital Realty">
      <div>
        <div class="logo-sub">Inventory Experience Prototype</div>
      </div>
    </div>
    <div class="status"><span class="status-dot"></span> Prototype environment</div>
  </header>

  <main>
    <div class="intro">
      <div class="eyebrow">Inventory prototype workspace</div>
      <h1>Inventory and product reporting</h1>
      <p class="sub">A single entry point for the working inventory prototype, reporting views, and near-term UI exploration around data center inventory, availability, product reporting, and analysis.</p>
    </div>

    <div class="cards">
      <a class="card" href="/prototype">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        </div>
        <div class="card-body">
          <div class="card-title">Inventory experience prototype</div>
          <div class="card-desc">Core experience for site directory, exploration, search, products, capacity drill-down, and assistant-driven analysis.</div>
          <div class="card-meta">
            <span class="card-tag tag-blue">Working mockup</span>
            <span class="card-tag tag-green">Primary path</span>
          </div>
        </div>
        <div class="card-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </a>

      <a class="card" href="/reporting">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </div>
        <div class="card-body">
          <div class="card-title">Product reporting views</div>
          <div class="card-desc">Analysis surfaces for velocity, funnel, win/loss, revenue benchmarking, power utilization, operations, and availability reporting.</div>
          <div class="card-meta">
            <span class="card-tag tag-teal">Reporting</span>
            <span class="card-tag tag-blue">Exploration path</span>
          </div>
        </div>
        <div class="card-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </a>
    </div>
  </main>

  <footer class="footer">
    <span>Digital Realty Product Team</span>
    <span>Prototype only. Illustrative data.</span>
  </footer>
</div>
</body>
</html>`;

const mockupShell = ({ title, section, description, src }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} - Inventory Experience Prototype</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--blue:#1E35D8;--ink:#1a1a2e;--muted:#5a5a7a;--line:#e0e2ef;--panel:#fff;--bg:#f5f6fa}
html,body{height:100%;overflow:hidden}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--ink)}
.frame-shell{height:100vh;display:grid;grid-template-rows:48px minmax(0,1fr)}
.frame-top{background:rgba(255,255,255,.96);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 18px;box-shadow:0 1px 4px rgba(0,0,0,.04);z-index:2}
.crumbs{display:flex;align-items:center;gap:8px;min-width:0;font-size:12px;color:var(--muted);font-weight:700}
.crumb-home{color:var(--blue);text-decoration:none;white-space:nowrap}
.crumb-home:hover{text-decoration:underline}
.sep{color:#b0b3c4}
.current{color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.desc{font-size:12px;color:var(--muted);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.actions{display:flex;align-items:center;gap:10px;flex:0 0 auto}
.home-link{height:30px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--blue);text-decoration:none;display:inline-flex;align-items:center;gap:6px;padding:0 10px;font-size:12px;font-weight:800}
.home-link:hover{border-color:var(--blue);box-shadow:0 2px 8px rgba(30,53,216,.10)}
iframe{width:100%;height:100%;border:0;background:#fff;display:block}
@media (max-width:760px){.frame-top{height:auto;min-height:56px;align-items:flex-start;flex-direction:column;padding:8px 12px;gap:4px}.frame-shell{grid-template-rows:auto minmax(0,1fr)}.desc{display:none}.actions{position:absolute;right:12px;top:9px}.crumbs{padding-right:110px;flex-wrap:wrap;row-gap:2px}.current{white-space:normal}}
</style>
</head>
<body>
<div class="frame-shell">
  <header class="frame-top">
    <div class="crumbs" aria-label="Prototype location">
      <a class="crumb-home" href="/">Inventory Experience Prototype</a>
      <span class="sep">/</span>
      <span class="current">${section}</span>
    </div>
    <div class="desc">${description}</div>
    <div class="actions">
      <a class="home-link" href="/" aria-label="Back to prototype landing">Back home</a>
    </div>
  </header>
  <iframe src="${src}" title="${title}"></iframe>
</div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(INDEX);
    return;
  }

  if (url === '/prototype') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(mockupShell({
      title: 'Inventory Experience',
      section: 'Inventory experience prototype',
      description: 'Use Products > Reporting for integrated product reporting pages and expandable visuals.',
      src: '/iex_prototype_v1_static.html',
    }));
    return;
  }

  if (url === '/reporting') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(mockupShell({
      title: 'Product Reporting Views',
      section: 'Product reporting views',
      description: 'Reporting and analysis views for inventory, availability, sales velocity, operations, and product performance.',
      src: '/reporting_views_mockup_static.html',
    }));
    return;
  }

  let filePath;
  try {
    filePath = path.join(PUBLIC, decodeURIComponent(url));
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad request');
    return;
  }

  const relativePath = path.relative(PUBLIC, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(JSON.stringify({ level: 'info', message: 'server started', app: APP, port: PORT }));
});
