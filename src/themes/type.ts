export type ThemeColor = "tx1" | "tx2" | "tx3" | "bg1" | "bg2" | "bg3" | "ac1" | "ac2" | "ac3" | "ac4" | "ac5" | "ac6";

export interface Colors {
    tx1: string;
    tx2: string;
    tx3: string;
    bg1: string;
    bg2: string;
    bg3: string;
    ac1: string;
    ac2: string;
    ac3: string;
    ac4: string;
    ac5: string;
    ac6: string;
}

export interface Theme extends Colors {
    tx1: string;
    tx2: string;
    tx3: string;
    bg1: string;
    bg2: string;
    bg3: string;
    ac1: string;
    ac2: string;
    ac3: string;
    ac4: string;
    ac5: string;
    ac6: string;
    dark?: Colors | "same";
}
