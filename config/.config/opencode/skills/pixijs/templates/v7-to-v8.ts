// templates/v7-to-v8.ts — side-by-side migration snippets
import { Application, Graphics, Sprite, Assets, Text } from 'pixi.js';

async function main() {
  // ---- Application ----
  // v7: const app = new Application({ width: 800, height: 600 }); app.view
  // v8:
  const app = new Application();
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas); // app.canvas (not app.view)

  // ---- Graphics ----
  // v7: g.beginFill(0xff0000); g.drawRect(0,0,100,100); g.endFill(); g.lineStyle(2,0x0);
  // v8:
  const g = new Graphics();
  g.rect(0, 0, 100, 100).fill(0xff0000).stroke({ width: 2, color: 0x000000 });
  app.stage.addChild(g);

  // ---- Text ----
  // v7: new Text('hi', { fontFamily: 'Arial', fontSize: 24 });
  // v8:
  const t = new Text({ text: 'hi', style: { fontFamily: 'Arial', fontSize: 24 } });
  app.stage.addChild(t);

  // ---- Events ----
  // v7: sprite.interactive = true; sprite.on('click', fn);
  // v8:
  const s = new Sprite(await Assets.load('https://pixijs.com/assets/bunny.png'));
  s.eventMode = 'static';
  s.on('pointertap', () => console.log('tap'));
  app.stage.addChild(s);

  // ---- Ticker ----
  // v7: app.ticker.add((delta) => { ... })   // delta is a raw number
  // v8:
  app.ticker.add((ticker) => {
    g.rotation += 0.01 * ticker.deltaTime;
  });

  // ---- Other removals ----
  // @pixi/* core imports  -> from 'pixi.js'
  // BaseTexture           -> texture.source (TextureSource)
  // DisplayObject         -> Container
  // cacheAsBitmap         -> cacheAsTexture(true)
}

main();
