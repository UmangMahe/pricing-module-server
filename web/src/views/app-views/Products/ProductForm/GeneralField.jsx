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
} from "antd";
import { ImageSvg } from "@assets/svg/icon";
import CustomIcon from "@components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";

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

const GeneralField = (props) => {
  const [categories, setCategories] = useState(null);

  const [subCategories, setSubCategories] = useState(null);

  const [newSubCategory, setNewSubCategories] = useState(null);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Configuration Name" rules={rules.name}>
            <Input placeholder="Configuration Name" />
          </Form.Item>
        </Card>
        <Card title="Distance Base Price (DBP)">
          <Form.Item label="DBP" required rules={rules.name}>
            <Row className="mt-2">
              {dbpDefaults.map((item, index) => (
                <Col key={item.id} xs={24} sm={24} md={17}>
                  <Input.Group>
                    <Row gutter={16}>
                      <Col className="mr-md-4" xs={24} sm={24} md={8}>
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
                      <Col xs={24} sm={24} md={6}>
                        <Form.Item
                          name={["dbp", item.id, `price`]}
                          // noStyle
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
                      <Col xs={24} sm={24} md={7}>
                        <Form.Item
                          name={["dbp", item.id, `uptoKms`]}
                          // noStyle
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
        <Card title="Distance Additional Price (DAP)">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={11}>
              <Form.Item
                name={["dap", `price`]}
                label="Price"
                rules={[{ required: true, message: "Street is required" }]}
              >
                <InputNumber
                  prefix={<div className="mr-2">₹</div>}
                  addonAfter="/ per Km"
                  className="w-100"
                  placeholder="Price (in ₹)"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11}>
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
            {/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="comparePrice" label="Compare price" rules={rules.comparePrice}>
							<InputNumber
								className="w-100"
								value={0}
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
            {/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="cost" label="Cost per item" rules={rules.cost}>
							<InputNumber
								className="w-100"
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
            {/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>
							<InputNumber
								className="w-100"
								min={0}
								max={100}
								formatter={value => `${value}%`}
								parser={value => value.replace('%', '')}
							/>
						</Form.Item>
					</Col> */}
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media"></Card>
        <Card title="Organization">
          <Form.Item name="category_id" label="Category">
            <Select className="w-100" placeholder="Category">
              {categories?.map((elm) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {newSubCategory && (
            <Form.Item name="sub_category_id" required label="Sub Category">
              <Select className="w-100" placeholder="Sub Category">
                {newSubCategory.map((elm) => (
                  <Option key={elm.id} value={elm.id}>
                    {elm.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* <Form.Item name="tags" label="Tags" >
				<Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
					{tags.map(elm => <Option key={elm}>{elm}</Option>)}
				</Select>
				</Form.Item> */}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
