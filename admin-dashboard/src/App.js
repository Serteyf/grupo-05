import { Component } from "react";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import DataCardSmall from "./components/DataCard/DataCardSmall/DataCardSmall";
import DataCardBig from "./components/DataCard/DataCardBig/DataCardBig";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      smallCardsValues: [
        {
          title: "Products in Data Base",
          value: "n/a",
          color: "primary",
          icon: "fa-clipboard-list",
        },
        {
          title: "Amount in products",
          value: "n/a",
          color: "success",
          icon: "fa-dollar-sign",
        },
        {
          title: "Users quantity",
          value: "n/a",
          color: "warning",
          icon: "fa-user-check",
        },
      ],
    };
  }
  async queryProductsAPI(endpoint) {
    const response = await fetch(
      `http://localhost:3000/api/products/${endpoint}`
    );
    return await response.json();
  }
  async queryUsersAPI(endpoint) {
    const response = await fetch(`http://localhost:3000/api/users/${endpoint}`);
    return await response.json();
  }

  async getProductsCount() {
    const countResponse = await this.queryProductsAPI("count");
    return countResponse.count;
  }
  async getProductsTotalPrice() {
    const countResponse = await this.queryProductsAPI("total-price");
    return countResponse.totalPrice;
  }
  async getUsersCount() {
    const countResponse = await this.queryUsersAPI("count");
    return countResponse.count;
  }

  async updateData() {
    const smallCardsValues = [
      {
        title: "Products in Data Base",
        value: (await this.getProductsCount()).toString(),
        color: "primary",
        icon: "fa-clipboard-list",
      },
      {
        title: "Amount in products",
        value:
          "$ " + (await this.getProductsTotalPrice()).toLocaleString("es-AR"),
        color: "success",
        icon: "fa-dollar-sign",
      },
      {
        title: "Users quantity",
        value: (await this.getUsersCount()).toString(),
        color: "warning",
        icon: "fa-user-check",
      },
    ];

    this.setState({
      smallCardsValues,
    });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <SideMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
                <div className="row">
                  {this.state.smallCardsValues.map((elem, index) => {
                    return (
                      <DataCardSmall
                        key={index}
                        title={elem.title}
                        value={elem.value}
                        icon={elem.icon}
                        color={elem.color}
                      />
                    );
                  })}
                </div>
                <div className="row">
                  <DataCardBig />
                  <DataCardBig />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
