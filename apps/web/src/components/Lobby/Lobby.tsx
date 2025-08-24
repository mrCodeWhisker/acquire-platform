"use client";
import { Board } from "@/components/Board";
import { Inventory } from "@/components/Inventory";
import { TileBag } from "@/components/TileBag";
import { GameProvider } from "@/contexts/GameContext";
import styles from "./Lobby.module.css";

export default function Lobby() {
  return (
    <GameProvider>
      <div>
        <Board />
        <div className={styles.userInterface}>
          <TileBag />
          <Inventory />
        </div>
      </div>
    </GameProvider>
  );
}
