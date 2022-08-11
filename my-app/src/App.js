import logo from "./logo.svg";
import "./App.css";
import WalletInit from "./components/WalletInit";
import SendEth from "./components/SendEth";

function App() {
  return (
    <div className="App">
      <WalletInit />
      <SendEth />
    </div>
  );
}

export default App;
