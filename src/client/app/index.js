import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { CLIENT } from './Components/Common/api.js';

import Header from './Components/Header/';
import Footer from './Components/Footer/';
import SearchBox from './Components/SearchBox/';
import Products from './Components/Products/';
import style from './Components/Common/style.scss';

class App extends Component {
  render () {
    return (
    	<ApolloProvider client={CLIENT}>
	    	<Router>
		    	<div className={style.main}>
		    		<Header />
		    		<section className={style.container}>
						<Route exact path="/" component={SearchBox}/>
						<Route path="/products" component={Products}/>
		    		</section>
		    		<Footer />
		    	</div>
		    </Router>
		</ApolloProvider>
    )
  }
}

render(<App/>, document.getElementById('app'));
