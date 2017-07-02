/**
 * OBJECTIVES
 * There are only two requirements:
 * 1) List all the stores (from the API).
 * 2) Edit a store name (via the API).
 */

import React from 'react';
import fetch from 'node-fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      stores: [],
      inputValue: '',
      showInput: false,
    };

    this.getBrandsAndStores = this.getBrandsAndStores.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getBrandsAndStores();
  }
  changeName(store) { // eslint-disable-line
    // 'node-fetch' does not accept relative paths
    const BASE_URL = 'http://localhost:3000/api/stores';
    const END_URL = BASE_URL + '/' + store.store_id; // eslint-disable-line

    // Tried using window.fetch. It has some issue with the POST/PUT request payloads.
    // Issue - https://github.com/github/fetch/issues/323
    // window.fetch(END_URL, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     name: this.state.inputValue // eslint-disable-line
    //   }),
    //   header: { 'Content-Type': 'application/json' },
    // }).then((response) => {
    //   if (response.status === 201) {
    //     this.getBrandsAndStores();
    //   }
    // });

    fetch(END_URL, {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.inputValue // eslint-disable-line
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status === 201) {
        this.getBrandsAndStores();
      }
    });
  }
  handleChange(newValue) { // eslint-disable-line
    this.setState({ inputValue: newValue });
  }
  getBrandsAndStores() {
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
  render() {
    const valueLink = {
      value: this.state.inputValue,
      requestChange: this.handleChange,
    };
    return (
      <div>
        <h2>Brands</h2>
        <ul>
          {this.state.brands.map(brand => (
            <li key={brand.brand_id}>{brand.name}</li>
          ))}
        </ul>
        <h2>Stores</h2>
        <input type="text" placeholder="New store name" valueLink={valueLink} />
        <table>
          <tr>
            <th>Store</th>
            <th>&nbsp;</th>
          </tr>
          {this.state.stores.map(store => (
            <tr key={store.store_id}>
              <td>{store.name}</td>
              <td><button type="button" onClick={() => this.changeName(store)}>Edit</button></td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default App;
