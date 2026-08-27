import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
const DIR = process.argv[2];
const FPS = 24, SECS = 10, N = FPS * SECS;
mkdirSync(DIR, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 1 });
await p.goto('file://' + DIR + '/../foodloop.html');
await p.waitForFunction(() => !!window.renderFrame);
for (let n = 0; n < N; n++) {
  await p.evaluate(([n, f]) => window.renderFrame(n, f), [n, FPS]);
  await p.screenshot({ path: `${DIR}/f${String(n).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
}
await b.close();
console.log('captured', N, 'jpeg frames');
