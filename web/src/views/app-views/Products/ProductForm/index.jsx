import React, { useState, useEffect } from 'react'
import PageHeaderAlt from '@components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from '@components/shared-components/Flex'
import GeneralField from './GeneralField'
import ShippingField from './ShippingField'
import { useAxiosCallback } from '@utils/useFetch';
import Utils from '@utils';
import {Redirect, useHistory} from 'react-router-dom'

import { APP_PREFIX_PATH } from '../../../../configs/AppConfig';

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param, match } = props

	const history = useHistory()
	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	
	
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	const {data: product, isLoading, callback: getProducts} = useAxiosCallback()

	

	useEffect(() => {
		if (mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param
			console.log('id', id)
			const produtId = parseInt(id)
			getProducts({
				method: 'GET',
				url: ``,
				success:(res)=>{
					console.log('res', res)
					const {product} = res
					
					form.setFieldsValue({
						name: product.name,
						description: product.description,
						price: product.price,
						sort_description: product.sort_description,
						category_id: product.category?.id,
						sub_category_id: product.sub_category?.id,
						is_custom: product.is_custom,
						icon: product.icon,
						// variation: product.variation,
						// shipping: product.shipping,
					})
					
					setImage(Utils.getImgUrl(product.icon))
					return res
				}
			})
		}
		if(mode === ADD){
			const productId = new URLSearchParams(history.location.search).get('add-images')
			if(productId){
				console.log("Images")
			}
			
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

	const [tabKey, setTabKey] = useState('1')
	const [disabledAddImageTab, setDisabledAddImageTab] = useState(false)

	const[productId, setProductId] = useState(null)
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
						url: PRODUCT_LIST,
						data: form,
						success: (res)=>{
							if(res){
								message.success(`Created ${values.name} to product list`);
								setProductId(res.new_product.id)
								setDisabledAddImageTab(false)
								setTabKey('2')
							}
							
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
						url: `${PRODUCT_LIST}/${param.id}`,
						data: form,
						success: (res)=>{
							message.success(`Updated ${values.name} to product list`);
						}	
					})
				}
			}, 1000);
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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Product' : `Edit Product`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={()=>history.push(`${APP_PREFIX_PATH}/products`)}>Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' && tabKey==='1' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs activeKey={tabKey} onChange={(key)=>setTabKey(key)} style={{ marginTop: 30 }}>
						<TabPane   tab="General" key="1">
							<GeneralField
								uploadedImg={uploadedImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								form={form}
							/>
						</TabPane>
						{/* {/* <TabPane tab="Variation" key="2">
							<VariationField />
						</TabPane> */}
						<TabPane tab="Images" disabled={disabledAddImageTab} loading={isLoading} key="2">
							<ShippingField 
								images = {product?.product?.images}
								loading={isLoading}
								id={productId}
							/>
						</TabPane>
					</Tabs>

				</div>
			</Form>
		</>
	)
}

export default ProductForm
