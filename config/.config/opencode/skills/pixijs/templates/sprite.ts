// templates/sprite.ts — load a texture and show a sprite
import { Application, Assets, Sprite } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({ background: '#111', resizeTo: window });
  document.body.appendChild(app.canvas);

  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const sprite = new Sprite(texture);
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  app.stage.addChild(sprite);
}

main();
