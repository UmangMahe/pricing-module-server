import { Button, Card, Input, Select, Table } from "antd";
import React, { useState, useEffect } from "react";
import Flex from "../../../../../components/shared-components/Flex";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Utils from "../../../../../utils";

const { Option } = Select;

const TableCard = ({
  tableData = [],
  tableColumns = [],
  loadingDone,
  leftHeaderRender = {},
  rightHeaderRender = {},
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (tableData?.length) setList(tableData);

    return () => setList([]);
  }, [tableData]);

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : tableData;
    const data = Utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  return (
    <Card>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="mb-4"
      >
        <Flex mobileFlex={false}>
          <div className="mr-md-3 mb-md-0 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-md-0 mb-3">{leftHeaderRender}</div>
        </Flex>
        <div>{rightHeaderRender}</div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          loading={!loadingDone}
          rowKey="_id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
    </Card>
  );
};

export default TableCard;
