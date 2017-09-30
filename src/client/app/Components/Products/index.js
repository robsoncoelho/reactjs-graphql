import React, { Component } from 'react';

import ProductList from './productList.js';

import classNames from 'classnames/bind';
import style from './style.scss';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

class Products extends Component {
	constructor(props) {
	    super(props);
  	}

  	render() {
		return (
			<ProductList />
		)
	}
}

export default Products;
