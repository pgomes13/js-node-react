/**
 * OBJECTIVES
 * There are only two requirements:
 * 1) List all the stores (from the API).
 * 2) Edit a store name (via the API).
 */

import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      stores: [],
      inputValue: '',
    };

    this.changeName = this.changeName.bind(this);
  }
  componentDidMount() {
    const brandsPromise = new Promise((resolve, reject) => {
      window.fetch('/api/brands')
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
    });

    const storesPromise = new Promise((resolve, reject) => {
      window.fetch('/api/stores')
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
    });

    Promise.all([brandsPromise, storesPromise]).then((res) => {
      this.setState({
        brands: res[0],
        stores: res[1],
      });
    });
  }
  changeName(store) { // eslint-disable-line
    console.log(store);
  }
  render() {
    return (
      <div>
        <h2>Brands</h2>
        <ul>
          {this.state.brands.map(brand => (
            <li key={brand.brand_id}>{brand.name}</li>
          ))}
        </ul>
        <h2>Stores</h2>
        <ul>
          {this.state.stores.map(store => (
            <li key={store.store_id}>
              {store.name}&nbsp;&nbsp;&nbsp;&nbsp;
              <input value={this.state.inputValue} />&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={this.changeName({ store })} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
