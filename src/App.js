
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.css'

import { Detail } from './pages/Detail'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProductosList } from './components/ProductosList';
import { SearchForm } from './components/SearchForm'

class App extends Component {

  state = { usedSearch: false, query: {} }

  _handleResults = (query) => {
    console.log(query)
    this.setState({ query, usedSearch: true })
  }

  _renderResults() {
    const { query } = this.state
    return this.state.query ?
      <Redirect to={`/items/search=${query}`} />
      : <p>Sin Resultados</p>
  }

  render() {
    return (
      <div className="App">
        <div class="columns is-desktop bg-amarillo">
          <div class="column is-1"></div>
          <div class="column is-10">
            <div className='searchForm-wrapper'>
              <SearchForm onResults={this._handleResults} />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>

       <div class="columns is-desktop bg-grisBlanco">
          <div class="column is-1"></div>
          <div class="column is-10">
          {this._renderResults() }


        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/items/search=:query' component={ProductosList} />
          <Route path='/items/:id' component={Detail} />
          <Route component={NotFound} />
        </Switch>

          </div>
        </div>
        <div class="column is-1"></div>


        
      </div>
    );
  }
}

export default App;
