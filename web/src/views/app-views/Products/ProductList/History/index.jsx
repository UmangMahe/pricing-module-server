import React from "react";
import { useAxios } from "../../../../../utils/useFetch";
import { GET_LOGS } from "../../../../../constants/ApiConstants";
import { Col, Divider, Row, Spin } from "antd";
import Flex from "../../../../../components/shared-components/Flex";
import moment from "moment";
import { DATE_FORMAT_DD_MM_YYYY_WITH_SLASH } from "../../../../../constants/DateConstant";

function Logs({ data }) {
  const { data: logs, isLoading: logsLoading } = useAxios(
    {
      method: "GET",
      url: `${GET_LOGS}/${data}`,
    },
    "data"
  );

  return (
    <>
      {logsLoading && !logs ? (
        <div className="text-center">
          <Spin spinning={logsLoading} />
        </div>
      ) : (
        <>
          
          <Row justify="space-between" align="center">
            <Col span={8}>
              <h4 className="">Timestamp</h4>
            </Col>
            <Col span={8}>
              <h4 className="text-center">Log</h4>
            </Col>
            <Col span={8}>
              <h4 className="text-right">Authored by</h4>
            </Col>
          </Row>

          <Divider className="mt-2 mb-3" />
          {logs.map((item) => (
            <>
              <Row className="mb-2" gutter={8} justify="center">
                <Col span={8}>
                  <div>
                    <p className="mb-0">
                      {moment(item.createdAt).format(
                        DATE_FORMAT_DD_MM_YYYY_WITH_SLASH
                      )}
                    </p>
                    <p className="mb-0" style={{ fontSize: "0.8em" }}>
                      {moment(item.createdAt).format("LTS")}
                    </p>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <p>{item.status}</p>
                  </div>
                </Col>
                <Col className="text-right" span={8}>
                  <p>{item.meta.name}</p>
                </Col>
              </Row>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default Logs;
