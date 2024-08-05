import { IDot } from "../Board/Board";
import styles from "./DotOptions.module.scss";

interface IProps {
  selectedDot?: IDot;
  handleModifyDot: (options: Partial<IDot>, id?: number) => void;
  handleDeleteDot(id: number): void;
}

const DotOptions = ({
  selectedDot,
  handleModifyDot,
  handleDeleteDot,
}: IProps) => {
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
      {!selectedDot.fixed && (
        <button
          onClick={() => {
            handleDeleteDot(selectedDot.id);
          }}
        >
          🗑
        </button>
      )}
    </div>
  );
};

export default DotOptions;
