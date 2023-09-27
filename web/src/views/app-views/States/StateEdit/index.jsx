import React from 'react'
import StateForm from '../StateForm';

const EditState = props => {
	return (
		<StateForm mode="EDIT" param={props.match.params} match={props.match} />
	)
}

export default EditState
