import React, {Component} from 'react';
import {render} from 'react-dom';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SearchBox from './Components/SearchBox.js';

import style from './style/common.scss';

class App extends Component {
  render () {
    return (
    	<div className={style.main}>
    		<Header />
    		<section className={style.container}>
    			<SearchBox />
    		</section>
    		<Footer />
    	</div>
    )
  }
}

render(<App/>, document.getElementById('app'));
