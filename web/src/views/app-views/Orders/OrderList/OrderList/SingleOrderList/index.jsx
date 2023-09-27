import React, { useEffect, useState } from "react";
import $ from "jquery";
import PageHeaderAlt from '@components/layout-components/PageHeaderAlt'

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
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import utils from "@utils";
import { useAxios, useAxiosCallback } from "@utils/useFetch";
import { CATEGORY_LIST, ORDER_LIST } from "@constants/ApiConstants";
import Utils from "@utils";
import { DATE_FORMAT_DD_MM_YYYY } from "@constants/DateConstant";
import moment from "moment";
import { APP_PREFIX_PATH } from "@configs/AppConfig";
import PageHeader from "../../../../../../components/layout-components/PageHeader";
import { PRODUCT_LIST } from "@constants/ApiConstants";
const { Option } = Select;

const OrderList = ({ match, ...props }) => {
  let history = useHistory();
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) <Redirect to={`${APP_PREFIX_PATH}/orders`} />;
  }, [id]);

  const { data: products, loadingDone: loadingDoneProducts } = useAxios(
    {
      method: "GET",
      url: PRODUCT_LIST,
    },
    "products"
  );

  const { data: orders, loadingDone } = useAxios(
    {
      method: "GET",
      url: `${ORDER_LIST}/${id}`,
    },
    function (res) {
      setList(res.order.order_details);
      console.log(res.order.order_details);
      return res.order.order_details;
    }
  );

  const getOrderStatus = (status) => {
    if (status === "dispatch") {
      return "blue";
    } else if (status === "pending") {
      return "yellow";
    } else if (status === "delivered") {
      return "cyan";
    }
    return "lime";
  };

  
  const [orderId, setOrderId] = useState(null);

  const { isLoading, callback: OrderStatus } = useAxiosCallback();

  const changeOrderStatus = (elm) => {
    setVisible(true);
    setOrderId(elm.id);
  };

  const handleOrderStatusChange = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append("order_details_id", orderId);
      for (var key in values) {
        formData.append(key, values[key]);
      }
      OrderStatus({
        method: "POST",
        url: `${ORDER_LIST}`,
        data: formData,
        success: (res) => {
          message.success(
            `Update Order Status to ${utils.capitalizeFirstLetter(
              res.order_details.status
            )}`
          );
          setVisible(false);
          utils.updateTableWithId(list, res.order_details, setList, 'id')
        },
      });
    });
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

  const extraTableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Extra Name",
      dataIndex: "extra_name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "extra_name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
    },
  ];

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Product",
      dataIndex: "product_id",
      render: (product_id) => (
        <>{products?.filter((item) => item.id === product_id)[0].name}</>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "product_id"),
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
      title: "Price",
      dataIndex: "price",
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
      sorter: (a, b) => utils.antdTableSorter(a, b, "is_paid"),
    },

    {
      title: "Custom Total",
      dataIndex: "custom_total",
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
      title: "Total",
      dataIndex: "total_amount",
      render: (amount) => (
        <strong>
          <NumberFormat
            displayType={"text"}
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            prefix={"₹"}
            thousandSeparator={true}
          />
        </strong>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
    },

    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
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

  const handleShowProducts = (value) => {
    if (value !== "All") {
      const key = "product_id";
      const data = utils.filterArray(orders, key, value);
      setList(data);
    } else {
      setList(orders);
    }
  };

  

  return (
    <>
    <PageHeader display={true} title={'Order Details'} />
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
              <Select
							defaultValue="All"
							className="w-100"
							style={{ minWidth: 180 }}
							onChange={handleShowProducts}
							placeholder="Products"
							loading={!loadingDone}
						>
							<Option value="All">All</Option>
							{
								products?.filter((product)=>orders?.map((item)=>item.product_id).includes(product.id)).map(elm => (
									<Option key={elm.id} value={elm.id}>{elm.name}</Option>
								))
							}
						</Select>
            </div>
          </Flex>
          
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={[...list]}
            loading={!loadingDone}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: "checkbox",
              preserveSelectedRowKeys: false,
              ...rowSelection,
            }}
            expandable={{
              expandedRowRender: ({ extra }) => (
                <Table
                  columns={extraTableColumns}
                  dataSource={extra}
                  loading={!loadingDoneProducts}
                  rowKey="id"
                  size="small"
                />
              ),
            }}
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
                <Select.Option value="preparing">Preparing</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default OrderList;
