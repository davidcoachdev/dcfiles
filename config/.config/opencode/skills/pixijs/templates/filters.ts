// templates/filters.ts — built-in filter stack + filterArea
import { Application, Assets, Sprite, BlurFilter, ColorMatrixFilter, Rectangle } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({ background: '#000', resizeTo: window });
  document.body.appendChild(app.canvas);

  const sprite = new Sprite(await Assets.load('https://pixijs.com/assets/bunny.png'));
  sprite.x = 100;
  sprite.y = 100;
  app.stage.addChild(sprite);

  const blur = new BlurFilter({ strength: 4, quality: 4 });
  const colorMatrix = new ColorMatrixFilter();
  colorMatrix.brightness(1.2, false);
  colorMatrix.saturate(0.4, false);

  sprite.filters = [blur, colorMatrix];

  // Limit the filter pass region for performance
  sprite.filterArea = new Rectangle(0, 0, app.screen.width, app.screen.height);
}

main();
