import React from 'react';
import ProductForm from '../ProductForm/index';


const AddProduct = (props) => {
	return (
		<ProductForm mode="ADD" param={props.match.params} match={props.match}/>
	)
}

export default AddProduct
