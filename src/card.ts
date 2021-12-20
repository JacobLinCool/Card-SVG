import type { ThemeName, ThemeColor } from "./themes";
import { generate_css } from "./theme";

export type ElementType = "text" | "rect" | "circle" | "line" | "raw";

export interface Element {
    type: ElementType;
}

export class TextElement implements Element {
    public type: ElementType = "text";
    public text: string;
    public color: ThemeColor;
    public x: number;
    public y: number;

    constructor(attrs: { text: string; color: ThemeColor; x: number; y: number; [key: string]: unknown }) {
        Object.assign(this, attrs);

        this.text = attrs.text;
        this.color = attrs.color;
        this.x = attrs.x;
        this.y = attrs.y;
    }
}

export class RectElement implements Element {
    public type: ElementType = "rect";
    public color: ThemeColor;
    public x: number;
    public y: number;
    public r: number;
    public width: number;
    public height: number;

    constructor(attrs: { color: ThemeColor; x: number; y: number; r: number; width: number; height: number; [key: string]: unknown }) {
        Object.assign(this, attrs);

        this.color = attrs.color;
        this.x = attrs.x;
        this.y = attrs.y;
        this.r = attrs.r;
        this.width = attrs.width;
        this.height = attrs.height;
    }
}

export class CircleElement implements Element {
    public type: ElementType = "circle";
    public color: ThemeColor;
    public x: number;
    public y: number;
    public r: number;

    constructor(attrs: { color: ThemeColor; x: number; y: number; r: number; [key: string]: unknown }) {
        Object.assign(this, attrs);

        this.color = attrs.color;
        this.x = attrs.x;
        this.y = attrs.y;
        this.r = attrs.r;
    }
}

export class LineElement implements Element {
    public type: ElementType = "line";
    public color: ThemeColor;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public r: number;
    public weight: number;

    constructor(attrs: { color: ThemeColor; x1: number; y1: number; x2: number; y2: number; r: number; weight: number; [key: string]: unknown }) {
        Object.assign(this, attrs);

        this.color = attrs.color;
        this.x1 = attrs.x1;
        this.y1 = attrs.y1;
        this.x2 = attrs.x2;
        this.y2 = attrs.y2;
        this.r = attrs.r;
        this.weight = attrs.weight;
    }
}

export class RawElement implements Element {
    public type: ElementType = "raw";
    public svg: string;
    public x: number;
    public y: number;

    constructor(attrs: { svg: string; x: number; y: number; [key: string]: unknown }) {
        Object.assign(this, attrs);

        this.svg = attrs.svg;
        this.x = attrs.x;
        this.y = attrs.y;
    }
}

export class Card {
    public _width = 0;
    public _height = 0;
    public _theme: ThemeName = "light";
    public _children: Element[] = [];

    /**
     * Set card size
     * @param width
     * @param height
     * @returns
     */
    public size(width: number, height: number): this {
        this._width = width;
        this._height = height;
        return this;
    }

    /**
     * Set theme
     * @param theme
     * @returns
     */
    public theme(theme: ThemeName): this {
        this._theme = theme;
        return this;
    }

    /**
     * Add Text element
     * @param value
     * @param color
     * @param attrs
     * @returns
     */
    public text(value = "", color: ThemeColor = "tx1", attrs: { x: number; y: number } = { x: 0, y: 0 }): this {
        this._children.push(new TextElement({ text: value, color, x: attrs.x || 0, y: attrs.y || 0 }));
        return this;
    }

    /**
     * Add Rect element
     * @param color
     * @param attrs
     * @returns
     */
    public rect(
        color: ThemeColor = "bg1",
        attrs: { x: number; y: number; r: number; width: number; height: number } = { x: 0, y: 0, r: 0, width: 0, height: 0 },
    ): this {
        this._children.push(new RectElement({ color, x: attrs.x || 0, y: attrs.y || 0, r: attrs.r || 0, width: attrs.width || 0, height: attrs.height || 0 }));
        return this;
    }

    /**
     * Shorthand for background
     * @param color
     * @param r
     * @returns
     */
    public background(color: ThemeColor = "bg1", r = 0): this {
        return this.rect(color, { x: 0, y: 0, r, width: this._width, height: this._height });
    }

    /**
     * Add Circle element
     * @param color
     * @param attrs
     * @returns
     */
    public circle(color: ThemeColor = "ac1", attrs: { x: number; y: number; r: number } = { x: 0, y: 0, r: 0 }): this {
        this._children.push(new CircleElement({ color, x: attrs.x || 0, y: attrs.y || 0, r: attrs.r || 0 }));
        return this;
    }

    /**
     * Add Line element
     * @param color
     * @param attrs
     * @returns
     */
    public line(
        color: ThemeColor = "ac1",
        attrs: { x1: number; y1: number; x2: number; y2: number; r: number; weight: number } = { x1: 0, y1: 0, x2: 0, y2: 0, r: 0, weight: 0 },
    ): this {
        this._children.push(
            new LineElement({ color, x1: attrs.x1 || 0, y1: attrs.y1 || 0, x2: attrs.x2 || 0, y2: attrs.y2 || 0, r: attrs.r || 0, weight: attrs.weight || 0 }),
        );
        return this;
    }

    /**
     * Add Raw SVG element
     * @param svg
     * @param attrs
     * @returns
     */
    public raw(svg: string, attrs: { x: number; y: number } = { x: 0, y: 0 }): this {
        this._children.push(new RawElement({ svg, x: attrs.x || 0, y: attrs.y || 0 }));
        return this;
    }

    /**
     * Export to SVG
     * @returns SVG string
     */
    public export(): string {
        const { _width, _height, _theme, _children } = this;
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${_width}" height="${_height}" viewBox="0 0 ${_width} ${_height}" class="theme-${_theme}">`;
        for (const child of _children) {
            switch (child.type) {
                case "text": {
                    const c = child as TextElement;
                    svg += `<text x="${c.x}" y="${c.y}" class="clr-${c.color}">${c.text}</text>`;
                    break;
                }
                case "rect": {
                    const c = child as RectElement;
                    svg += `<rect x="${c.x}" y="${c.y}" rx="${c.r}" ry="${c.r}" width="${c.width}" height="${c.height}" class="clr-${c.color}"></rect>`;
                    break;
                }
                case "circle": {
                    const c = child as CircleElement;
                    svg += `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" class="clr-${c.color}"></circle>`;
                    break;
                }
                case "line": {
                    const c = child as LineElement;
                    svg += `<line x1="${c.x1}" y1="${c.y1}" x2="${c.x2}" y2="${c.y2}" stroke-width="${c.weight}" class="clr-${c.color}"></line>`;
                    break;
                }
                case "raw": {
                    svg += (child as RawElement).svg;
                    break;
                }
            }
        }

        svg += `<style>${generate_css(this._theme)}</style>`;

        return svg + "</svg>";
    }
}

export default Card;
