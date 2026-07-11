# Sketchy Variant

Hand-drawn SVG filter for essays (not technical docs).

## Pattern

Add to SVG defs:

```svg
<filter id="sketchy">
  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

Apply to diagram group:

```svg
<g filter="url(#sketchy)">
  <!-- diagram content -->
</g>
```

## When to Use
- Essays, blog posts
- Narrative content
- NOT: technical documentation

## Note
Adds ~2KB. Renders slower. Use sparingly.