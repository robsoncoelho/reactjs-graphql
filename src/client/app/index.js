import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createStore } from 'redux';

import Header from './Components/Header/Header.scene';
import Footer from './Components/Footer/Footer.scene';
import SearchBox from './Components/SearchBox/SearchBox.scene';
import Products from './Components/Products/';
import style from './Components/Common/style.scss';

import configureStore from './Config/configureStore';
import { CLIENT } from './Components/Common/api.js';

const store = configureStore();

const App = () => (
	<ApolloProvider store={store} client={CLIENT}>
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

render(<App/>, document.getElementById('app'));
