import { StaticImageData } from "next/image";

export interface Portfolio {
  id: number;
  title: string;
  tools: string[];
  image: string | StaticImageData;
}
