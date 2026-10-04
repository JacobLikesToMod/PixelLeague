// Pixel League relay server.  Run:  npm install  &&  npm start
// One player "hosts" a match (their browser runs the game). Friends join with a 4-letter room code.
// Guests send controller input to the host; the host sends game snapshots back to the guests.
const { WebSocketServer } = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });
const rooms = new Map(); // code -> { host, guests: Map(id -> ws), next }
const send = (ws, o) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); };
const newCode = () => { let c; do { c = Math.random().toString(36).slice(2, 6).toUpperCase(); } while (rooms.has(c)); return c; };

wss.on('connection', ws => {
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (!m || typeof m !== 'object') return;

    if (m.type === 'host' && !ws.room) {
      const code = newCode();
      rooms.set(code, { host: ws, guests: new Map(), next: 1 });
      ws.room = code; ws.role = 'host';
      send(ws, { type: 'hosted', 

                # HALF OF CODE CUT OFF DUE TO COPYING
