import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, notification, Tag, Switch  } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from '@components/shared-components/AvatarStatus';
import EllipsisDropdown from '@components/shared-components/EllipsisDropdown';
import Flex from '@components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory, useParams } from "react-router-dom";
import utils from '@utils'
import { useAxios } from '@utils/useFetch';
import { CATEGORY_LIST, STATE_LIST } from '@constants/ApiConstants';
import Utils from '@utils';
import PageHeader from "@components/layout-components/PageHeader";
import { useAxiosCallback } from '@utils/useFetch';
import { CITY_LIST } from '@constants/ApiConstants';
import { PINCODE_LIST } from '../../../../../../../constants/ApiConstants';
const { Option } = Select

const PincodeList = ({match, ...props}) => {
	
	let history = useHistory();
	const [list, setList] = useState([])
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const {cityId} = useParams()

	const { data: pincodes, loadingDone } = useAxios({
		method: 'GET',
		url: `${PINCODE_LIST}`,

	}, function(res){
        const getPincodes = res.pincodes.filter(item=>item.city_id === parseInt(cityId))
		setList(getPincodes)
		return getPincodes
	})

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => editDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Edit Pincode</span>
				</Flex>
			</Menu.Item>
			
		</Menu>
	);

	const addPincode = () => {
		console.log(match.url)
		history.push(`${match.url}/add-pincode`)
	}

	const editDetails = row => {
		history.push(`${match.url}/${row.id}`)
	}

	// const deleteRow = row => {
	// 	const objKey = 'id'
	// 	let data = list
	// 	if (selectedRows.length > 1) {
	// 		selectedRows.forEach(elm => {
	// 			data = utils.deleteArrayRow(data, objKey, elm.id)
	// 			setList(data)
	// 			setSelectedRows([])
				
	// 		})
	// 		notification.success({
	// 			message: 'Cities Removed',
	// 		})
	// 	} else {
	// 		data = utils.deleteArrayRow(data, objKey, row.id)
	// 		setList(data)
	// 		notification.success({
	// 			message: 'City Removed',
	// 		})
	// 	}
	// }

	const {isLoading, callback: setStatus} = useAxiosCallback()

	const handleStatus = (value, id)=>{
		setStatus({
			method: 'POST',
			url: `${PINCODE_LIST}/${id}`,
			data: {
				'_method': 'delete',
			},
			success: (res)=>{
				Utils.updateTableWithId(list, res.pincode, setList, 'id')
			}
		})
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Pincode',
			dataIndex: 'pincode',
			// render: (_, record) => (
			// 	<div className="d-flex">
			// 		<AvatarStatus size={60} type="square" src={Utils.getImgUrl(record.icon)} name={record.name} />
			// 	</div>
			// ),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'pincode')
		},
		{
			title: 'Delivery Charge (Day)',
			dataIndex: 'delivery_charge_day',
			render: (_, record) => (
				<span className='font-weight-bold'>{"₹ "}{record.delivery_charge_day}</span>
			),
		},
        {
			title: 'Delivery Charge (Night)',
			dataIndex: 'delivery_charge_night',
			render: (_, record) => (
				<span className='font-weight-bold'>{"₹ "}{record.delivery_charge_night}</span>
			),
		},
		{
			title: 'Status',
			dataIndex: 'is_active',
			render: (is_active, record) => (
				<><Switch size="small" loading={isLoading} checked={is_active?true:false} onChange={(value)=>handleStatus(value, record.id)}/></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'is_active')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right" onClick={(e)=>e.stopPropagation()}>
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : pincodes
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
	return (
		
		<Card loading={!loadingDone}>
			<PageHeader display={true} breadCrumb={false} title={"Pincode"} />
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
					</div>
					
				</Flex>
				<div>
					<Button onClick={addPincode} type="primary" icon={<PlusCircleOutlined />} block>Add Pincode</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					loading={!loadingDone}
					rowKey='id'
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
					
				/>
			</div>
		</Card>
	)
}

export default PincodeList
