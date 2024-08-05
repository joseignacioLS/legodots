import { IDot } from "../Board/Board";
import styles from "./DotOptions.module.scss";

interface IProps {
  selectedDot?: IDot;
  handleModifyDot: (options: Partial<IDot>, id?: number) => void;
}

const DotOptions = ({ selectedDot, handleModifyDot }: IProps) => {
  if (!selectedDot) return <></>;
  return (
    <div
      className={styles.dotOptions}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <input
        type="color"
        value={selectedDot.color}
        onChange={(e) => {
          handleModifyDot({ color: e.target.value }, selectedDot.id);
        }}
      />
    </div>
  );
};

export default DotOptions;
