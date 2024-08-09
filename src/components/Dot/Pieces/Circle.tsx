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

const Circle = ({
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
      className={`${styles.shape}
      ${rotation === 90 ? styles.rot90 : ""}
      ${rotation === 180 ? styles.rot180 : ""}
      ${rotation === 270 ? styles.rot270 : ""}`}
      style={{
        marginTop: `${margin}px`,
        marginLeft: `${margin}px`,
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `100%`,
      }}
    ></div>
  );
};

export default Circle;
