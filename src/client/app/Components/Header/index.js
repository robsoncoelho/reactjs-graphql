import React, {Component} from 'react';

import style from './style.scss';
import TiBeer from 'react-icons/lib/ti/beer';

const Header = (props) => {
	return (
		<header>
			<h1>Delivery de Bebidas <TiBeer className={style.beerIcon} /></h1>
		</header>
	)
}

export default Header;