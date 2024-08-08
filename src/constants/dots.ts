import { Vector2 } from "@/utils/Space";

export interface IDot {
  id: number;
  type:
    | "square"
    | "corner"
    | "u"
    | "circle"
    | "curve"
    | "big-curve"
    | "dot2x1"
    | "dot3x1"
    | "dot4x1";
  position: Vector2;
  size: Vector2;
  rotation: number;
  color: string;
  fixed?: boolean;
}
