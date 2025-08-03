# 📊 React + D3.js Chart Renderer

This project renders interactive line charts using React and D3.js. The app dynamically loads chart definitions from a `data.json` file and renders either single-series or multi-series line charts based on the data structure.

---

## ✅ Features

* 📆 Loads and renders charts defined in JSON.
* 🔍 Automatically detects chart type (single or multi-series).
* 📈 Single-series chart: renders a single line.
* 🌈 Multi-series chart: renders three colored lines (blue, green, red).
* ❌ Gracefully skips `null` data points.
* 🎯 Built with React and D3.js.

---

## 🗂 Project Structure

```
src/
├── components/
│   └── Chart.tsx       # Reusable chart component using D3
├── data/
│   └── data.json        # Input data
├── App.tsx              # Main entry: loops through and renders charts
└── main.tsx / index.tsx
```

---

## 🧪 Example Input Data (`data.json`)

```json
[
  {
    "title": "Single Series Example",
    "data": [[0, 2], [1, 3], [2, null], [3, 5]]
  },
  {
    "title": "Multi Series Example",
    "data": [[0, [2, 3, 4]], [1, [3, null, 6]], [2, [null, 5, 7]], [3, [6, 6, null]]]
  }
]
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Technologies Used

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [D3.js](https://d3js.org/)
* [Vite](https://vitejs.dev/) (or CRA, if used)

---

## 🧼 Code Style & Notes

* Modular and reusable `Chart.tsx` component.
* Type-safe with clear data structure definitions.
* Chart type detection is automatic — no manual flags.
* Axes are auto-scaled per chart based on input data.

---

## 🧐 Bonus

* Easily extensible to support more series or styling.
* TypeScript enforces correct shape of data.
* Defensive programming: `null` values are ignored per series.

---

## 📄 License

MIT — use freely for educational or commercial purposes.

---

## 🤛\200d♂️ Author

Built by **Ehsan** for a frontend technical assessment.
