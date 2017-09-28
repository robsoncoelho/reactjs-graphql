import React, {Component} from 'react';
import {render} from 'react-dom';

import Header from './Components/Header/';
import Footer from './Components/Footer/';
import SearchBox from './Components/SearchBox/';

import style from './Components/Common/style.scss';

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
