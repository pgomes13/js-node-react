# Javacript Tests

Tests for Node.js API, React and Javascript control flow.

### USAGE

- Using node@8.1.3 & npm@5.0.4
- `npm install`

#### 1) CONTROL FLOW

All tests are passing and meet the criteria here: `./src/controlFlow.js`

- `npm test`

#### 2) NODE.JS API

Follow the directions here: `./src/router.js`

- <a href="https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/">Install MongoDB</a>


- Run 'mongod' in terminal to start the local mongodb server


- From the root directory run the following commands in separate terminal to populate mock mongodb collections - 
	'mongoimport --db rfg --collection brands --drop --file ./data/brands.json --jsonArray'
	'mongoimport --db rfg --collection stores --drop --file ./data/stores.json --jsonArray'

- `npm start`

#### 3) REACT

Follow the directions here: `./src/client/components/App.js`

- `npm start`
