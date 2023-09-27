import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, notification, Tag } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from '@components/shared-components/AvatarStatus';
import EllipsisDropdown from '@components/shared-components/EllipsisDropdown';
import Flex from '@components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from '@utils'
import { useAxios } from '@utils/useFetch';
import { CATEGORY_LIST, STATE_LIST } from '@constants/ApiConstants';
import Utils from '@utils';

const { Option } = Select

const StateList = ({match, ...props}) => {
	
	let history = useHistory();
	const [list, setList] = useState([])
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const { data: states, loadingDone } = useAxios({
		method: 'GET',
		url: STATE_LIST,

	}, function(res){
		setList(res.states)
		return res.states
	})
	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => editDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Edit State</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const addState = () => {
		history.push(`${match.url}/add-state`)
	}

	const editDetails = row => {
		history.push(`${match.url}/${row.id}`)
	}

	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if (selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				setList(data)
				setSelectedRows([])
				
			})
			notification.success({
				message: 'States Removed',
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			setList(data)
			notification.success({
				message: 'State Removed',
			})
		}
	}



	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'State',
			dataIndex: 'name',
			// render: (_, record) => (
			// 	<div className="d-flex">
			// 		<AvatarStatus size={60} type="square" src={Utils.getImgUrl(record.icon)} name={record.name} />
			// 	</div>
			// ),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Status',
			dataIndex: 'is_active',
			render: (_, record) => (
				<><Tag color={Utils.getStatusColor(record.is_active)}>{record.is_active?"Active":"Inactive"}</Tag></>
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
		const searchArray = e.currentTarget.value ? list : states
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
					</div>
					
				</Flex>
				<div>
					<Button onClick={addState} type="primary" icon={<PlusCircleOutlined />} block>Add state</Button>
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
					onRow = {(list)=>{
						return{
							onClick: ()=>history.push(`${match.url}/${list.id}/cities`)
						}
					}}
					rowClassName="table-row-hover"
				/>
			</div>
		</Card>
	)
}

export default StateList
