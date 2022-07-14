import logo from "./logo.svg";
import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <div className="App">
      <OrderEntry />
      <SummaryForm />
    </div>
  );
}

export default App;
