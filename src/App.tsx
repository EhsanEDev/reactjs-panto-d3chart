import Chart from "./components/chart";
import type { ChartPoint } from "./constants/types";
import data from "./data/data.json";
import "./App.css";

const App = () => {
  return (
    <div>
      {data.map((chartData, index) => (
        <div className="chart-container" key={index}>
          <h3 className="chart-title">{chartData.title}</h3>
          <Chart data={chartData.data as ChartPoint[]} />
        </div>
      ))}
    </div>
  );
};

export default App;
