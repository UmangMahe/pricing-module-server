import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, Checkbox } from 'antd';
import { ImageSvg } from '@assets/svg/icon';
import CustomIcon from '@components/util-components/CustomIcon'
import { LoadingOutlined} from '@ant-design/icons';
import { useAxios } from '@utils/useFetch';
import { CATEGORY_LIST, SUB_CATEGORY_LIST } from '../../../../constants/ApiConstants';

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter product name',
		}
	],
	description: [
		{
			required: true,
			message: 'Please enter product description',
		}
	],
	sort_description: [
		{
			required: true,
			message: "Please enter product's short description",
		}
	],
	price: [
		{
			required: true,
			message: 'Please enter product price',
		}
	],
	comparePrice: [
	],
	taxRate: [
		{
			required: true,
			message: 'Please enter tax rate',
		}
	],
	cost: [
		{
			required: true,
			message: 'Please enter item cost',
		}
	]
}









const tags = ['Cotton', 'Nike', 'Sales', 'Sports', 'Outdoor', 'Toys', 'Hobbies']

const GeneralField = props => {


	const beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M && false;
	}

	const imageUploadProps = {
		name: 'icon',
		multiple: false,
		listType: "picture-card",
		showUploadList: false,

	}




	const { data: categories, loadingDone: loadingDoneCategories } = useAxios({
		method: 'GET',
		url: CATEGORY_LIST,
	}, 'categories')

	const { data: subCategories, loadingDone: loadingDoneSubCategories } = useAxios({
		method: 'GET',
		url: SUB_CATEGORY_LIST,
	}, 'sub_categories')

	const [newSubCategory, setNewSubCategories] = useState([])

	const handleCategory = (value) => {
		setNewSubCategories([])

		let newSubCategory = subCategories.filter(subCategory => {
			return subCategory.category_id === value
		})
		setNewSubCategories(newSubCategory)
	}

	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={17}>
				<Card title="Basic Info">
					<Form.Item name="name" label="Product name" rules={rules.name}>
						<Input placeholder="Product Name" />
					</Form.Item>
					<Form.Item name="description" label="Description" rules={rules.description}>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item name="sort_description" label="Short Description" rules={rules.sort_description}>
						<Input placeholder='Short Description' />
					</Form.Item>
				</Card>
				<Card title="Pricing">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12}>
							<Form.Item name="price" label="Price" rules={rules.price}>
								<InputNumber
									className="w-100"
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
								/>
							</Form.Item>
						</Col>
						{/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="comparePrice" label="Compare price" rules={rules.comparePrice}>
							<InputNumber
								className="w-100"
								value={0}
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
						{/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="cost" label="Cost per item" rules={rules.cost}>
							<InputNumber
								className="w-100"
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
						{/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>
							<InputNumber
								className="w-100"
								min={0}
								max={100}
								formatter={value => `${value}%`}
								parser={value => value.replace('%', '')}
							/>
						</Form.Item>
					</Col> */}
					</Row>
				</Card>
				<Card title="Customization">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12}>
							<Form.Item name="is_custom" label="Is Custom" initialValue={0} valuePropName='checked' getValueFromEvent={(e)=>Number(e.target.checked)}>
								<Checkbox>Is Custom</Checkbox>
							</Form.Item>
						</Col>
						{/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="comparePrice" label="Compare price" rules={rules.comparePrice}>
							<InputNumber
								className="w-100"
								value={0}
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
						{/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="cost" label="Cost per item" rules={rules.cost}>
							<InputNumber
								className="w-100"
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
						{/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>
							<InputNumber
								className="w-100"
								min={0}
								max={100}
								formatter={value => `${value}%`}
								parser={value => value.replace('%', '')}
							/>
						</Form.Item>
					</Col> */}
					</Row>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={7}>
				<Card title="Media">
					<Form.Item name="icon" getValueFromEvent={({ file }) => file}>
						<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e => props.handleUploadChange(e)}>
							{
								props.uploadedImg ?
									<img src={props.uploadedImg} alt="avatar" id="featuredImage" className="img-fluid" />
									:
									<div>
										{
											props.uploadLoading ?
												<div>
													<LoadingOutlined className="font-size-xxl text-primary" />
													<div className="mt-3">Uploading</div>
												</div>
												:
												<div>
													<CustomIcon className="display-3" svg={ImageSvg} />
													<p>Click or drag file to upload</p>
												</div>
										}
									</div>
							}
						</Dragger>
					</Form.Item>
				</Card>
				<Card title="Organization">
					<Form.Item name="category_id" label="Category" >
						<Select className="w-100" placeholder="Category" onSelect={handleCategory} loading={!loadingDoneCategories}>
							{
								categories?.map(elm => (
									<Option key={elm.id} value={elm.id}>{elm.name}</Option>
								))
							}
						</Select>
					</Form.Item>
					<Form.Item name="sub_category_id" label="Sub Category" >
						<Select className="w-100" placeholder="Sub Category" loading={!loadingDoneSubCategories}>
							{
								newSubCategory?.map(elm => (
									<Option key={elm.id} value={elm.id}>{elm.name}</Option>
								))
							}
						</Select>
					</Form.Item>
					{/* <Form.Item name="tags" label="Tags" >
				<Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
					{tags.map(elm => <Option key={elm}>{elm}</Option>)}
				</Select>
				</Form.Item> */}
				</Card>
			</Col>
		</Row>
	)

}


export default GeneralField
