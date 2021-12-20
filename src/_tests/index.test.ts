import { Card, CircleElement, LineElement, RawElement, RectElement, TextElement } from "../";

describe("Card", () => {
    it("should be defined", () => {
        expect(Card).toBeDefined();
    });

    it("should be a function", () => {
        expect(Card).toBeInstanceOf(Function);
    });
});

describe("card", () => {
    it("should be an instance of Card", () => {
        const card = new Card();
        expect(card).toBeInstanceOf(Card);
    });

    it("should have a size method", () => {
        const card = new Card();
        expect(card.size).toBeDefined();
        expect(card._width).toBe(0);
        expect(card._height).toBe(0);
        card.size(123, 456);
        expect(card._width).toBe(123);
        expect(card._height).toBe(456);
    });

    it("should have a theme method", () => {
        const card = new Card();
        expect(card.theme).toBeDefined();
        expect(card._theme).toBe("light");
        card.theme("dark");
        expect(card._theme).toBe("dark");
    });

    it("should have a text method", () => {
        const card = new Card();
        expect(card.text).toBeDefined();
        expect(card._children).toHaveLength(0);
        card.text("Hello World");
        expect(card._children).toHaveLength(1);
        expect(card._children[0]).toBeInstanceOf(TextElement);
    });

    it("should have a rect method", () => {
        const card = new Card();
        expect(card.rect).toBeDefined();
        expect(card._children).toHaveLength(0);
        card.rect();
        expect(card._children).toHaveLength(1);
        expect(card._children[0]).toBeInstanceOf(RectElement);
    });

    it("should have a circle method", () => {
        const card = new Card();
        expect(card.circle).toBeDefined();
        expect(card._children).toHaveLength(0);
        card.circle();
        expect(card._children).toHaveLength(1);
        expect(card._children[0]).toBeInstanceOf(CircleElement);
    });

    it("should have a line method", () => {
        const card = new Card();
        expect(card.line).toBeDefined();
        expect(card._children).toHaveLength(0);
        card.line();
        expect(card._children).toHaveLength(1);
        expect(card._children[0]).toBeInstanceOf(LineElement);
    });

    it("should have a raw method", () => {
        const card = new Card();
        expect(card.raw).toBeDefined();
        expect(card._children).toHaveLength(0);
        card.raw("");
        expect(card._children).toHaveLength(1);
        expect(card._children[0]).toBeInstanceOf(RawElement);
    });

    it("should have a export method", () => {
        const card = new Card();
        expect(card.export).toBeDefined();
        const svg = card.export();
        expect(svg).toBeDefined();

        const svg2 = new Card()
            .theme("dark")
            .size(123, 456)
            .text("Hello World")
            .rect("ac2", { x: 0, y: 0, r: 0, width: 123, height: 456 })
            .circle()
            .line()
            .raw("")
            .export();
        expect(svg2).toBeDefined();
    });
});
