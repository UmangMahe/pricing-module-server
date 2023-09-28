import { Button, Card, Input, Radio, Select, Table } from "antd";
import React, { useState, useEffect } from "react";
import Flex from "../../../../../components/shared-components/Flex";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Utils from "../../../../../utils";
import PageHeaderAlt from "../../../../../components/layout-components/PageHeaderAlt";

const { Option } = Select;

const TableCard = ({
  tableData = [],
  size = "middle",
  tableName = "",
  tableColumns = [],
  loadingDone,
  leftHeaderRender = {},
  rightHeaderRender = {},
  selectedRowKeys,
  setSelectedRowKeys,
  setSelectedRows,
  pagination = true,
  ...props
}) => {
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
      <PageHeaderAlt
        style={{
          margin: 0,
          padding: "15px",
          marginTop: "-10px",
        }}
        className="border-bottom"
      >
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="m-0">{tableName}</h2>
            <Flex mobileFlex={false}>
              <div className="mr-md-3 mb-md-0 mb-3">
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={(e) => onSearch(e)}
                />
              </div>
              <div className="mb-md-0 mb-3">
                {leftHeaderRender ? leftHeaderRender : null}
              </div>
            </Flex>

            <div>{rightHeaderRender ? rightHeaderRender : null}</div>
          </Flex>
        </div>
      </PageHeaderAlt>

      <div className="table-responsive">
        <Table
        pagination={pagination}
          size={size}
          columns={tableColumns}
          dataSource={list}
          loading={!loadingDone}
          rowKey="_id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: true,
            ...rowSelection,
          }}
        />
      </div>
    </Card>
  );
};

export default TableCard;
