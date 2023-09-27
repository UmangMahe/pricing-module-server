/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';
import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from '@components/shared-components/AvatarStatus';
import EllipsisDropdown from '@components/shared-components/EllipsisDropdown';
import Flex from '@components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY } from '@constants/DateConstant'
import utils from '@utils'
import Utils from '@utils';
import { useAxios } from '@utils/useFetch';
import { CATEGORY_LIST } from '@constants/ApiConstants';
import { useHistory } from 'react-router-dom';

const { Option } = Select

const getPaymentStatus = status => {
	if(status === 'Paid') {
		return 'success'
	}
	if(status === 'Pending') {
		return 'warning'
	}
	if(status === 'Expired') {
		return 'error'
	}
	return ''
}

const getShippingStatus = status => {
	if(status === 1) {
		return 'blue'
	}
	if(status === 0) {
		return 'cyan'
	}
	return ''
}

const paymentStatusList = ['Paid', 'Pending', 'Expired']

const CategoryList = ({match, ...props}) => {

	let history = useHistory();
	const [list, setList] = useState([])
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'paymentStatus'
			const data = utils.filterArray(categories, key, value)
			setList(data)
		} else {
			setList(categories)
		}
	}

	const {data: categories, loadingDone: loadingDoneCategories} = useAxios({
		method: 'GET',
		url: CATEGORY_LIST,
	},function(res){
		setList(res.categories)
		return res.categories
	})

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => editDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Edit Details</span>
				</Flex>
			</Menu.Item>
			{/* <Menu.Item>
				<Flex alignItems="center">
					<PlusCircleOutlined />
					<span className="ml-2">Add to remark</span>
				</Flex>
			</Menu.Item> */}
		</Menu>
	);

	const editDetails = row => {
		history.push(`${match.url}/${row.id}`)
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Category',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={30} src={Utils.getImgUrl(record.icon)} name={record.name}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Description',
			dataIndex: 'description',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'description')
		},
		{
			title: 'Status',
			dataIndex: 'is_active',
			render: (_, record) => (
				<><Tag color={getShippingStatus(record.is_active)}>{record.is_active?"Active":"Inactive"}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'is_active')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
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
		const searchArray = e.currentTarget.value? list : categories
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const addCategory = () => {
		history.push(`${match.url}/add-category`)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					{/* <div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowStatus} 
							placeholder="Status"
						>
							<Option value="All">All Categories </Option>
							{paymentStatusList.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select>
					</div> */}
				</Flex>
				<div>
				<Button onClick={addCategory} type="primary" icon={<PlusCircleOutlined />} block>Add category</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					loading={!loadingDoneCategories}
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

export default CategoryList
