import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <div className="App">
      <ExpenseTracker />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="onex-toast"
      />
    </div>
  );
}

export default App;
