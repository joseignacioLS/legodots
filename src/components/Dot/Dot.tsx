import { useEffect, useRef, useState } from "react";
import styles from "./Dot.module.scss";
import { IDot } from "../Board/Board";

interface IProps {
  id: number;
  x: number;
  y: number;
  rotation: number;
  board: number[];
  size: number;
  type: string;
  handleModifyDot: (options: Partial<IDot>) => void;
  setSelectedKey: (id: number | undefined) => void;
  selected: boolean;
  color: string;
  forceDrag: boolean;
}

const Dot = ({
  id,
  x,
  y,
  rotation,
  type,
  size,
  handleModifyDot,
  board,
  setSelectedKey,
  selected,
  color,
}: IProps) => {
  const [startDrag, setStartDrag] = useState<number[] | undefined>(undefined);
  const [hardSelected, setHardSelected] = useState(false);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setHardSelected(true);
      }}
      className={`${styles.dot}
         ${startDrag ? styles.dragging : ""}
        `}
      style={{
        width: `${(["curve"].includes(type) ? 2 : 1) * size}px`,
        height: `${(["curve"].includes(type) ? 2 : 1) * size}px`,
        left: `${size * (board[0] + x)}px`,
        top: `${size * (board[1] + y)}px`,
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
        handleModifyDot({ x: x + deltaX, y: y + deltaY });
      }}
      onMouseEnter={() => setSelectedKey(id)}
      onMouseLeave={() => {
        setSelectedKey(undefined);
        setHardSelected(false);
      }}
      draggable
    >
      <div
        className={`${styles.shape}
        ${type === "dot" ? styles.square : ""}
        ${type === "corner" ? styles.corner : ""} 
        ${type === "u" ? styles.u : ""} 
        ${type === "circle" ? styles.circle : ""} 
        ${type === "curve" ? styles.curve : ""} 
        ${selected ? styles.selected : ""}
        ${rotation === 90 ? styles.rot90 : ""} 
        ${rotation === 180 ? styles.rot180 : ""} 
        ${rotation === 270 ? styles.rot270 : ""}
       
        `}
        style={{
          borderWidth: `${size / 50}px`,
          backgroundColor: color,
        }}
      ></div>
      {hardSelected && (
        <div className={styles.contextualMenu}>
          <input
            type="color"
            value={color}
            onChange={(e) => {
              handleModifyDot({ color: e.currentTarget.value });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dot;
