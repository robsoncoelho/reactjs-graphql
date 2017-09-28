import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';

import classNames from 'classnames/bind';
import searchBox from '../style/searchbox.scss';

import MdLocationOn from 'react-icons/lib/md/location-on';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			fieldErrors: {},
			showComplementBox: false,
			complementaryFields: {
				number: '',
				complement: ''
			},

		}
	}

	onSuggestSelect(suggest) {
		this.setState({'address':suggest})
		this.setState({'showComplementBox': true})
	}

	onSuggestBlur(suggest) {
		if( suggest === '' ){
			this.setState({'address':''})
			this.setState({'showComplementBox': false})
			this.setState({fieldErrors:''})
		}
	}

	handleFormChange(field, event) {
		let fields = this.state.complementaryFields;
		fields[field] = event.target.value;        
		this.setState({fields});
	}

	handleFormSubmit(event) {
		event.preventDefault();

		let fieldErrors = {};
		let isValid = true;

		if( this.state.address === ''){
			fieldErrors["address"] = "Endereço não informado";
			isValid = false;
		}
		if( this.state.complementaryFields.number === ''){
			fieldErrors["number"] = "Número não informado";
			isValid = false;
		}

		this.setState({fieldErrors: fieldErrors});

		if( isValid ){
			console.log(this.state.address)
			console.log(this.state.complementaryFields)
		}
	}

  	render() {

  		const { showComplementBox, address, complementaryFields, fieldErrors } = this.state;

		return (
			<div className={searchBox.searchContainer}>
				<form onSubmit={this.handleFormSubmit.bind(this)}>
					<div className={searchBox.fieldBox}>
						<h2>Endereço de entrega</h2>
						<div className={searchBox.addressBox}>
							<MdLocationOn className={searchBox.marker} />
							<Geosuggest
								placeholder="Fala ai o endereço"
								types={['address']}
								suggestsClassName={searchBox.results}
								suggestsHiddenClassName={searchBox.resultsHidden}
								suggestItemActiveClassName={searchBox.resultItemActive}
								onBlur={this.onSuggestBlur.bind(this)}
								onSuggestSelect={this.onSuggestSelect.bind(this)} />
							<span className={searchBox.labelError}>{fieldErrors["address"]}</span>
						</div>
					</div>
					<div className={classNames(searchBox.fieldGroup, showComplementBox && searchBox.showFieldGroup)}>
						<div className={searchBox.fieldBox}>
							<input onChange={this.handleFormChange.bind(this, "number")} value={complementaryFields["number"]} type="text" name="number" placeholder="Número" autoComplete="off" />
							<span className={searchBox.labelError}>{fieldErrors["number"]}</span>
						</div>
						<div className={searchBox.fieldBox}>
							<input onChange={this.handleFormChange.bind(this, "complement")} value={complementaryFields["complement"]} type="text" name="complement" placeholder="Complemento" autoComplete="off" />
						</div>
						<div className={searchBox.buttonBox}>
							<button type="submit"><FaArrowRight className={searchBox.buttonIcon} /></button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default SearchBox;