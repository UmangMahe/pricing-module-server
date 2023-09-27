import React from 'react'
import CategoryForm from '../CategoryForm';

const EditCategory = props => {
	return (
		<CategoryForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditCategory
