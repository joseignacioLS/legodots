"use client";

import { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import Dot from "../Dot/Dot";

export interface IDot {
  id: number;
  type: "dot" | "corner" | "u" | "circle" | "curve";
  x: number;
  y: number;
  rotation: number;
  color: string;
  forceDrag?: boolean;
}

const initialState: IDot[] = [
  {
    id: 0,
    type: "dot",
    x: 3,
    y: 3,
    rotation: 0,
    color: "#FF0000",
  },
  {
    id: 1,
    type: "corner",
    x: 4,
    y: 3,
    rotation: 0,
    color: "#FF0000",
  },
  {
    id: 2,
    type: "u",
    x: 5,
    y: 3,
    rotation: 0,
    color: "#FF0000",
  },
  {
    id: 3,
    type: "circle",
    x: 6,
    y: 3,
    rotation: 0,
    color: "#FF0000",
  },
  {
    id: 4,
    type: "curve",
    x: 7,
    y: 3,
    rotation: 0,
    color: "#FF0000",
  },
];

const Board = () => {
  const [selectedKey, setSelectedKey] = useState<number | undefined>(undefined);
  const [unitSize, setUnitSize] = useState(100);
  const [pieces, setPieces] = useState<IDot[]>(initialState);
  const [copy, setCopy] = useState(false);

  const [boardDrag, setBoardDrag] = useState([0, 0]);

  const [dragging, setDragging] = useState(false);

  const handleModifyDot = (options: Partial<IDot>) => {
    if (copy) {
      setPieces((oldState) => {
        const newState = structuredClone(oldState);
        const piece = newState.find((p) => p.id === selectedKey);
        if (!piece) return oldState;
        const newPiece = structuredClone(piece);
        newPiece.id = Math.max(...newState.map((p) => p.id)) + 1;
        Object.entries(options).forEach(([key, value]) => {
          newPiece[key as keyof IDot] = value as never;
        });
        return [...newState, newPiece];
      });
    } else {
      setPieces((oldState) => {
        const newState = structuredClone(oldState);
        const piece = newState.find((p) => p.id === selectedKey);
        if (!piece) return oldState;
        Object.entries(options).forEach(([key, value]) => {
          piece[key as keyof IDot] = value as never;
        });
        return newState;
      });
    }
  };

  const handleDrag = (event: React.MouseEvent) => {
    // scroll section horizontally on drag
    if (dragging) {
      const diffX = event.movementX;
      const diffY = event.movementY;
      setBoardDrag((oldState) => {
        return [
          oldState[0] + (diffX * 1) / unitSize,
          oldState[1] + (diffY * 1) / unitSize,
        ];
      });
    }
  };

  const deleteDot = (id: number) => {
    setPieces((oldState) => {
      const newState = structuredClone(oldState);

      return newState.filter((p) => p.id !== id);
    });
  };

  useEffect(() => {
    const listenerDown = (e: any) => {
      if (selectedKey === undefined) return;
      if (e.key === "r") {
        setPieces((oldState) => {
          const newState = structuredClone(oldState);
          const piece = newState.find((p) => p.id === selectedKey);
          if (!piece) return oldState;

          piece.rotation = (piece.rotation + 90) % 360;

          return newState;
        });
      }
      if (e.key === "d") {
        setCopy(true);
      }
      if (e.key === "x") {
        deleteDot(selectedKey);
      }
    };
    const listenerUp = (e: any) => {
      if (selectedKey === undefined) return;

      if (e.key === "d") {
        setCopy(false);
      }
    };
    document.addEventListener("keydown", listenerDown);
    document.addEventListener("keyup", listenerUp);
    return () => {
      document.removeEventListener("keydown", listenerDown);
      document.removeEventListener("keyup", listenerUp);
    };
  }, [selectedKey]);

  return (
    <div
      className={styles.board}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        e.stopPropagation();
        setDragging(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setDragging(false);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setDragging(false);
      }}
      onMouseMove={handleDrag}
      onWheel={(e) => {
        if (e.deltaY < 0) {
          setUnitSize((oldState) => oldState + 1);
        } else {
          setUnitSize((oldState) => oldState - 1);
        }
      }}
    >
      {pieces.map((piece) => {
        return (
          <Dot
            key={piece.id}
            id={piece.id}
            board={boardDrag}
            x={piece.x}
            y={piece.y}
            size={unitSize}
            type={piece.type}
            rotation={piece.rotation}
            handleModifyDot={handleModifyDot}
            setSelectedKey={setSelectedKey}
            selected={piece.id === selectedKey}
            color={piece.color}
            forceDrag={!!piece.forceDrag}
          />
        );
      })}
      <svg width="0" height="0">
        <defs>
          <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
            <path
              d="M 0,1
              C 0 .45, .45 0, 1 0
              L 1,.49
              C .7 .5, .5 .7, .49 1
              L 0,1
              Z"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Board;
