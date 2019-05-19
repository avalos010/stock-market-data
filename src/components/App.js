import React, { useEffect, useState, createContext, useReducer } from "react";
import GridLayout from "react-grid-layout";
import Reducer from "../Reducer";
import "../styles.css";

function App() {
  // const [symbols, setSymbols] = useState([]);
  // const [symbol, setSymbol] = useState({});

  const [state, dispatch] = useReducer(Reducer, {
    symbols: []
  });
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMD&interval=5min&outputsize=full&apikey=${
          process.env.REACT_APP_KEY
        }`
      );

      const json = await res.json();
      console.log(json);

      dispatch({
        type: "addSymbol",
        payload: {
          symbol: json["Meta Data"]["2. Symbol"],
          lastRefreshed: json["Meta Data"]["3. Last Refreshed"],
          latestData:
            json["Time Series (5min)"][
              Object.keys(json["Time Series (5min)"])[0]
            ]
        }
      });
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div style={{ height: "700px" }}>
      <GridLayout className="layout" cols={12} rowHeight={100} width={1200}>
        {/* <div
          style={{ border: "1px solid #000" }}
          key="a"
          data-grid={{ x: 0, y: 0, w: 1, h: 2 }}
        >
          a
        </div> */}

        {state.symbols &&
          state.symbols.map((sym, index) => {
            return (
              <div
                key={index}
                className="data-block"
                data-grid={{
                  isResizable: true,
                  x: parseInt(index),
                  y: 0,
                  w: 3,
                  h: 2
                }}
              >
                <div className="data-block-name">
                  <h3>{sym.symbol}</h3>
                </div>
                <div className="data-block-data">
                  <p>open: {sym.latestData["1. open"]}</p>
                  <p>close: {sym.latestData["4. close"]}</p>
                  <p>high: {sym.latestData["2. high"]}</p>
                  <p>low: {sym.latestData["3. low"]}</p>
                  <p>volume: {sym.latestData["5. volume"]}</p>
                </div>
                <div className="data-block-date">
                  <span>{sym.lastRefreshed}</span>
                </div>
              </div>
            );
          })}
      </GridLayout>
    </div>
  );
}

export default App;
