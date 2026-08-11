// templates/graphics.ts — vector shapes with the v8 shape-then-fill API
import { Application, Graphics } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({ background: '#0e0e0e', resizeTo: window });
  document.body.appendChild(app.canvas);

  const g = new Graphics();

  // Filled + stroked rectangle
  g.rect(40, 40, 200, 120)
    .fill({ color: 0x3498db, alpha: 0.9 })
    .stroke({ width: 3, color: 0x2c3e50 });

  // Circle (color shorthand)
  g.circle(360, 100, 60).fill(0xe74c3c);

  // Rounded rect
  g.roundRect(40, 200, 160, 90, 16).fill(0x2ecc71);

  // Bezier path
  g.moveTo(260, 220)
    .lineTo(420, 220)
    .bezierCurveTo(470, 260, 320, 320, 260, 280)
    .closePath()
    .fill(0x9b59b6);

  app.stage.addChild(g);
}

main();
