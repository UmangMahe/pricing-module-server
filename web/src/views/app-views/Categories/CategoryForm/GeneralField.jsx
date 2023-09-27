import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, Checkbox } from 'antd';
import { ImageSvg } from '@assets/svg/icon';
import CustomIcon from '@components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';
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


	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={17}>
				<Card title="Basic Info">
					<Form.Item name="name" label="Category name" rules={rules.name}>
						<Input placeholder="Category Name" />
					</Form.Item>
					<Form.Item name="description" label="Description" rules={rules.description}>
						<Input.TextArea rows={4} />
					</Form.Item>
					
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
				
			</Col>
		</Row>
	)

}


export default GeneralField
