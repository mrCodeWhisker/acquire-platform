import styles from "./Board.module.css";
const ROWS = 9;
const COLS = 12;

export default function Board() {
  const renderTile = (row: number, col: number) => {
    return (
      <div>
        {col}
        {row}
      </div>
    );
  };

  const renderBoard = () => {
    const cols = Array.from({ length: COLS }, (_, index) => index);
    const rows = Array.from({ length: ROWS }, (_, index) =>
      String.fromCharCode("A".charCodeAt(0) + index)
    );
    const length = ROWS * COLS;
    let rowCount = 0;
    let colCount = 0;
    const board: Record<
      string,
      { row: number; col: number; coordinate: string }
    > = {};

    for (let i = 0; i < length; i++) {
      if (colCount === COLS) {
        colCount = 0;
        rowCount++;
      }

      const row = rows[rowCount];
      const col = cols[colCount];
      const coordinate = `${col + 1}${row}`;
      board[coordinate] = { row: rowCount, col: colCount, coordinate };

      colCount++;
    }

    return (
      <div className={`${styles.tileGrid}`}>
        {Object.keys(board).map((tile) => {
          return (
            <div key={tile} className={`${styles.tile}`}>
              {tile}
            </div>
          );
        })}
      </div>
    );
  };

  return <div className={`${styles.boardContainer}`}>{renderBoard()}</div>;
}
