import React, { useState, useEffect } from 'react'
import PageHeaderAlt from '@components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from '@components/shared-components/Flex'
import GeneralField from './GeneralField'
import { useAxiosCallback } from '@utils/useFetch';

import Utils from '@utils';
import {Redirect, useHistory} from 'react-router-dom'
import { PINCODE_LIST } from '@constants/ApiConstants';
import { APP_PREFIX_PATH } from '@configs/AppConfig';

const { TabPane } = Tabs;
const ADD = 'ADD'
const EDIT = 'EDIT'

const StateForm = props => {

	const { mode = ADD, param, match } = props

	const history = useHistory()
	const [form] = Form.useForm();
	const [submitLoading, setSubmitLoading] = useState(false)

	const {data: state, isLoading, callback: getPincode} = useAxiosCallback()

	useEffect(() => {
		if (mode === EDIT) {
			const { pincodeId } = param
			getPincode({
				method: 'GET',
				url: `${PINCODE_LIST}/${pincodeId}`,
				success:(res)=>{
					const {pincode} = res
					
					form.setFieldsValue({
						pincode: pincode.pincode,
						delivery_charge_day: pincode.delivery_charge_day,
						delivery_charge_night: pincode.delivery_charge_night,

					})
					return res
				}
			})
		}
	}, [mode, form, param]);

	const {callback: addState} = useAxiosCallback()
	const {callback: upDateState} = useAxiosCallback()

	const [tabKey, setTabKey] = useState('1')

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			
			const form = new FormData()
			for(var key in values){
				form.append(key, values[key])
			}
			form.append('city_id', param.cityId)
			
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					addState({
						method: 'POST',
						url: PINCODE_LIST,
						data: form,
						success: (res)=>{
							if(res){
								message.success(`Created ${values.pincode} to pincode list`);
								history.go(-1)
							}
							
						}
					})
					
				}
				if (mode === EDIT) {
					form.append('_method', 'patch')
					upDateState({
						method: 'POST',
						url: `${PINCODE_LIST}/${param.pincodeId}`,
						data: form,
						success: (res)=>{
							message.success(`Updated ${values.pincode} to state list`);
							history.go(-1)
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

	console.log(mode)

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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Pincode' : `Edit Pincode`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={()=>history.push(`${APP_PREFIX_PATH}/states`)}>Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' && tabKey==='1' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs activeKey={tabKey} onChange={(key)=>setTabKey(key)} style={{ marginTop: 30 }}>
						<TabPane tab="General" key="1">
							<GeneralField loading={isLoading} />
						</TabPane>
					</Tabs>

				</div>
			</Form>
		</>
	)
}

export default StateForm
