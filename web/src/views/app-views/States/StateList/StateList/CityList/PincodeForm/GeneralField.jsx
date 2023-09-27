import React from 'react'
import { Input, Row, Col, Card, Form, InputNumber } from 'antd';

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

const GeneralField = ({loading}) => {

	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={17}>
				<Card loading={loading} title="Basic Info">
					<Form.Item name="pincode" label="Pincode" rules={rules.name}>
						<InputNumber className='w-100' placeholder="Pincode" />
					</Form.Item>
					<Form.Item name="delivery_charge_day" label="Delivery Charge Day" rules={rules.name}>
						<InputNumber className='w-100' placeholder="Delivery Charge Day" />
					</Form.Item>
					<Form.Item name="delivery_charge_night" label="Delivery Charge Night" rules={rules.name}>
						<InputNumber className='w-100' placeholder="Delivery Charge Night" />
					</Form.Item>
				</Card>
			</Col>
		</Row>
	)

}


export default GeneralField
