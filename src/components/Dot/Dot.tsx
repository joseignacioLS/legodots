import { useState } from "react";
import styles from "./Dot.module.scss";
import { Vector2 } from "@/utils/Space";
import { IDot } from "@/constants/dots";
import Square from "./Pieces/Square";
import Corner from "./Pieces/Corner";
import U from "./Pieces/U";
import Circle from "./Pieces/Circle";
import Curve from "./Pieces/Curve";
import BigCurve from "./Pieces/BigCurve";
import Rect2x1 from "./Pieces/Rect2x1";
import Rect3x1 from "./Pieces/Rect3x1";
import Rect4x1 from "./Pieces/Rect4x1";

interface IProps {
  id: number;
  position: Vector2;
  rotation: number;
  board: number[];
  size: number;
  type: string;
  handleModifyDot: (options: Partial<IDot> & { copy?: boolean }) => void;
  setSelectedDot: (id: number | undefined) => void;
  setHardSelectedDot: (id: number | undefined) => void;
  selected: boolean;
  hardSelected: boolean;
  color: string;
  fixed?: boolean;
  pieceSize: Vector2;
}

const fixedDotSize = 25;

const Dot = ({
  id,
  position,
  rotation,
  type,
  size,
  handleModifyDot,
  board,
  setSelectedDot,
  setHardSelectedDot,
  selected,
  hardSelected,
  color,
  pieceSize,
  fixed = false,
}: IProps) => {
  const [startDrag, setStartDrag] = useState<number[] | undefined>(undefined);

  const x = fixed
    ? position.x * fixedDotSize + 5
    : size * (board[0] + position.x);
  const y = fixed
    ? position.y * fixedDotSize + 5
    : size * (board[1] + position.y);

  const margin = size / 50;
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setHardSelectedDot(id);
      }}
      className={`${styles.dot}
         ${startDrag ? styles.dragging : ""}
        ${selected ? styles.selected : ""}
        ${hardSelected ? styles.hardSelected : ""}
        `}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onDragStart={(e) => {
        setStartDrag([e.clientX, e.clientY]);
      }}
      onDrag={(e) => {}}
      onDragEnd={(e) => {
        if (!startDrag) return;
        const rawDeltaX = e.clientX - startDrag[0];
        const rawDeltaY = e.clientY - startDrag[1];
        const deltaX = Math.round(rawDeltaX / size);
        const deltaY = Math.round(rawDeltaY / size);
        setStartDrag(undefined);
        if (fixed) {
          handleModifyDot({
            position: new Vector2(
              -Math.round(board[0]) + deltaX + position.x,
              -Math.round(board[1]) + deltaY + position.y
            ),
            copy: fixed,
          });
        } else {
          handleModifyDot({
            position: new Vector2(deltaX + position.x, deltaY + position.y),
          });
        }
      }}
      onMouseEnter={() => setSelectedDot(id)}
      onMouseLeave={() => {
        setSelectedDot(undefined);
      }}
      draggable
    >
      {type === "square" && (
        <Square
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}
      {type === "corner" && (
        <Corner
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "u" && (
        <U
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "circle" && (
        <Circle
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "curve" && (
        <Curve
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "big-curve" && (
        <BigCurve
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "dot2x1" && (
        <Rect2x1
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "dot3x1" && (
        <Rect3x1
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}

      {type === "dot4x1" && (
        <Rect4x1
          color={color}
          pieceSize={pieceSize}
          fixed={fixed}
          fixedDotSize={fixedDotSize}
          size={size}
          margin={margin}
          rotation={rotation}
        />
      )}
      {/* <div
        className={`${styles.shape}
      ${type === "dot" ? styles.square : ""}
      ${type === "dot2x1" ? styles.square2x1 : ""}
      ${type === "dot3x1" ? styles.square3x1 : ""}
      ${type === "dot4x1" ? styles.square4x1 : ""}
      ${type === "corner" ? styles.corner : ""}
      ${type === "u" ? styles.u : ""}
      ${type === "circle" ? styles.circle : ""}
      ${type === "curve" ? styles.curve : ""}
      ${type === "big-curve" ? styles.bigCurve : ""}
      ${rotation === 90 ? styles.rot90 : ""}
      ${rotation === 180 ? styles.rot180 : ""}
      ${rotation === 270 ? styles.rot270 : ""}
      `}
        style={{
          backgroundColor: color,
          width: `${
            pieceSize.x * (fixed ? fixedDotSize : size) - 2 * margin
          }px`,
          height: `${
            pieceSize.y * (fixed ? fixedDotSize : size) - 2 * margin
          }px`,
        }}
      ></div> */}
    </div>
  );
};

export default Dot;
