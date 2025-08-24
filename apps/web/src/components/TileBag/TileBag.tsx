"use client";
import styles from "./TileBag.module.css";
import Tile from "../Tile/Tile";
import { useGame } from "@/contexts/GameContext";

export default function TileBag() {
  const { drawRandomTile, resetBag, state, findTileByCoordinate, placeTile } =
    useGame();

  return (
    <div className={styles.tileBagContainer}>
      <div className={styles.tileBagActions}>
        <button onClick={() => drawRandomTile()}>
          Draw ({state.tilesInBag.length} left)
        </button>
        <button onClick={() => resetBag()}>Reset</button>
      </div>
      <div className={styles.drawnTilesContainer}>
        {state.drawnTiles.map((tileCoordinate, index) => (
          <Tile
            key={`${tileCoordinate}-${index}`}
            tile={findTileByCoordinate(tileCoordinate)}
            isSelected={false}
            onClick={() => {
              placeTile(tileCoordinate);
            }}
          />
        ))}
      </div>
    </div>
  );
}
