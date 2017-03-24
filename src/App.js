import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var PLAYERS = [
  { number: 20, name: 'Ray Allen', position: 'SG', height: '6-5', weight: '205', birth_day: 'July 20, 1975', country: 'us', years_pro: 11, college: 'University of Connecticut' },
  { number: 42, name: 'Tony Allen', position: 'SG', height: '6-4', weight: '213', birth_day: 'January 11, 1982', country: 'us', years_pro: 3, college: 'Oklahoma State University' },
  { number: 93, name: 'P.J. Brown', position: 'PF', height: '6-11', weight:  '225', birth_day: 'October 14 1969', country: 'us', college: 'Louisiana Tech University' },
  { number: 28, name: 'Sam Cassell', position: 'PG', height: '6-3', weight: '185', birth_day: 'November 18, 1969', country: 'us', years_pro: 14, college: 'Florida State University' },
  { number: 11, name: 'Glen Davis', position: 'C', height: '6-9', weight: '289', birth_day: 'January 1, 1986', country: 'us', years_pro: 'R', college: 'Louisiana State University' },
  { number: 5, name: 'Kevin Garnett', position: 'PF', height: '6-11', weight: '240', birth_day: 'May 19, 1976', country: 'us', years_pro: 12 , college: ''},
  { number: 50, name: 'Eddie House', position: 'PG', height: '6-1', weight: '180', birth_day: 'May 14, 1978', country: 'us', years_pro: 7 , college: 'Arizona State University'},
  { number: 43, name: 'Kendrick Perkins', position: 'C', height: '6-10', weight: '270', birth_day: 'November 10, 1984', country: 'us', years_pro: 4 , college: '' },
  { number: 34, name: 'Paul Pierce', position: 'SF', height: '6-7', weight: '235', birth_day: 'October 13, 1977', country: 'us', years_pro: 9, college: 'University of Kansas' },
  { number: 66, name: 'Scot Pollard', position: 'C', height: '6-11', weight: '265', birth_day: 'February 12, 1975', country: 'us', years_pro: 10, college: 'University of Kansas' },
  { number: 41, name: 'James Posey', position: 'PF', height: '6-8', weight: '215', birth_day: 'January 13, 1977', country: 'us', years_pro: 8, college: 'Xavier University' },
  { number: 0, name: 'Leon Powe', position: 'C', height: '6-8', weight: '240', birth_day: 'January 22, 1984', country: 'us', years_pro: 1, college: 'University of California' },
  { number: 13, name: 'Gabe Pruitt', position: 'PG', height: '6-4', weight: '170', birth_day: 'April 19, 1986', country: 'us', years_pro: 'R', college: 'University of Southern California' },
  { number: 9, name: 'Rajon Rondo', position: 'PG', height: '6-1', weight: '186', birth_day: 'February 22, 1986', country: 'us', years_pro: 1, college: 'University of Kentucky' },
  { number: 44, name: 'Brian Scalabrine', position: 'PF', height: '6-9', weight: '241', birth_day: 'March 18, 1978', country: 'us', years_pro: 6, college: 'University of Southern California' },
]


class Player extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  };

  state = { clicked: 0 };

  handleMouseDown() {
    this.setState({ clicked: this.state.clicked + 1 });
  };

  render() {
    return (
      <span onMouseDown={this.handleMouseDown}>
      <p>
      <strong>{ this.props.name },</strong>
      &nbsp;{ this.props.number },
      <strong>&nbsp;Clicked: { this.state.clicked }</strong>
      </p>
      </span>
    );
  }
};

class TeamBoxBody extends Component {
  state = { selectedName: 'Rondo' };

  fullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }

  render() {
    const { players } = this.props;
    const rows = players.map(player => <Player name={ player.name } number={player.number} clicked={0}></Player>);

    return(
      <div>
      <p>{ this.state.selectedName }</p>
      { rows }
      </div>
    );
  }
}

class TeamBox extends Component {
  render() {
    return(
      <div>
      <h1>{ this.props.team }</h1>
      <TeamBoxBody players={PLAYERS}></TeamBoxBody>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>The Boston Celtics</h2>
      </div>
      <TeamBox team="The Boston Celtics"></TeamBox>
      </div>
    );
  }
}

export default App;






class ProductCategoryRow extends React.Component {
  render() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
    {this.props.product.name}
    </span>;
    return (
      <tr>
      <td>{name}</td>
      <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    console.log(this.props.inStockOnly)
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
      <thead>
      <tr>
      <th>Name</th>
      <th>Price</th>
      </tr>
      </thead>
      <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  render() {
    return (
      <form>
      <input
      type="text"
      placeholder="Search..."
      value={this.props.filterText}
      onChange={this.handleFilterTextInputChange}
      />
      <p>
      <input
      type="checkbox"
      checked={this.props.inStockOnly}
      onChange={this.handleInStockInputChange}
      />
      {' '}
      Only show products in stock
      </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
      <SearchBar
      filterText={this.state.filterText}
      inStockOnly={this.state.inStockOnly}
      onFilterTextInput={this.handleFilterTextInput}
      onInStockInput={this.handleInStockInput}
      />
      <ProductTable
      products={this.props.products}
      filterText={this.state.filterText}
      inStockOnly={this.state.inStockOnly}
      />
      </div>
    );
  }
}


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

// ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('container')
// );
