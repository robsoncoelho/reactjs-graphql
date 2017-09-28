import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';

import classNames from 'classnames/bind';
import style from './style.scss';

import MdLocationOn from 'react-icons/lib/md/location-on';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';


class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			fieldErrors: {},
			formSubmited: false,
			showComplementBox: false,
			complementaryFields: {
				number: '',
				complement: '',
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

		if(!this.state.formSubmited ){
			if( isValid ){
				this.setState({formSubmited: true})
				console.log(this.state.address);
				console.log(this.state.complementaryFields);
			} else {
				this.setState({fieldErrors: fieldErrors})
			}
		}
	}

  	render() {

  		const {
  			showComplementBox,
  			address,
  			complementaryFields,
  			fieldErrors,
  			formSubmited
  		} = this.state;

  		let Iconsubmit;

  		if( !formSubmited ){
  			Iconsubmit = <FaArrowRight className={style.buttonIcon} />
  		} else {
  			Iconsubmit = <FaCircleONotch className={style.buttonLoading} />
  		}

		return (
			<div className={style.searchContainer}>
				<form onSubmit={this.handleFormSubmit.bind(this)}>
					<div className={style.fieldBox}>
						<h2>Endereço de entrega</h2>
						<div className={style.addressBox}>
							<MdLocationOn className={style.marker} />
							<Geosuggest
								placeholder="Fala ai o endereço"
								types={['address']}
								suggestsClassName={style.results}
								suggestsHiddenClassName={style.resultsHidden}
								suggestItemActiveClassName={style.resultItemActive}
								onBlur={this.onSuggestBlur.bind(this)}
							 	disabled={formSubmited}
							 	country={['br']}
								onSuggestSelect={this.onSuggestSelect.bind(this)} />
							<span className={style.labelError}>{fieldErrors["address"]}</span>
						</div>
					</div>
					<div className={classNames(style.fieldGroup, showComplementBox && style.showFieldGroup)}>
						<div className={style.fieldBox}>
							<input onChange={this.handleFormChange.bind(this, "number")} value={complementaryFields["number"]} disabled={formSubmited} type="text" name="number" placeholder="Número" autoComplete="off" />
							<span className={style.labelError}>{fieldErrors["number"]}</span>
						</div>
						<div className={style.fieldBox}>
							<input onChange={this.handleFormChange.bind(this, "complement")} value={complementaryFields["complement"]} disabled={formSubmited} type="text" name="complement" placeholder="Complemento" autoComplete="off" />
						</div>
						<div className={style.buttonBox}>
							<button type="submit">
								{Iconsubmit}
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default SearchBox;