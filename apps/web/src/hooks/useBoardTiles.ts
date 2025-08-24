"use client";

import { ITile } from "@/components/Tile";
import { getCharacterByIndex } from "@/utils/stringHelpers";
import { useMemo } from "react";

const getRowLabels = (rowLength: number) =>
  Array.from({ length: rowLength }, (_, index) => getCharacterByIndex(index));
const getCoordinateText = (colIndex: number, rowLabel: string) =>
  `${colIndex + 1}${rowLabel}`;

function useBoardTiles(rows: number, cols: number) {
  return useMemo(() => {
    const rowLabels = getRowLabels(rows);
    const tiles: ITile[] = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const coordinate = getCoordinateText(colIndex, rowLabels[rowIndex]);
        tiles.push({
          row: rowIndex,
          col: colIndex,
          coordinate,
        });
      }
    }

    return tiles;
  }, []);
}

export { useBoardTiles };
