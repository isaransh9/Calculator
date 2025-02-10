import ReactDOM from "react-dom/client";
import Body from "./component/Body";

const App = () => {
  return (
    <div className="main-div">
      <div className="header-container">
        <div className="heading">
          <h1>Calculator</h1>
        </div>
      </div>
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
