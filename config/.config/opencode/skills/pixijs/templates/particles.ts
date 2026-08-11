// templates/particles.ts — ParticleContainer with thousands of particles
import { Application, Assets, ParticleContainer, Particle, Rectangle } from 'pixi.js';

async function main() {
  const app = new Application();
  await app.init({ background: '#050510', resizeTo: window });
  document.body.appendChild(app.canvas);

  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

  const container = new ParticleContainer({
    texture,
    boundsArea: new Rectangle(0, 0, app.screen.width, app.screen.height),
    dynamicProperties: { position: true, rotation: true, color: false },
  });

  for (let i = 0; i < 10000; i++) {
    container.addParticle(
      new Particle({
        texture,
        x: Math.random() * app.screen.width,
        y: Math.random() * app.screen.height,
        scaleX: 0.5,
        scaleY: 0.5,
      }),
    );
  }
  app.stage.addChild(container);

  // Animate (position/rotation are dynamic)
  app.ticker.add(() => {
    for (const p of container.particleChildren) {
      p.y += 0.5;
      if (p.y > app.screen.height) p.y = 0;
    }
  });
}

main();
