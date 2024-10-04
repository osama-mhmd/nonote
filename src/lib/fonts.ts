import { Inter, Merienda } from "next/font/google";

const interFont = Inter({ subsets: ["latin"] });
const meriendaFont = Merienda({ subsets: ["latin"] });

export const merienda = meriendaFont.className;
export const inter = interFont.className;
