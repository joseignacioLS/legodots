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

const Square = ({
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
      className={`${styles.shape}   ${styles.square}`}
      style={{
        backgroundColor: color,
        width: `${pieceSize.x * (fixed ? fixedDotSize : size) - 2 * margin}px`,
        height: `${pieceSize.y * (fixed ? fixedDotSize : size) - 2 * margin}px`,
        borderRadius: `${size / 50}px`,
      }}
    ></div>
  );
};

export default Square;
