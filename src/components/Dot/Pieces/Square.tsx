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
  const width =
    pieceSize.x * (fixed ? fixedDotSize : size) - 2 * (fixed ? 1 : margin);
  const height =
    pieceSize.y * (fixed ? fixedDotSize : size) - 2 * (fixed ? 1 : margin);
  return (
    <div
      className={`${styles.shape}   ${styles.square}`}
      style={{
        marginTop: `${margin}px`,
        marginLeft: `${margin}px`,
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${size / 50}px`,
      }}
    ></div>
  );
};

export default Square;
