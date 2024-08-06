"use client";

import { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import Dot from "../Dot/Dot";
import DotOptions from "../DotOptions/DotOptions";
import SVGPaths from "../SVGPaths/SVGPaths";
import { referenceDots } from "@/constants/referenceDots";
import { IDot } from "@/constants/dots";
import { checkCollision } from "@/utils/Space";

const Board = () => {
  const [selectedDot, setSelectedDot] = useState<number | undefined>(undefined);
  const [hardSelectedDot, setHardSelectedDot] = useState<number | undefined>(
    undefined
  );
  const [unitSize, setUnitSize] = useState(80);
  const [pieces, setPieces] = useState<IDot[]>(referenceDots);
  const [copy, setCopy] = useState(false);

  const [boardDrag, setBoardDrag] = useState([0, 0]);

  const [dragging, setDragging] = useState(false);

  const handleModifyDot = (
    options: Partial<IDot> & { copy?: boolean },
    id?: number
  ) => {
    const selectedDotId = id ?? selectedDot;
    if (copy || options.copy) {
      setPieces((oldState) => {
        const newState = structuredClone(oldState);
        const piece = newState.find((p) => p.id === selectedDotId);
        if (!piece) return oldState;
        const newPiece = structuredClone(piece);
        newPiece.id = Math.max(...newState.map((p) => p.id)) + 1;
        Object.entries(options).forEach(([key, value]) => {
          newPiece[key as keyof IDot] = value as never;
        });
        newPiece.fixed = false;
        if (checkCollision(newPiece, newState)) return oldState;
        return [...newState, newPiece];
      });
    } else {
      setPieces((oldState) => {
        const newState = structuredClone(oldState);
        const piece = newState.find((p) => p.id === selectedDotId);
        if (!piece) return oldState;
        Object.entries(options).forEach(([key, value]) => {
          piece[key as keyof IDot] = value as never;
        });
        if (checkCollision(piece, newState)) return oldState;
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

      return newState.filter((p) => p.id !== id || p.fixed);
    });
    setSelectedDot(undefined);
    setHardSelectedDot(undefined);
  };

  useEffect(() => {
    const listenerDown = (e: any) => {
      if (selectedDot === undefined) return;
      if (e.key === "r") {
        setPieces((oldState) => {
          const newState = structuredClone(oldState);
          const piece = newState.find((p) => p.id === selectedDot);
          if (!piece || piece.fixed) return oldState;

          piece.rotation = (piece.rotation + 90) % 360;

          return newState;
        });
      }
      if (e.key === "d") {
        setCopy(true);
      }
      if (e.key === "x") {
        deleteDot(selectedDot);
      }
    };
    const listenerUp = (e: any) => {
      if (selectedDot === undefined) return;

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
  }, [selectedDot]);

  return (
    <div
      className={styles.board}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        e.stopPropagation();
        setHardSelectedDot(undefined);
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
      style={{
        backgroundSize: `${unitSize}px ${unitSize}px`,
        backgroundPosition: `${boardDrag[0] * unitSize}px ${
          boardDrag[1] * unitSize
        }px`,
      }}
    >
      {pieces.map((piece) => {
        return (
          <Dot
            key={piece.id}
            id={piece.id}
            board={boardDrag}
            position={piece.position}
            size={unitSize}
            type={piece.type}
            rotation={piece.rotation}
            handleModifyDot={handleModifyDot}
            setSelectedDot={setSelectedDot}
            setHardSelectedDot={setHardSelectedDot}
            selected={piece.id === selectedDot}
            hardSelected={piece.id === hardSelectedDot}
            color={piece.color}
            fixed={piece.fixed}
            pieceSize={piece.size}
          />
        );
      })}

      <DotOptions
        selectedDot={pieces.find((p) => p.id === hardSelectedDot)}
        handleModifyDot={handleModifyDot}
        handleDeleteDot={deleteDot}
      />
      <SVGPaths size={unitSize} />
    </div>
  );
};

export default Board;
