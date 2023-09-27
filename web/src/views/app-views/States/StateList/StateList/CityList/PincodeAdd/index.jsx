import React from 'react';
import PincodeForm from '../PincodeForm';


const AddPincode = (props) => {
	return (
		<PincodeForm mode="ADD" param={props.match.params} match={props.match}/>
	)
}

export default AddPincode
