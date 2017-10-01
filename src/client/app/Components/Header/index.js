import React from 'react';
import { Link } from 'react-router-dom';
import TiBeer from 'react-icons/lib/ti/beer';

import style from './style.scss';

const Header = () => {
	return (
		<header>
			<h1><Link to={'/'}>Delivery de Bebidas <TiBeer className={style.beerIcon} /></Link></h1>
		</header>
	)
}

export default Header;