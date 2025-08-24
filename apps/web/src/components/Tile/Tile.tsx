export interface ITile {
  row: number;
  col: number;
  coordinate: string;
  placed?: boolean;
}

export interface TileProps {
  tile: ITile;
  isSelected: boolean;
  onClick: () => void;
}
import styles from "./Tile.module.css";

export default function Tile({ tile, isSelected, onClick }: TileProps) {
  return (
    <div
      className={`${styles.tile} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {tile.coordinate}
    </div>
  );
}
