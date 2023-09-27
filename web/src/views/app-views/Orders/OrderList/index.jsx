import React, { useState } from "react";
import $ from 'jquery'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Badge,
  Menu,
  notification,
  Tag,
  Modal,
  Form,
  message,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AvatarStatus from "@components/shared-components/AvatarStatus";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { Link, useHistory } from "react-router-dom";
import utils from "@utils";
import { useAxios, useAxiosCallback } from "@utils/useFetch";
import { CATEGORY_LIST, ORDER_LIST } from "@constants/ApiConstants";
import Utils from "@utils";
import { DATE_FORMAT_DD_MM_YYYY } from "../../../../constants/DateConstant";
import moment from "moment";
import PageHeader from "../../../../components/layout-components/PageHeader";
const { Option } = Select;


const OrderList = ({ match, ...props }) => {
  let history = useHistory();
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { data: orders, loadingDone } = useAxios(
    {
      method: "GET",
      url: ORDER_LIST,
    },
    function (res) {
      setList(res.orders);
      return res.orders;
    }
  );

  const getOrderStatus = (status) => {
    if (status === "dispatch") {
      return "blue";
    } else if (status === "pending") {
      return "yellow";
    }
    else if (status === "delivered") {
      return "cyan";
    }
    else {
      return "red";
    }
  };

  const getPaymentStatus = (status) => {
    if (status === 0) {
      return "warning";
    } else {
      return "success";
    }
  };

  const [orderId, setOrderId] = useState(null)

  const {isLoading, callback: OrderStatus } = useAxiosCallback();

  const changeOrderStatus = (elm) => {
    setVisible(true);
	  setOrderId(elm.id)
  };

  const handleOrderStatusChange = (a, b) => {
	form.validateFields().then((values)=>{
		const formData = new FormData()
		formData.append('_method', 'patch')
		for(var key in values){
			formData.append(key, values[key])
		}
		OrderStatus({
			method: 'POST',
			url: `${ORDER_LIST}/${orderId}`,
			data: formData,
			success: (res)=>{
				message.success(`Order status updated to ${utils.capitalizeFirstLetter(res.order.status)}`)
				setVisible(false)
				utils.updateTableWithId(list, res.order, setList, 'id')
			}
		})
	})
  };
  const dropdownMenu = (row) => (
    <Menu>
     
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => changeOrderStatus(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Change Order Status</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

 

  const deleteRow = (row) => {
    const objKey = "id";
    let data = list;
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm.id);
        setList(data);
        setSelectedRows([]);
      });
      notification.success({
        message: "Products Removed",
      });
    } else {
      data = utils.deleteArrayRow(data, objKey, row.id);
      setList(data);
      notification.success({
        message: "Product Removed",
      });
    }
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
	  
    },
    {
      title: "Products",
      dataIndex: "total_products",
      render: (_, record) => (
        <><Tag color={'cyan'}>{record.total_products}</Tag> </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (date) => (
        <span>{moment.unix(date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "created_at"),
    },
    {
      title: "Order status",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag color={getOrderStatus(status)}>
            {utils.capitalizeFirstLetter(status)}
          </Tag>
        </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
    },

    {
      title: "Payment Status",
      dataIndex: "is_paid",
      render: (is_paid) => (
        <>
          <Badge status={getPaymentStatus(is_paid)} />
          <span>{is_paid === 1 ? "Paid" : "Not Paid"}</span>
        </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "is_paid"),
    },

    {
      title: "Total",
      dataIndex: "amount",
      render: (amount) => (
        <div>
          <NumberFormat
            displayType={"text"}
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            prefix={"₹"}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
    },
    
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right" onClick={(e)=>e.stopPropagation()}>
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : orders;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);


  return (
	  
	  
	  
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-3">
            {/* <Select
							defaultValue="All"
							className="w-100"
							style={{ minWidth: 180 }}
							onChange={handleShowCategory}
							placeholder="Category"
							loading={!loadingDoneCategories}
						>
							<Option value="All">All</Option>
							{
								categories?.map(elm => (
									<Option key={elm.id} value={elm.id}>{elm.name}</Option>
								))
							}
						</Select> */}
          </div>
        </Flex>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          loading={!loadingDone}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
		  onRow={
			  (list) => {
				  return {
					  onClick: ()=>history.push(`${match.url}/${list.id}`)
				  }
			  }
		  }
		  
        />
      </div>
      <Modal
        title="Order Status Change"
        visible={visible}
        onOk={handleOrderStatusChange}
        confirmLoading={isLoading}
        onCancel={() => setVisible(false)}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="status" label="Status">
            <Select
              showSearch
              placeholder="Select Status"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="dispatch">Dispatch</Select.Option>
              <Select.Option value="delivered">Delivered</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
	
  );
};

export default OrderList;
