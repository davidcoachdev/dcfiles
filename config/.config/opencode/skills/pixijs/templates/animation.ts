// templates/animation.ts — Ticker game loop (frame-rate independent)
import { Application, Sprite, Assets } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({ background: '#101820', resizeTo: window });
  document.body.appendChild(app.canvas);

  const sprite = new Sprite(await Assets.load('https://pixijs.com/assets/bunny.png'));
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  app.stage.addChild(sprite);

  // deltaTime is frame-normalized (~1 at 60fps); use it for smooth motion
  app.ticker.add((ticker) => {
    sprite.rotation += 0.02 * ticker.deltaTime;
    sprite.y += Math.sin(ticker.lastTime / 300) * 0.5;
  });

  // Access the elapsed real time:
  // const dtMs = ticker.deltaMS;
}

main();
