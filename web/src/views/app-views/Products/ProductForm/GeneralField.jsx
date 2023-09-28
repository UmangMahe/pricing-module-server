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
  description: [
    {
      required: true,
      message: "Please enter Configuration description",
    },
  ],
  sort_description: [
    {
      required: true,
      message: "Please enter Configuration's short description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter Configuration price",
    },
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
};

const tags = [
  "Cotton",
  "Nike",
  "Sales",
  "Sports",
  "Outdoor",
  "Toys",
  "Hobbies",
];

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
  { label: 'Until', value: 'until' },
  { label: 'After', value: 'after' },
];

const GeneralField = ({form}) => {
  const [categories, setCategories] = useState(null);

  const [subCategories, setSubCategories] = useState(null);

  const [newSubCategory, setNewSubCategories] = useState(null);

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
          <Form.Item label="DBP" required rules={rules.name}>
            <Row className="mt-2">
              {dbpDefaults.map((item, index) => (
                <Col key={item.id} xs={24} sm={24} md={24}>
                  <Input.Group>
                    <Row gutter={8}>
                      <Col className="mr-md-2" xs={24} sm={24} md={5}>
                        <Form.Item
                          // noStyle
                          valuePropName="name"
                          rules={[
                            { required: true, message: "Province is required" },
                          ]}
                        >
                          <Input placeholder={item.day} disabled></Input>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={7}>
                        <Form.Item
                          name={["dbp", item.id, `price`]}
                          rules={[
                            { required: true, message: "Street is required" },
                          ]}
                        >
                          <InputNumber
                            prefix={<div className="mr-2">₹</div>}
                            className="w-100"
                            placeholder="Price (in ₹)"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={9}>
                        <Form.Item
                          name={["dbp", item.id, `uptoKms`]}
                          rules={[
                            { required: true, message: "Street is required" },
                          ]}
                        >
                          <InputNumber
                            addonAfter="Kms"
                            className="w-100"
                            placeholder="Upto (in Kms)"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Input.Group>
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
              <Form.Item
                name={["dap", `price`]}
                label="Price"
                rules={[{ required: true, message: "Street is required" }]}
              >
                <InputNumber
                  prefix={<div className="mr-2">₹</div>}
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
                rules={[{ required: true, message: "Street is required" }]}
              >
                <InputNumber
                  addonAfter="Kms"
                  className="w-100"
                  placeholder="After distance (in Kms)"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Time Multiplier Factor(TMF)">
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Form.List name={"tmp"}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <>
                        <Row key={key} gutter={16} align="">
                          <Col xs={24} sm={24} md={7}>
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
                                placeholder="E.g - 1x"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={7}>
                            <Form.Item
                              {...restField}
                              label="Condition"
                              name={[name, 'condition']}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing last name",
                                },
                              ]}
                            >
                              <Select placeholder="Condition" options={options} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={8}>
                            <Form.Item
                              {...restField}
                              label="Time (in hrs)"
                              name={[name, "perTime"]}
                              
                              rules={[
                                {
                                  required: true,
                                  message: "Missing last name",
                                },
                              ]}
                            >
                              <InputNumber addonAfter="hr(s)" placeholder="Hours" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={2}>
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                            />
                          </Col>
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
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
