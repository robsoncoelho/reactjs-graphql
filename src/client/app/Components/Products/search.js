import React, {Component} from 'react';

import style from './style.scss';
import FaSearch from 'react-icons/lib/fa/search';

const Search = ({ searchProduct, searchSubmit }) => (
	<div className={style.searchField}>
		<form onSubmit={(e) => searchSubmit(e)}>
			<input onInput={(e) => searchProduct(e)} autoComplete="off" type="text" name="search" placeholder="Buscar" />
			<button type="submit">
				<FaSearch className={style.searchIcon} />
			</button>
		</form>
	</div>
)

export default Search;