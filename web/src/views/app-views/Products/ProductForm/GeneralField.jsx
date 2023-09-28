import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
  Checkbox,
  Button,
  Space,
} from "antd";
import { ImageSvg } from "@assets/svg/icon";
import CustomIcon from "@components/util-components/CustomIcon";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Please enter Configuration name",
    },
  ],

  price: [
    {
      required: true,
      message: "Please enter Configuration price",
    },
  ],
};

const dbpDefaults = [
  {
    id: 1,
    day: "Monday",
  },
  {
    id: 2,
    day: "Tuesday",
  },
  {
    id: 3,
    day: "Wednesday",
  },
  {
    id: 4,
    day: "Thursday",
  },
  {
    id: 5,
    day: "Friday",
  },
  {
    id: 6,
    day: "Saturday",
  },
  {
    id: 7,
    day: "Sunday",
  },
];

const options = [
  { label: "Until", value: "until" },
  { label: "After", value: "after" },
];

const GeneralField = ({ form }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={14}>
        <Card title="Basic Info">
          <Form.Item
            className="mt-md-2"
            name="name"
            label="Configuration Name"
            rules={rules.name}
          >
            <Input placeholder="Configuration Name" />
          </Form.Item>
        </Card>
        <Card title="Distance Base Price (DBP)">
          <Form.Item label="DBP" required>
            <Row className="mt-2">
              {dbpDefaults.map((item, index) => (
                <Col key={item.id} xs={24} sm={24} md={24}>
                  <Row gutter={8}>
                    <Form.Item hidden name={["dbp", item.id, "_id"]} />
                    <Col className="mr-md-2" xs={24} sm={24} md={5}>
                      <Form.Item
                        // noStyle
                        valuePropName="name"
                      >
                        <Input placeholder={item.day} disabled></Input>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7}>
                      <Form.Item
                        name={["dbp", item.id, `price`]}
                        rules={[
                          { required: true, message: "Price is required" },
                        ]}
                      >
                        <InputNumber
                          prefix={<div className="mr-2">₹</div>}
                          min={1}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          className="w-100"
                          placeholder="Price (in ₹)"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={9}>
                      <Form.Item
                        name={["dbp", item.id, `uptoKms`]}
                        rules={[
                          { required: true, message: "Distance is required" },
                        ]}
                      >
                        <InputNumber
                          addonAfter="Kms"
                          className="w-100"
                          min={0}
                          step={0.1}
                          placeholder="Upto (in Kms)"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={10}>
        <Card title="Distance Additional Price (DAP)">
          <Row className="mt-md-2" gutter={16}>
            <Col xs={24} sm={24} md={11}>
              <Form.Item hidden name={["dap", "_id"]} />
              <Form.Item
                name={["dap", `price`]}
                label="Price"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber
                  prefix={<div className="mr-2">₹</div>}
                  min={1}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  addonAfter="per Km"
                  className="w-100"
                  placeholder="Price (in ₹)"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={13}>
              <Form.Item
                name={["dap", `afterKms`]}
                label="After Kms"
                rules={[{ required: true, message: "Distance is required" }]}
              >
                <InputNumber
                  addonAfter="Kms"
                  className="w-100"
                  min={0}
                  step={0.1}
                  placeholder="After distance (in Kms)"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Time Multiplier Factor(TMF)">
          <Row className="mt-md-2">
            <Col xs={24} sm={24} md={24}>
              <Form.List
                name={"tmp"}
                rules={[
                  {
                    validator: async (_, tmp) => {
                      if (!tmp || tmp.length < 1) {
                        return Promise.reject(new Error("At least 1 rule"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <>
                        <Row key={key} gutter={16} align="">
                          <Col xs={24} sm={24} md={6}>
                            <Form.Item
                              {...restField}
                              label="Multiplier"
                              name={[name, "multiplier"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing multiplier",
                                },
                              ]}
                            >
                              <InputNumber
                                addonAfter="x"
                                className="w-100"
                                min={1}
                                placeholder="E.g - 1x"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={9}>
                            <Form.Item
                              {...restField}
                              label="Condition"
                              name={[name, "condition"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing condition",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Condition"
                                options={options}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={7}>
                            <Form.Item
                              {...restField}
                              label="Time (in hrs)"
                              name={[name, "perTime"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing time",
                                },
                              ]}
                            >
                              <InputNumber
                                addonAfter="hr(s)"
                                min={0}
                                step={0.1}
                                placeholder="Hours"
                              />
                            </Form.Item>
                          </Col>
                          {fields.length > 1 ? (
                            <Col xs={24} sm={24} md={2}>
                              <Button
                                type="text"
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                              />
                            </Col>
                          ) : null}
                        </Row>
                      </>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add rule
                      </Button>
                    </Form.Item>
                    <Form.ErrorList errors={errors} />
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Card>
        <Card title="Waiting Charges (WC)">
          <Row className="mt-md-2" gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item hidden name={["wc", "_id"]} />
              <Form.Item
                name={["wc", `initialWaitTime`]}
                label="Initial Wait Time"
                rules={[{ required: true, message: "Time is required" }]}
              >
                <InputNumber
                  addonAfter="minute(s)"
                  className="w-100"
                  min={0}
                  placeholder="Time (in minute(s))"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11}>
              <Form.Item
                name={["wc", `price`]}
                label="Price"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber
                  prefix={<div className="mr-2">₹</div>}
                  min={1}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  className="w-100"
                  placeholder="Price (in ₹)"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={13}>
              <Form.Item
                name={["wc", `perWaitTime`]}
                label="Per Wait Time"
                rules={[{ required: true, message: "Time is required" }]}
              >
                <InputNumber
                  addonAfter="minute(s)"
                  className="w-100"
                  min={0}
                  placeholder="Time (in minute(s))"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
