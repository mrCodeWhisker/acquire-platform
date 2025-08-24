"use client";
import { Tile } from "../Tile";
import styles from "./Inventory.module.css";

export default function Inventory() {
  return (
    <div className={styles.inventory}>
      <div>Money: $1,000</div>
    </div>
  );
}
