import React, { useState, useEffect } from "react";
import PageHeaderAlt from "@components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "@components/shared-components/Flex";
import GeneralField from "./GeneralField";
import ShippingField from "./ShippingField";
import { useAxiosCallback } from "@utils/useFetch";
import Utils from "@utils";
import { Redirect, useHistory } from "react-router-dom";

import { APP_PREFIX_PATH } from "../../../../configs/AppConfig";
import { PARTICULAR_CONFIG, UPDATE_CONFIG } from "../../../../constants/ApiConstants";
import Loading from "../../../../components/shared-components/Loading";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {

	console.log(props)
  const { mode = ADD, param, match } = props;

  const history = useHistory();
  const [form] = Form.useForm();
 
  const [submitLoading, setSubmitLoading] = useState(false);

  const [rule, setRule] = useState(null);

  const { isLoading, callback: getConfig } = useAxiosCallback();

  useEffect(() => {
    if (mode === EDIT) {
      console.log("is edit");
      console.log("props", props);
      const { id } = param;
      console.log("id", id);
      const produtId = parseInt(id);
      getConfig({
        method: "GET",
        url: `${PARTICULAR_CONFIG}/${id}`,
        success: async (res) => {
          console.log("res", res);
          const { data } = res;

          form.setFieldsValue({
            name: data.name,
            disabled: data.disabled,
            dap: data.dap,
            wc: data.wc,
          });

          let dbp = [];
          data.dbp.forEach((item) => {
            const { days, ...rest } = item;
            days.forEach((day) => {
              dbp[day] = rest;
            });
          });

		  console.log(dbp)

          let tmp = [];
          data.tmp.forEach((item) => {
            tmp.push(item);
          });

          form.setFieldsValue({
            dbp,
            tmp,
          });

          setRule(data);
        },
      });
    }
  }, [mode, form, param, props]);


  const { callback: addConfig } = useAxiosCallback();
  const { callback: updateConfig } = useAxiosCallback();

  const [tabKey, setTabKey] = useState("1");
  
  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        const { dbp } = values;

        let dbp2 = [];

        dbp
          .filter((i) => i)
          .map((item, index) => {
            const { price, uptoKms } = item;
            const sameforotherDay = dbp
              .filter((i) => i)
              .findIndex(
                (item) => item.price === price && item.uptoKms === uptoKms
              );
            if (!dbp2.length)
              dbp2.push({
                ...item,
                days: [sameforotherDay + 1],
              });
            else {
              if (dbp2[sameforotherDay])
                dbp2[sameforotherDay].days.push(index + 1);
              else
                dbp2[sameforotherDay] = {
                  ...item,
                  days: [sameforotherDay + 1],
                };
            }
          });

		  console.log(dbp2)
        values.dbp = dbp2
          .map((i) => {
            if (i._id === undefined) {
              delete i._id;
              return i;
            } else return i;
          })
          .filter((i) => i);

        setTimeout(() => {
          setSubmitLoading(false);

          if (mode === ADD) {
            addConfig({
              method: "PUT",
              url: PARTICULAR_CONFIG,
              data: values,
              success: (res) => {
                if (res) {
                  message.success(`Created ${values.name} to configuration list`);
				  history.goBack();
                }
              },
            });
          }
          if (mode === EDIT) {

            updateConfig({
              method: "PATCH",
              url: `${UPDATE_CONFIG}`,
			  params: {
				id: param.id
			  },
              data: values,
              success: (res) => {
                if (res) {
					message.success(res.message);
					history.goBack();
				  }
              },
            });
          }
        }, 1000);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
      });
  };

  return (
    <>
      {!rule && isLoading ? (
        <Loading cover="content" />
      ) : (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
        >
          <PageHeaderAlt className="border-bottom" overlap>
            <div className="container">
              <Flex
                className="py-2"
                mobileFlex={false}
                justifyContent="between"
                alignItems="center"
              >
                <h2 className="mb-3">
                  {mode === "ADD" ? "Add New Config" : `Edit ${rule?.name}`}{" "}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push(`${APP_PREFIX_PATH}/configurations`)}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => onFinish()}
                    htmlType="submit"
                    loading={submitLoading}
                  >
                    {mode === "ADD" && tabKey === "1" ? "Add" : `Save`}
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs
              activeKey={tabKey}
              onChange={(key) => setTabKey(key)}
              style={{ marginTop: 30 }}
            >
              <TabPane tab="General" key="1">
                <GeneralField form={form} />
              </TabPane>
              {/* {/* <TabPane tab="Variation" key="2">
						<VariationField />
					</TabPane> */}
            </Tabs>
          </div>
        </Form>
      )}
    </>
  );
};

export default ProductForm;
