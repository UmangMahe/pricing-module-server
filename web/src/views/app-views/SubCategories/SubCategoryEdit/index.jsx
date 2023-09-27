import React from 'react'
import SubCategoryForm from '../SubCategoryForm';

const EditSubCategory = props => {
	return (
		<SubCategoryForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditSubCategory
