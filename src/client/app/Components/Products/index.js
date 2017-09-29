import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { POC_SEARCH } from '../Common/api.js';

import classNames from 'classnames/bind';
import style from './style.scss';

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: ''
		}

		this.baseState = this.state;
	}

  	render() {
		return (
			<div className={style.searchContainer}>
				<p>oi</p>
			</div>
		)
	}
}

export default graphql(POC_SEARCH, {
  options: () => ({ variables: { now: "2017-08-01T20:00:00.000Z", algorithm: "NEAREST", lat: "-23.632919", long: "-46.699453" } })
})(Products);
