import React, { useEffect, useState, useRef } from "react";

import {
  Avatar,
  Divider,
  Input,
  Form,
  Button,
  Menu,
  Popover,
  Select,
  Tabs,
  InputNumber,
  Row,
  Col,
} from "antd";
import {
  FileOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  PlusOutlined,
  AudioMutedOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Utils from "@utils";
import { Scrollbars } from "react-custom-scrollbars";
import Flex from "@components/shared-components/Flex";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import { useAxios, useAxiosCallback } from "../../../utils/useFetch";
import { MESSAGES, PRODUCT_LIST } from "../../../constants/ApiConstants";
import Loading from "../../../components/shared-components/Loading";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./css/style.scss";

import { io } from "socket.io-client";
import { env } from "../../../configs/EnvironmentConfig";
import {
  setArrivalMessage,
  setSingleUnreadMessages,
} from "../../../redux/actions/Socket";

// const socket = io(`${env.SOCKET_URL}`);

const { Option } = Select;

const menu = () => (
  <Menu>
    <Menu.Item key="0">
      <UserOutlined />
      <span>User Info</span>
    </Menu.Item>
    <Menu.Item key="1">
      <AudioMutedOutlined />
      <span>Mute Chat</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <DeleteOutlined />
      <span>Delete Chat</span>
    </Menu.Item>
  </Menu>
);

const Conversation = (props) => {
  const formRef = useRef();
  let chatBodyRef = useRef(null);

  const [info, setInfo] = useState({});
  const [msgList, setMsgList] = useState([]);

  const { chat_user } = useSelector((state) => state.auth);
  const { socket, arrivalMessage } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const { loadingDone, callback: getMessages } = useAxiosCallback();

  const getConversation = (currentId) => {
    getMessages({
      method: "GET",
      url: `${MESSAGES}/${currentId}`,
      strategy: "chat",
      success: (res) => {
        console.log(res, "-------------------");
        setInfo(res);
        setMsgList(res.messages);
      },
    });
  };

  const { callback: setMessageToSeen } = useAxiosCallback();

  useEffect(() => {
    if (
      arrivalMessage &&
      info?.conversation?.members.includes(arrivalMessage.sender)
    ) {
      setMsgList((messages) => [...messages, arrivalMessage]);

      setMessageToSeen({
        method: "PATCH",
        url: `${MESSAGES}/${arrivalMessage?._id}`,
        strategy: "chat",
      });
    }

    return () => {
      dispatch(setArrivalMessage(null));
    };
  }, [arrivalMessage, info, dispatch]);

  function getConversationId() {
    const { id } = props.match.params;
    return id;
  }

  useEffect(() => {
    getConversation(getConversationId());

    return () => {
      setInfo({});
      setMsgList([]);
    };
  }, [props.match.params]);

  useEffect(() => {
    chatBodyRef?.current?.scrollToBottom({ behavior: "smooth" });
  });

  const getMsgType = (obj) => {
    switch (obj.msgType) {
      case "text":
        return <span>{obj.text}</span>;
      case "image":
        return <img src={obj.text} alt={obj.text} />;
      case "file":
        return (
          <Flex alignItems="center" className="msg-file">
            <FileOutlined className="font-size-md" />
            <span className="ml-2 font-weight-semibold text-link pointer">
              <u>{obj.text}</u>
            </span>
          </Flex>
        );
      default:
        return null;
    }
  };

  const { isLoading, callback: sendMessage } = useAxiosCallback();

  const getMessageType = (msg) => {
    if (typeof msg === "string") return msg;
    else {
      return JSON.stringify(msg);
    }
  };

  const getType = (type) => {
    switch (type) {
      case "text":
        return "text";
      case "image":
        return "image";
      case "button":
        return "button";
      default:
        return "text";
    }
  };

  const onSend = (values) => {
    if (values.newMsg) {
      const newMsgData = {
        conversationId: getConversationId(),
        type: getType(values.type),
        sender: chat_user._id,
        message: getMessageType(values.newMsg),
      };

      setMsgList([...msgList, newMsgData]);

      formRef.current.setFieldsValue({
        newMsg: "",
      });

      sendMessage({
        method: "post",
        url: MESSAGES,
        strategy: "chat",
        data: newMsgData,
        success: (res) => {
          setMsgList([...msgList, res.data]);

          const receiverId = info.conversation.members.find(
            (member) => member !== chat_user._id
          );

          socket.emit("sendMessage", {
            id: res.data._id,
            senderId: res.data.sender,
            receiverId,
            convId: getConversationId(),
            type: res.data.type,
            message: res.data.message,
          });
        },
      });
    }
  };

  const emptyClick = (e) => {
    e.preventDefault();
  };

  const getCurrentUser = (members) => {
    return members.find((member) => member.id === chat_user.id);
  };

  const chatContentHeader = (members) => (
    <div className="chat-content-header">
      <h4 className="mb-0">{getCurrentUser(members).name}</h4>
      <div>
        <EllipsisDropdown menu={menu} />
      </div>
    </div>
  );

  const chatContentBody = (props, id) => (
    <div className="chat-content-body">
      <Scrollbars ref={chatBodyRef} autoHide>
        <div className="px-4">
          {props.map((elm, i) => (
            <div
              key={`msg-${id}-${i}`}
              className={`msg ${elm?.msgType === "date" ? "datetime" : ""} ${
                elm.sender === chat_user._id ? "msg-sent" : "msg-recipient"
              }`}
            >
              {/* {elm?.avatar ? (
              <div className="mr-2">
                <Avatar src={elm.avatar} />
              </div>
            ) : <AvatarStatus src={Utils.getAvatar(user?.name)} name={user?.name}  />} */}
              {elm.message ? (
                <div className={`bubble`}>
                  <div className="bubble-wrapper">
                    {elm.type === "button" ? (
                      <span>Order sent to user</span>
                    ) : (
                      elm.message
                    )}

                    {elm.sender === chat_user._id && (
                      <span className="msg-status">
                        {!elm?.sent ? (
                          <span className="fa-regular fa-clock " />
                        ) : (
                          <span className="fa-solid fa-check-double" />
                        )}
                      </span>
                    )}
                  </div>

                  <div
                    className={
                      elm.sender === chat_user._id ? `text-right` : "text-left"
                    }
                    style={{ fontSize: "0.8em" }}
                  >
                    {elm.seen && elm.sender === chat_user._id ? (
                      <span className="mr-1">Seen</span>
                    ) : null}
                    {Utils.getIfDateOld(elm.createdAt, 0.2)
                      ? moment(elm.createdAt).fromNow()
                      : moment(elm.createdAt).format("hh:mm A")}
                  </div>
                </div>
              ) : null}
              {/* <Divider>{elm.createdAt}</Divider> */}
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );

  const [formOrder] = Form.useForm();

  const onPlaceOrder = (values) => {
    console.log(values);
    const { extras, product_ids } = values;
    let newExtra = [];
    if (extras) {
      product_ids.forEach((product_id, i) => {
        Object.values(extras[i])?.map((extra) => {
          return (extra.product_id = product_id);
        });

        newExtra.push(...Object.values(extras[i]));
      });
    }

    const newValues = {
      type: "button",
      newMsg: {
        product_ids: product_ids,
        extras: newExtra,
      },
    };

    onSend(newValues);
  };

  const { data: products, isLoading: productLoading } = useAxios(
    {
      method: "get",
      url: PRODUCT_LIST,
    },
    "products"
  );

  const extraTemplate = {
    name: "",
    price: "",
    product_id: "",
    key: 1,
  };

  const paneTemplate = {
    title: "New Order",
    extras: [],
  };

  const [panes, setPanes] = useState([{ ...paneTemplate, ...{ key: 1 } }]);

  const [activeKey, setActiveKey] = useState(panes[0].key);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const add = () => {
    const activeKey = `newTab${Date.now()}`;
    setPanes((prevState) => [
      ...prevState,
      { ...paneTemplate, ...{ key: activeKey } },
    ]);
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      remove(targetKey);
    }
    if (action === "add") {
      add(targetKey);
    }
  };

  const remove = (targetKey) => {
    console.log(panes);
    let lastIndex;
    panes.forEach((pane, index) => {
      if (pane.key === targetKey) {
        lastIndex = index - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length) {
      if (activeKey === targetKey) {
        if (lastIndex >= 0) {
          setActiveKey(newPanes[lastIndex].key);
        } else setActiveKey(newPanes[0].key);
      }
      setPanes(newPanes);
    }
  };

  const removeExtra = (paneKey, extraIndex) => {
    let newPanes = [...panes];
    const foundPane = newPanes.find((pane) => pane.key === paneKey);
    if (foundPane) {
      foundPane.extras.splice(extraIndex, 1);
      setPanes(newPanes);
    }
  };

  const [productId, setProductId] = useState(0);

  const onSelectProduct = (paneKey, product) => {
    let newPanes = [...panes];
    const foundPane = newPanes.find((pane) => pane.key === paneKey);
    if (foundPane) {
      foundPane.extras.map((extra) => (extra.product_id = product));
      setPanes(newPanes);
    }
  };

  const addExtra = (key) => {
    const extraKey = `newTab${Date.now()}`;
    const newPanes = [...panes];
    const foundPane = newPanes.find((pane) => pane.key === key);
    foundPane.extras.push({ ...extraTemplate, ...{ key: extraKey } });
    setPanes(newPanes);
  };

  const placeOrderContent = () => {
    return (
      <div className="text-center">
        <h4 className="mt-2 mb-4">Order Details</h4>
        <Form
          form={formOrder}
          onFinish={onPlaceOrder}
          className="mx-auto"
          style={{ height: "auto", maxHeight: "450px", overflowY: "auto" }}
        >
          <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
          >
            {panes.length > 0 &&
              panes.map((pane, index) => (
                <Tabs.TabPane tab={pane.title} key={pane.key}>
                  <Form.Item name={[`product_ids`, index]} className="mb-2">
                    <Select
                      showSearch
                      loading={productLoading}
                      placeholder="Choose Product"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      size="small"
                      onChange={(values) => onSelectProduct(pane.key, values)}
                    >
                      {products?.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {pane.extras.map((extra, i) => (
                    <Row
                      gutter={8}
                      align="middle"
                      key={extra.key}
                      className="mb-2"
                    >
                      <Col span={13}>
                        <Form.Item
                          name={[`extras`, `${index}`, `${i}`, `name`]}
                          labelCol={6}
                          initialValue={""}
                          className="mb-0"
                        >
                          <Input
                            size="small"
                            placeholder="Extra name"
                            className="p-2"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[`extras`, `${index}`, `${i}`, `price`]}
                          className="mb-0"
                          initialValue={0}
                        >
                          <InputNumber
                            className="w-100"
                            defaultValue={0}
                            formatter={(value) =>
                              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <DeleteOutlined
                          onClick={() => removeExtra(pane.key, i)}
                        />
                      </Col>
                    </Row>
                  ))}

                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => addExtra(pane.key)}
                  >
                    Add Extra
                  </Button>
                </Tabs.TabPane>
              ))}
          </Tabs>
          <Form.Item>
            <Row className="mb-2 mt-3">
              <Col span={6}>
                <Button
                  type="primary"
                  size="small"
                  icon={<SendOutlined />}
                  htmlType="submit"
                >
                  Place Order
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const chatContentFooter = () => (
    <div className="chat-content-footer">
      <Form ref={formRef} name="msgInput" onFinish={onSend} className="w-100">
        <Form.Item name="newMsg" className="mb-0">
          <Input
            autoComplete="off"
            placeholder="Type a message..."
            suffix={
              <div className="d-flex align-items-center">
                {/* <a
                  href="/#"
                  className="text-dark font-size-lg mr-3"
                  onClick={emptyClick}
                >
                  <SmileOutlined />
                </a> */}
                <Popover
                  overlayStyle={{ minWidth: "24vw", maxWidth: "50vw" }}
                  placement="topRight"
                  overlayInnerStyle={{ padding: "0 20px" }}
                  content={placeOrderContent}
                  trigger={"click"}
                  arrowPointAtCenter
                >
                  <a href="/#" className="text-dark font-size-lg mr-3">
                    <PaperClipOutlined />
                  </a>
                </Popover>

                <Button
                  shape="circle"
                  type="primary"
                  size="small"
                  icon={<SendOutlined />}
                  onClick={onSend}
                  htmlType="submit"
                />
              </div>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );

  const { id } = props.match.params;

  return (
    <div className="chat-content">
      {loadingDone ? (
        <>
          {chatContentHeader(info.members)}
          {chatContentBody(msgList, id)}
          {chatContentFooter()}
        </>
      ) : (
        <Loading cover="content" />
      )}
    </div>
  );
};

export default Conversation;
