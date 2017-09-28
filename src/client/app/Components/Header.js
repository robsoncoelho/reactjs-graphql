import React, {Component} from 'react';

import header from '../style/header.scss';
import TiBeer from 'react-icons/lib/ti/beer';

const Header = (props) => {
	return (
		<header>
			<h1>Delivery de Bebidas <TiBeer className={header.beerIcon} /></h1>
		</header>
	)
}

export default Header;