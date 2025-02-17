import { Roboto, Cookie } from "next/font/google";

export const roboto = Roboto({
    weight: ["400", "500", "700"], // all weights
    subsets: ["latin"],
    variable: "--font-roboto",
});

export const cookie = Cookie({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-cookie",
});
