import React, { useEffect } from "react";
import { Upload, Card, Form, InputNumber, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAxiosCallback } from "@utils/useFetch";
import { PRODUCT_IMAGES } from "@constants/ApiConstants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Utils from "../../../../utils";
const { Option } = Select;

const legthUnit = ["cm", "mm", "m"];
const weightUnit = ["kg", "g", "mg"];

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", async () => await callback(reader.result));
  reader.readAsDataURL(img);
};

const ShippingField = ({ images = [], isLoading }) => {
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

  console.log(fileList)

  return (
    <Card title="Product Images" loading={isLoading}>
      <Upload
        name="image"
        listType="picture-card"
        fileList={fileList}
        action={PRODUCT_IMAGES}
        method="POST"
        data={{
          product_id: id,
        }}
        headers={{
          Authorization: `Bearer ${token}`,
        }}
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
          // else {
          //   getBase64(file, (imageUrl) => {
          //     file.url = imageUrl;
          //     setFileList([
          //       ...fileList,
          //       file,
          //     ]);
          //   });
          // }
          return isJpgOrPng && isLt2M;
        }}
        onPreview={handlePreview}
        onRemove={(file) => {
          console.log(file)
          OnImageRemove({
            url: `${PRODUCT_IMAGES}/${file.id || file.response.Image.id}`,
            method: "POST",
            data: {
              _method: "delete",
            },
            headers: {
              contentType: "multipart/form-data",
            },
            success: (res) => {
              message.success("Image removed successfully");
              const fileIndex = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(fileIndex, 1);
              return setFileList(newFileList);
            },
          });
        }}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal visible={previewVisible} confirmLoading={previewImage?false: true} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Card>
  );
};

export default ShippingField;
