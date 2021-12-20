import * as themes from "./themes";

const fallback = themes.light;
const fallback_dark = fallback.dark as themes.Colors;

/**
 * Merge theme with fallback
 * @param select
 * @returns
 */
function merge(select: themes.ThemeName): themes.Theme {
    const selected = themes[select];

    const colors: themes.Colors = {
        tx1: selected.tx1 || fallback.tx1,
        tx2: selected.tx2 || fallback.tx2,
        tx3: selected.tx3 || fallback.tx3,
        bg1: selected.bg1 || fallback.bg1,
        bg2: selected.bg2 || fallback.bg2,
        bg3: selected.bg3 || fallback.bg3,
        ac1: selected.ac1 || fallback.ac1,
        ac2: selected.ac2 || fallback.ac2,
        ac3: selected.ac3 || fallback.ac3,
        ac4: selected.ac4 || fallback.ac4,
        ac5: selected.ac5 || fallback.ac5,
        ac6: selected.ac6 || fallback.ac6,
    };

    const dark_colors: themes.Colors =
        selected.dark === "same"
            ? colors
            : {
                  tx1: selected.dark?.tx1 || fallback_dark.tx1,
                  tx2: selected.dark?.tx2 || fallback_dark.tx2,
                  tx3: selected.dark?.tx3 || fallback_dark.tx3,
                  bg1: selected.dark?.bg1 || fallback_dark.bg1,
                  bg2: selected.dark?.bg2 || fallback_dark.bg2,
                  bg3: selected.dark?.bg3 || fallback_dark.bg3,
                  ac1: selected.dark?.ac1 || fallback_dark.ac1,
                  ac2: selected.dark?.ac2 || fallback_dark.ac2,
                  ac3: selected.dark?.ac3 || fallback_dark.ac3,
                  ac4: selected.dark?.ac4 || fallback_dark.ac4,
                  ac5: selected.dark?.ac5 || fallback_dark.ac5,
                  ac6: selected.dark?.ac6 || fallback_dark.ac6,
              };

    const result: themes.Theme = { ...colors, dark: dark_colors };

    return result;
}

function generate_css(select: themes.ThemeName): string {
    const theme = merge(select);
    const dark = theme.dark as themes.Colors;

    const css = [
        `.clr-tx1 { color: ${theme.tx1}; }`,
        `.clr-tx2 { color: ${theme.tx2}; }`,
        `.clr-tx3 { color: ${theme.tx3}; }`,
        `.clr-bg1 { color: ${theme.bg1}; }`,
        `.clr-bg2 { color: ${theme.bg2}; }`,
        `.clr-bg3 { color: ${theme.bg3}; }`,
        `.clr-ac1 { color: ${theme.ac1}; }`,
        `.clr-ac2 { color: ${theme.ac2}; }`,
        `.clr-ac3 { color: ${theme.ac3}; }`,
        `.clr-ac4 { color: ${theme.ac4}; }`,
        `.clr-ac5 { color: ${theme.ac5}; }`,
        `.clr-ac6 { color: ${theme.ac6}; }`,
        `@media (prefers-color-scheme: dark) { ${[
            `.clr-tx1 { color: ${dark.tx1}; }`,
            `.clr-tx2 { color: ${dark.tx2}; }`,
            `.clr-tx3 { color: ${dark.tx3}; }`,
            `.clr-bg1 { color: ${dark.bg1}; }`,
            `.clr-bg2 { color: ${dark.bg2}; }`,
            `.clr-bg3 { color: ${dark.bg3}; }`,
            `.clr-ac1 { color: ${dark.ac1}; }`,
            `.clr-ac2 { color: ${dark.ac2}; }`,
            `.clr-ac3 { color: ${dark.ac3}; }`,
            `.clr-ac4 { color: ${dark.ac4}; }`,
            `.clr-ac5 { color: ${dark.ac5}; }`,
            `.clr-ac6 { color: ${dark.ac6}; }`,
        ].join("")} }`,
        "text, rect, circle { fill: currentColor; transition: fill .3s ease; }",
        "line { stroke: currentColor; transition: stroke .3s ease; }",
    ].join("");

    return css;
}

export { merge, generate_css };
