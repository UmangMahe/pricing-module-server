import React, { useState, useEffect } from 'react'
import PageHeaderAlt from '@components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from '@components/shared-components/Flex'
import GeneralField from './GeneralField'
import { useAxiosCallback } from '@utils/useFetch';
import { CATEGORY_LIST, PRODUCT_LIST } from '@constants/ApiConstants';
import Utils from '@utils';

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const CategoryForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	const {isLoading, callback: getProducts} = useAxiosCallback()

	useEffect(() => {
		if (mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param
			console.log('id', id)
			const produtId = parseInt(id)
			getProducts({
				method: 'GET',
				url: `${CATEGORY_LIST}/${produtId}`,
				success:(res)=>{
					console.log('res', res)
					const {category} = res
					form.setFieldsValue({
						name: category.name,
						description: category.description,
						icon: category.icon,
						// variation: category.variation,
						// shipping: category.shipping,
					})
					setImage(Utils.getImgUrl(category.icon))
				}
			})
		}
	}, [mode, form, param]);

	const handleUploadChange = info => {
		console.log(info)

		getBase64(info.file, imageUrl => {
			setImage(imageUrl)
			setUploadLoading(true)
		});

	};


	const {callback: addProduct} = useAxiosCallback()
	const {callback: upDateProduct} = useAxiosCallback()

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			const form = new FormData()
			for(var key in values){
				form.append(key, values[key])
			}
			
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					addProduct({
						method: 'POST',
						url: CATEGORY_LIST,
						data: form,
						success: (res)=>{
							message.success(`Created ${values.name} to category list`);
						}
					})
					
				}
				if (mode === EDIT) {
					form.append('_method', 'patch')
					form.delete('icon')
					if(values.icon instanceof File){
						form.append('icon', values.icon)
					}
					upDateProduct({
						method: 'POST',
						url: `${CATEGORY_LIST}/${param.id}`,
						data: form,
						success: (res)=>{
							message.success(`Updated ${values.name} to category list`);
						}	
					})
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
				
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="end">
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Category' : `Edit Category`} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
						<TabPane  tab="General" key="1">
							<GeneralField
								uploadedImg={uploadedImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
						{/* <TabPane tab="Variation" key="2">
							<VariationField />
						</TabPane>
						<TabPane tab="Shipping" key="3">
							<ShippingField />
						</TabPane> */}
					</Tabs>

				</div>
			</Form>
		</>
	)
}

export default CategoryForm
