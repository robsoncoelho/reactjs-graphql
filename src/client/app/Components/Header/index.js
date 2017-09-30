import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import style from './style.scss';
import TiBeer from 'react-icons/lib/ti/beer';

const Header = (props) => {
	return (
		<header>
			<h1><Link to={'/'}>Delivery de Bebidas <TiBeer className={style.beerIcon} /></Link></h1>
		</header>
	)
}

export default Header;