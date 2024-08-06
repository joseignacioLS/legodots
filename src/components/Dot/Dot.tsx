import { useState } from "react";
import styles from "./Dot.module.scss";
import { Vector2 } from "@/utils/Space";
import { IDot } from "@/constants/dots";

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
        width: `${pieceSize.x * size}px`,
        height: `${pieceSize.y * size}px`,
        left: `${fixed ? position.x * size : size * (board[0] + position.x)}px`,
        top: `${fixed ? position.y * size : size * (board[1] + position.y)}px`,
        padding: `${size / 50}px`,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onDragStart={(e) => {
        e.stopPropagation();
        setStartDrag([e.clientX, e.clientY]);
      }}
      onDrag={(e) => {
        e.stopPropagation();
      }}
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
      <div
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
        }}
      ></div>
    </div>
  );
};

export default Dot;
