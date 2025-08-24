"use client";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { ITile } from "@/components/Tile";
import { COLS, ROWS } from "@/components/Board/Board";
import { useBoardTiles } from "@/hooks/useBoardTiles";

interface GameState {
  tiles: ITile[];
  tilesInBag: string[];
  drawnTiles: string[];
  lastDrawnTile: string | null;
  isInitialized: boolean;
}

type GameAction =
  | { type: "INITIALIZE_TILES"; tiles: ITile[] }
  | { type: "DRAW_TILE"; coordinate: string }
  | { type: "RESET_BAG" }
  | { type: "REMOVE_TILES_FROM_BAG"; coordinates: string[] }
  | { type: "PLACE_TILE"; coordinate: string };

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "INITIALIZE_TILES":
      const coordinates = action.tiles.map((tile) => tile.coordinate);
      return {
        ...state,
        tiles: action.tiles,
        tilesInBag: coordinates,
        isInitialized: true,
      };

    case "DRAW_TILE":
      if (!state.tilesInBag.includes(action.coordinate)) {
        return state;
      }

      if (state.drawnTiles.length >= 6) {
        return state;
      }

      return {
        ...state,
        tilesInBag: state.tilesInBag.filter(
          (coord) => coord !== action.coordinate
        ),
        drawnTiles: [...state.drawnTiles, action.coordinate],
        lastDrawnTile: action.coordinate,
      };

    case "RESET_BAG":
      return {
        ...state,
        tiles: state.tiles.map((tile: ITile) => {
          return { ...tile, placed: false };
        }),
        tilesInBag: state.tiles.map((tile) => tile.coordinate),
        drawnTiles: [],
        lastDrawnTile: null,
      };

    case "REMOVE_TILES_FROM_BAG":
      return {
        ...state,
        tilesInBag: state.tilesInBag.filter(
          (coord) => !action.coordinates.includes(coord)
        ),
      };

    case "PLACE_TILE":
      if (!state.drawnTiles.includes(action.coordinate)) return state;

      return {
        ...state,
        tiles: state.tiles.map((tile) => {
          return tile.coordinate === action.coordinate
            ? { ...tile, placed: true }
            : tile;
        }),
      };

    default:
      return state;
  }
};

export const initialState: GameState = {
  tiles: [],
  tilesInBag: [],
  drawnTiles: [],
  lastDrawnTile: null,
  isInitialized: false,
};

export interface GameContextType {
  state: GameState;
  drawRandomTile: () => string | null;
  resetBag: () => void;
  removeTilesFromBag: (coordinates: string[]) => void;
  findTileByCoordinate: (coordinate: string) => ITile;
  placeTile: (coordinate: string) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const tiles = useBoardTiles(ROWS, COLS);

  useEffect(() => {
    if (tiles.length > 0 && !state.isInitialized) {
      dispatch({ type: "INITIALIZE_TILES", tiles });
    }
  }, [tiles.length, state.isInitialized]);

  const drawRandomTile = () => {
    if (state.tilesInBag.length === 0) {
      alert("No tiles left in the bag!");
      return null;
    }

    const randomIndex = Math.floor(Math.random() * state.tilesInBag.length);
    const drawnTile = state.tilesInBag[randomIndex];
    dispatch({ type: "DRAW_TILE", coordinate: drawnTile });
    return drawnTile;
  };

  const resetBag = () => {
    dispatch({ type: "RESET_BAG" });
  };

  const removeTilesFromBag = (coordinates: string[]) => {
    dispatch({ type: "REMOVE_TILES_FROM_BAG", coordinates });
  };

  const placeTile = (coordinate: string) => {
    dispatch({ type: "PLACE_TILE", coordinate });
  };

  const findTileByCoordinate = (coordinate: string): ITile => {
    return (
      state.tiles.find((tile) => tile.coordinate === coordinate) ?? {
        row: 0,
        col: 0,
        coordinate: "1A",
      }
    );
  };

  return (
    <GameContext.Provider
      value={{
        state,
        drawRandomTile,
        placeTile,
        resetBag,
        removeTilesFromBag,
        findTileByCoordinate,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
