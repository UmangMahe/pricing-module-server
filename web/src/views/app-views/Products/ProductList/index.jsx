import React, { useState } from "react";
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
  Spin,
  Tooltip,
  Modal,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  SnippetsOutlined,
  EditOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import AvatarStatus from "@components/shared-components/AvatarStatus";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { useHistory, Link } from "react-router-dom";
import utils from "@utils";
import { useAxios } from "@utils/useFetch";
import {
  GET_CONFIGS,
  GET_IN_USE_CONFIG,
  REMOVE_CONFIG,
  SET_DEFAULT_CONFIG,
  TOGGLE_CONFIG,
} from "../../../../constants/ApiConstants";
import TableCard from "./TableCard";
import DateRender from "../../components/data-entry/date-picker/DateRender";
import moment from "moment";
import { DATE_FORMAT_DD_MM_YYYY_WITH_SLASH } from "../../../../constants/DateConstant";
import { useAxiosCallback } from "../../../../utils/useFetch";
import Logs from "./Logs";

const { Option } = Select;

const ProductList = ({ match, ...props }) => {
  let history = useHistory();
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [logOpen, setLogOpen] = useState(false);

  const {
    data: configs,
    setData: setConfigs,
    loadingDone,
  } = useAxios(
    {
      method: "GET",
      url: GET_CONFIGS,
    },
    function (res) {
      setList(res.allConfigs);
      return res.allConfigs;
    }
  );

  const {
    data: inUseConfig,
    setData: setInUseConfig,
    loadingDone: inUseConfigloading,
  } = useAxios(
    {
      method: "GET",
      url: GET_IN_USE_CONFIG,
    },
    function (res) {
    //   setInUseConfig(res.data);
      return res.data;
    }
  );


  const { data: categories, loadingDone: loadingDoneCategories } = useAxios(
    {
      method: "GET",
      url: "",
    },
    "categories"
  );

  const dropdownMenu = (row) => (
    <Menu>
      
      <Menu.Item onClick={() => editDetails(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Modify Config</span>
        </Flex>
      </Menu.Item>
	  <Menu.Item onClick={() => setDefault(row)}>
        <Flex alignItems="center">
          <PushpinOutlined />
          <span className="ml-2">Use as Default</span>
        </Flex>
      </Menu.Item>
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
    </Menu>
  );

  const addConfig = () => {
    history.push(`${match.url}/add-config`);
  };

  const editDetails = (row) => {
    history.push(`${match.url}/${row._id}`);
  };

  const { loadingDone: deleteDone, callback: deleteConfig } =
    useAxiosCallback();

  const { callback: defaultConfig } = useAxiosCallback();

  const deleteRow = (row) => {
    const objKey = "_id";
    let data = list;
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        deleteConfig({
          method: "DELETE",
          url: REMOVE_CONFIG,
          params: {
            id: elm._id,
          },
          success: (res) => {
            if (res) {
              data = utils.deleteArrayRow(data, objKey, elm._id);
              setConfigs(data);
              setSelectedRows([]);
            }
          },
        });
      });
      deleteDone &&
        notification.success({
          message: "Configs Removed",
        });
    } else {
      deleteConfig({
        method: "DELETE",
        url: REMOVE_CONFIG,
        params: {
          id: row._id,
        },
        success: (res) => {
          if (res) {
            data = utils.deleteArrayRow(data, objKey, row._id);
            setConfigs(data);
            notification.success({
              message: res.message,
            });
          }
        },
      });
    }
  };

  const setDefault = (row) => {
    defaultConfig({
      method: "PATCH",
      url: SET_DEFAULT_CONFIG,
      params: {
        id: row._id,
      },
      success: (res) => {
        if (res) {
          notification.success({
            message: res.message,
          });
        }
      },
    });
  };

  const { callback: toggleConfiguration } = useAxiosCallback();

  const handleToggle = (id) => {
    toggleConfiguration({
      method: "PATCH",
      url: TOGGLE_CONFIG,
      params: {
        id,
      },
      success: (res) => {
        if (res) {
          utils.updateTableWithId(configs, res.data, setConfigs, "_id");
        }
      },
    });
  };

  const [modalId, setModalId] = useState(null);

  const handleLogsModal = (elm) => {
    setModalId(elm._id);
    setLogOpen(true);
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus icon={<SettingOutlined />} name={record?.name} />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Created By",
      dataIndex: "userId",
      render: (category_id) => {
        // return category_id?.name;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },

    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <div className="font-weight-bold">
          {moment(createdAt).format(
            DATE_FORMAT_DD_MM_YYYY_WITH_SLASH + " hh:mm A"
          )}
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdAt"),
    },

    {
      title: "Status",
      dataIndex: "disabled",
      render: (status, item) => (
        <>
          <Tag
            className="m-0 cursor-pointer position-relative"
            onClick={() => handleToggle(item._id)}
            icon={
              <Badge
                className="mr-2"
                status={`${!status ? "success" : "error"}`}
              />
            }
            color={`${!status ? "green" : "red"}`}
          >
            {!status ? "Enabled" : "Disabled"}
          </Tag>
        </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "disabled"),
    },

    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View logs">
            <Button
              onClick={() => handleLogsModal(elm)}
              shape="circle"
              icon={<SnippetsOutlined />}
            />
          </Tooltip>
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const handleShowCategory = (value) => {
    if (value !== "All") {
      const key = "category_id";
      const data = utils.filterArray(configs, key, value);
      setList(data);
    } else {
      setList(configs);
    }
  };

  return (
    <>
	<TableCard
        tableData={[inUseConfig]}
		tableName="In Use Configuration"
        tableColumns={tableColumns}
        loadingDone={inUseConfigloading}
		leftHeaderRender={<></>}
		pagination={false}
        rightHeaderRender={
         <></>
        }
		rowSelection={false}
		size="small"
      />
      <TableCard
        tableData={configs}
		tableName="All Configurations"
        tableColumns={tableColumns}
        loadingDone={loadingDone}
        leftHeaderRender={
          <Select
            defaultValue="All"
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={handleShowCategory}
            placeholder="Category"
            loading={!loadingDoneCategories}
          >
            <Option value="All">All</Option>
            {categories?.map((elm) => (
              <Option key={elm.id} value={elm.id}>
                {elm.name}
              </Option>
            ))}
          </Select>
        }
        rightHeaderRender={
          <Button
            onClick={addConfig}
            className="w-auto"
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Config
          </Button>
        }
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSelectedRows={setSelectedRows}
      />
      {modalId && (
        <Modal
          title="Logs"
          open={logOpen}
          destroyOnClose
          onOk={() => setLogOpen(false)}
          onCancel={() => setLogOpen(false)}
          centered
          cancelButtonProps={{
            style: { display: "none" },
          }}
          width={600}
          bodyStyle={{
            height: "calc(100vh - 200px)",
            overflowY: "auto",
          }}
        >
          <Logs data={modalId} />
        </Modal>
      )}
    </>
  );
};

export default ProductList;
