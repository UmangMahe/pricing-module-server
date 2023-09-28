import React, { useEffect } from "react";
import { Upload, Card, Form, InputNumber, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAxiosCallback } from "@utils/useFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Utils from "../../../../utils";
const { Option } = Select;


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", async () => await callback(reader.result));
  reader.readAsDataURL(img);
};

const ShippingField = ({ images = [], isLoading, ...props }) => {
  const { id } = useParams();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file, b) => {
    if (!file.url && !file.preview) {
      getBase64(file.originFileObj, (imageUrl) => {
        file.preview = imageUrl;
        setPreviewImage(file.preview);
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      const newFileList = images.map((image) => {
        image.url = Utils.getImgUrl(image.image);
        return image;
      });
      setFileList(newFileList);
    }
  }, [images, isLoading]);

  const handleChange = ({ fileList }) => {
    setFileList([...fileList]);
  };

  const { token } = useSelector((state) => state.auth);

  const { callback: OnImageRemove } = useAxiosCallback();
  const { callback: onImageUpload } = useAxiosCallback();

  const handleUpload = (info) => {
    const form = new FormData();
    form.append([info.filename], info.file);
    form.append("product_id", id || props.id);
    const { onSuccess, onProgress } = info;
    onImageUpload({
      method: "post",
      url: '',
      data: form,
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
      success: (res) => {
        onSuccess(res.Image);
      },
    });
  };

  return (
    <Card title="Product Images" loading={isLoading}>
      <Form.Item name="image" label="Images">
        <Upload
          name="image"
          customRequest={handleUpload}
          listType="picture-card"
          multiple
          fileList={fileList}
          beforeUpload={(file, files) => {
            const isJpgOrPng =
              file.type === "image/jpeg" ||
              file.type === "image/png" ||
              file.type === "image/webp";
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJpgOrPng) {
              message.error("You can only upload JPG/PNG/Webp images!");
            } else if (!isLt2M) {
              message.error("Image must be smaller than 5MB!");
            }
            return isJpgOrPng && isLt2M;
          }}
          onPreview={handlePreview}
          
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </Form.Item>

      <Modal
        visible={previewVisible}
        confirmLoading={previewImage ? false : true}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Card>
  );
};

export default ShippingField;
