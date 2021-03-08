import "./App.css";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <SideMenu />
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Header />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
