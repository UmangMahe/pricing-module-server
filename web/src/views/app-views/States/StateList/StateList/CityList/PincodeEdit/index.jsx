import React from 'react'
import PincodeForm from '../PincodeForm';

const EditPincode = props => {
	return (
		<PincodeForm mode="EDIT" param={props.match.params} match={props.match} />
	)
}

export default EditPincode
