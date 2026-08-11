# Text — PixiJS v8

PixiJS offers several text renderers. Pick by need: `Text` (general), `BitmapText` (many dynamic labels), `HTMLText` (rich HTML/CSS), `SplitText` (per-character animation).

## Text

```ts
import { Text } from 'pixi.js';

const text = new Text({
  text: 'Hello!',
  style: {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,         // color (number or CSS string)
    fontWeight: 'bold',
    align: 'center',
    stroke: { color: 0x000000, width: 3 }, // v8 object form
    dropShadow: { color: 0x000000, blur: 4, distance: 2 },
  },
});
app.stage.addChild(text);
```

- `text.text = 'new'` updates content; `text.style` is a `TextStyle` (mutating it re-renders).
- `anchor` works like a Sprite: `text.anchor.set(0.5)`.
- `resolution` scales the internal bitmap for crisp text on HiDPI.

## BitmapText

Cheapest for many labels (pre-rendered glyph atlas). Provide a font (BitmapFont) first.

```ts
import { BitmapText, BitmapFont } from 'pixi.js';

BitmapFont.install({
  name: 'MyFont',
  style: { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff },
});

const bmp = new BitmapText({ text: 'Score: 0', style: { fontFamily: 'MyFont', fontSize: 32 } });
app.stage.addChild(bmp);
```

## HTMLText

Renders styled HTML/CSS (uses an offscreen DOM). Good for rich copy, heavier than `Text`.

```ts
import { HTMLText } from 'pixi.js';
const html = new HTMLText({ text: '<b>Hi</b> <i>there</i>', style: { fontFamily: 'Arial', fontSize: 20 } });
```

## SplitText

Splits a string into per-character `Text` objects for animation (installable via `pixi.js/split-text`).

## TextStyle

`TextStyle` is reusable and observable:

```ts
import { TextStyle, Text } from 'pixi.js';
const style = new TextStyle({ fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
const t = new Text({ text: 'x', style });
style.fontSize = 32; // t re-renders automatically
```

## Gotchas

- `fill` accepts a color; use `stroke: { color, width }` (not the v7 `stroke` string).
- `BitmapText` needs an installed `BitmapFont` before use.
- For frequently changing large text, `BitmapText` is faster than `Text`.
