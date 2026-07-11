# Annotation Callout

Editorial aside in margins, italic serif with dashed leader line.

## Pattern

```svg
<!-- Annotation box -->
<rect x="X" y="Y" width="W" height="H" rx="4" fill="paper"/>
<text x="X+P" y="Y+P+14" font-family="Instrument Serif" font-style="italic" font-size="14" fill="ink">
  Editorial comment here
</text>
<!-- Dashed leader to focal point -->
<path d="M FROM_X FROM_Y Q CONTROL_X CONTROL_Y TO_X TO_Y" 
      stroke="muted" stroke-width="1" stroke-dasharray="4,3" fill="none"/>
```

## Rules
- Font: Instrument Serif italic only
- Position: margins, not inside diagram
- Leader: dashed Bézier curve
- Max 2 per diagram