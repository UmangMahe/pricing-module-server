import React from 'react'
import CityForm from '../CityForm';

const EditCity = props => {
	return (
		<CityForm mode="EDIT" param={props.match.params} match={props.match} />
	)
}

export default EditCity
