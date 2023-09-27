import React from 'react';
import CityForm from '../CityForm';


const AddCity = (props) => {
	return (
		<CityForm mode="ADD" param={props.match.params} />
	)
}

export default AddCity
