import React from 'react'
import { Input, Row, Col, Card, Form } from 'antd';

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
					<Form.Item name="name" label="State name" rules={rules.name}>
						<Input placeholder="State Name" />
					</Form.Item>
				</Card>
			</Col>
		</Row>
	)

}


export default GeneralField
