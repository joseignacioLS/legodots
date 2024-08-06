import { IDot } from "@/constants/dots";

export class Vector2 {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(dX: number, dY: number) {
    this.x += dX;
    this.y += dY;
  }

  multiply(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
  }
}

export const checkCollision = (dot: IDot, pieces: IDot[]) => {
  return pieces
    .filter((p) => !p.fixed)
    .some((referencePiece) => {
      return (
        referencePiece.id !== dot.id &&
        referencePiece.type === dot.type &&
        referencePiece.position.x === dot.position.x &&
        referencePiece.position.y === dot.position.y &&
        referencePiece.rotation === dot.rotation
      );
    });
};
