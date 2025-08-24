"use client";
import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import { Tile } from "../Tile";
import type { ITile } from "../Tile";
import { useBoardTiles } from "@/hooks/useBoardTiles";
import { useGame } from "@/contexts/GameContext";

export const ROWS = 9;
export const COLS = 12;

export default function Board() {
  const { state, placeTile } = useGame();

  const handleTileClick = (coordinate: string) => {
    placeTile(coordinate);
  };

  return (
    <div className={`${styles.boardContainer}`}>
      <div className={`${styles.tileGrid}`}>
        {state.tiles.map((tile: ITile) => (
          <Tile
            key={tile.coordinate}
            tile={tile}
            isSelected={tile.placed === true}
            onClick={() => handleTileClick(tile.coordinate)}
          />
        ))}
      </div>
    </div>
  );
}
