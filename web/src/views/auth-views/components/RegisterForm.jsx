import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, Row, Col, Select, Checkbox } from "antd";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
} from "@redux/actions/Auth";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";

const {Option} = Select;
const rules = {
  name: [
    {
      required: true,
      message: "Please input your name",
    },
  ],
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
  confirm: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

export const RegisterForm = (props) => {
  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    allowRedirect,
  } = props;
  const [form] = Form.useForm();
  let history = useHistory();

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {

		const {f_name, l_name, phone, countryCode, confirm, ...restFields} = values;
		
		showLoading();

		const updatedFields = {
			...restFields,
			name: f_name.concat(" ",l_name),
			phone: countryCode.concat(phone),
		}
        signUp(updatedFields);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={"f_name"}
              label="First Name"
              rules={rules.name}
              hasFeedback
            >
              <Input prefix={<UserOutlined className="text-primary" />} />
            </Form.Item>
          </Col>
		  <Col span={12}>
            <Form.Item
              name={"l_name"}
              label="Last Name"
            >
              <Input prefix={<UserOutlined className="text-primary" />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={rules.email}
              hasFeedback
            >
              <Input prefix={<MailOutlined className="text-primary" />} />
            </Form.Item>
          </Col>
		  <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
            >
              <Input maxLength={10} addonBefore={
				<Form.Item name="countryCode" initialValue={'91'} noStyle>
				<Select
				showSearch
				
				  style={{
					width: 70,
				  }}
				>
				  <Option value="91">+91</Option>
				  <Option value="1">+1</Option>
				</Select>
			  </Form.Item>
			  } prefix={<PhoneOutlined className="text-primary" />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={rules.password}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-primary" />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              rules={rules.confirm}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-primary" />}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name={"agreement"}
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                }
              ]}

            >
              <Checkbox>
                I have read the <Link to="">Terms and Conditions</Link>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item className="text-center mt-4">
          <Button
            className="w-25"
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
