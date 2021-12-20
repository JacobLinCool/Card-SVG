# Card SVG

Create SVG Cards.

## Example

```typescript
import { Card } from "card-svg";

const card = new Card()
    .size(400, 200)
    .theme("nord")
    .background()
    .text("JacobLinCool", "text1", { x: 20, y: 30 });

const svg = card.export();
```

## API

### size(width, height)

* width: number
* height: number

### theme(name)

* name: string

> Themes: light, dark, nord

### text(value, color_type, { x, y })

### rect(color_type, { x, y, r, width, height })

### circle(color_type, { x, y, r })

### line(color_type, { x1, y1, x2, y2, r, weight })

### raw(svg, { x, y })

### export()
