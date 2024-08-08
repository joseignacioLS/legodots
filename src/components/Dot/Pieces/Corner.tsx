import styles from "../Dot.module.scss";

interface IProps {
  color: string;
  pieceSize: { x: number; y: number };
  fixed: boolean;
  fixedDotSize: number;
  size: number;
  margin: number;
  rotation: number;
}

const Corner = ({
  color,
  pieceSize,
  fixed,
  fixedDotSize,
  size,
  margin,
  rotation,
}: IProps) => {
  return (
    <div
      className={`${styles.shape}
      ${rotation === 90 ? styles.rot90 : ""}
      ${rotation === 180 ? styles.rot180 : ""}
      ${rotation === 270 ? styles.rot270 : ""}`}
      style={{
        backgroundColor: color,
        width: `${pieceSize.x * (fixed ? fixedDotSize : size) - 2 * margin}px`,
        height: `${pieceSize.y * (fixed ? fixedDotSize : size) - 2 * margin}px`,
        borderRadius: `100% ${size / 50}px ${size / 50}px ${size / 50}px`,
      }}
    ></div>
  );
};

export default Corner;
