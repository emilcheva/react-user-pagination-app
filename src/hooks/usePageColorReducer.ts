export type State = {
  currentPage: number;
  colors: Record<number, string>;
};

export type Action = { type: "SET_PAGE"; currentPage: number } | { type: "SET_COLOR"; color: string };

export function pageColorReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PAGE": {
      const { currentPage } = action;
      return {
        ...state,
        currentPage,
      };
    }
    case "SET_COLOR": {
      const { currentPage } = state;
      const { color } = action;
      return {
        ...state,
        colors: {
          ...state.colors,
          [currentPage]: color,
        },
      };
    }
    default:
      return state;
  }
}
