// templates/basic-app.ts — minimal PixiJS v8 app
import { Application } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({
    resizeTo: window,
    background: '#1099bb',
    antialias: true,
    preference: 'webgl',
    autoDensity: true,
    resolution: window.devicePixelRatio,
  });
  document.body.appendChild(app.canvas);

  // Your scene code here (app.stage.addChild(...))

  // Optional manual loop:
  // app.ticker.add((t) => { /* update */ });
}

main();
