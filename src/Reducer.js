export default function(state, action) {
  switch (action.type) {
    case "addSymbol": {
      return {
        ...state,
        symbols: [...state.symbols, action.payload]
      };
    }
    case "removeSymbol": {
      return {
        ...state,
        symbols: state.symbols.map(symbol => symbol.id !== action.payload)
      };
    }
    default: {
      return state;
    }
  }
}
