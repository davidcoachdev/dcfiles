// templates/interactive.ts — eventMode + click + drag (federated events)
import { Application, Assets, Sprite } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({ background: '#1a1a2e', resizeTo: window });
  document.body.appendChild(app.canvas);

  const button = new Sprite(await Assets.load('https://pixijs.com/assets/bunny.png'));
  button.anchor.set(0.5);
  button.x = app.screen.width / 2;
  button.y = app.screen.height / 2;
  button.eventMode = 'static'; // opt into interaction
  button.cursor = 'pointer';
  app.stage.addChild(button);

  button.on('pointertap', (e) => {
    console.log('tapped at', e.global.x, e.global.y);
  });

  // Drag
  let dragging = false;
  const onMove = (e: any) => {
    button.parent.toLocal(e.global, undefined, button.position);
  };
  button.on('pointerdown', (e) => {
    dragging = true;
    button.on('globalpointermove', onMove); // fires even when pointer leaves the sprite
  });
  const endDrag = () => {
    dragging = false;
    button.off('globalpointermove', onMove);
  };
  button.on('pointerup', endDrag);
  button.on('pointerupoutside', endDrag);
}

main();
