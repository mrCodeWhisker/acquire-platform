import { COLS, ROWS } from "@/components/Board/Board";
import { ITile } from "@/components/Tile";
import { useEffect, useState } from "react";
import { useBoardTiles } from "./useBoardTiles";

export default function useTileBag() {
  const [tileBag, setTileBag] = useState<ITile[]>([]);

  const tiles = useBoardTiles(ROWS, COLS);

  const [tilesInBag, setTilesInBag] = useState<string[]>([]);
  const [drawnTiles, setDrawnTiles] = useState<string[]>([]);
  const [lastDrawnTile, setLastDrawnTile] = useState<string | null>(null);

  useEffect(() => {
    const coordinates = tiles.map((tile: ITile) => tile.coordinate);
    setTilesInBag(coordinates);
  }, []);

  const drawRandomTile = () => {
    if (tilesInBag.length === 0) {
      alert("No tiles left in the bag!");
      return null;
    }

    const randomIndex = Math.floor(Math.random() * tilesInBag.length);
    const drawnTile = tilesInBag[randomIndex];

    const newTilesInBag = tilesInBag.filter(
      (_, index) => index !== randomIndex
    );
    setTilesInBag(newTilesInBag);
    setLastDrawnTile(drawnTile);
    setDrawnTiles((prev) => [...prev, drawnTile]);

    return drawnTile;
  };

  const findTileByCoordinate = (coordinate: string) => {
    return (
      tiles.find((x) => x.coordinate === coordinate) ?? {
        row: 0,
        col: 0,
        coordinate: "1A",
      }
    );
  };

  const resetBag = () => {
    const coordinates = tiles.map((tile) => tile.coordinate);
    setTilesInBag(coordinates);
    setDrawnTiles([]);
    setLastDrawnTile(null);
  };

  const removeTilesFromBag = (tilesToRemove: string[]) => {
    setTilesInBag((prev) =>
      prev.filter((tile) => !tilesToRemove.includes(tile))
    );
  };

  return {
    tileBag,
    setTileBag,
    resetBag,
    removeTilesFromBag,
    findTileByCoordinate,
    drawRandomTile,
    drawnTiles,
    lastDrawnTile,
  };
}
