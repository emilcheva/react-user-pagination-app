import { useReducer, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Action, pageColorReducer, State } from "./usePageColorReducer";

export const CURRENT_PAGE = "currentPage";
export const PAGES_COLORS = "pagesColors";

const INITIAL_STATE = {
  currentPage: 1,
  colors: {},
};

const usePersistedPageColorReducer = () => {
  const [savedPage, savePage] = useLocalStorage(CURRENT_PAGE, INITIAL_STATE.currentPage);
  const [savedColors, saveColors] = useLocalStorage(PAGES_COLORS, INITIAL_STATE.colors);

  const persistedReducer = useCallback(
    (state: State, action: Action) => {
      const newState = pageColorReducer(state, action);
      savePage(newState.currentPage);
      saveColors(newState.colors);
      return newState;
    },
    [savePage, saveColors],
  );

  const [state, dispatch] = useReducer(persistedReducer, {
    currentPage: savedPage,
    colors: savedColors,
  });

  return [state, dispatch];
};

export default usePersistedPageColorReducer;
