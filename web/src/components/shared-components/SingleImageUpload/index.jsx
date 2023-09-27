import { Form, message, Upload } from "antd";
import React from "react";
import CustomIcon from "@components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";
import { ImageSvg } from '@assets/svg/icon';

const { Dragger } = Upload;

function SingleImageUpload(props) {

    const beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M && false;
	}

  return (
    <div>
      <Form.Item name="icon" getValueFromEvent={({ file }) => file}>
        <Dragger
          {...imageUploadProps}
          beforeUpload={beforeUpload}
          onChange={(e) => props.handleUploadChange(e)}
        >
          {props.uploadedImg ? (
            <img
              src={props.uploadedImg}
              alt="avatar"
              id="featuredImage"
              className="img-fluid"
            />
          ) : (
            <div>
              {props.uploadLoading ? (
                <div>
                  <LoadingOutlined className="font-size-xxl text-primary" />
                  <div className="mt-3">Uploading</div>
                </div>
              ) : (
                <div>
                  <CustomIcon className="display-3" svg={ImageSvg} />
                  <p>Click or drag file to upload</p>
                </div>
              )}
            </div>
          )}
        </Dragger>
      </Form.Item>
    </div>
  );
}

export default SingleImageUpload;
<Form.Item name="icon" getValueFromEvent={({ file }) => file}>
  <Dragger
    {...imageUploadProps}
    beforeUpload={beforeUpload}
    onChange={(e) => props.handleUploadChange(e)}
  >
    {props.uploadedImg ? (
      <img
        src={props.uploadedImg}
        alt="avatar"
        id="featuredImage"
        className="img-fluid"
      />
    ) : (
      <div>
        {props.uploadLoading ? (
          <div>
            <LoadingOutlined className="font-size-xxl text-primary" />
            <div className="mt-3">Uploading</div>
          </div>
        ) : (
          <div>
            <CustomIcon className="display-3" svg={ImageSvg} />
            <p>Click or drag file to upload</p>
          </div>
        )}
      </div>
    )}
  </Dragger>
</Form.Item>;
