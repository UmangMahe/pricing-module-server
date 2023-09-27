import React from "react";
import { Upload, Card, Form, InputNumber, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;
const legthUnit = ["cm", "mm", "m"];
const weightUnit = ["kg", "g", "mg"];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ShippingField = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => console.log(fileList);

  const [fileList, setFileList] = useState([]);

  console.log(fileList);
  return (
    <Card title="Add Images">
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={(file, files) => {
          const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === 'image/webp';
		  const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG/Webp images!");
          }
          else if (!isLt2M) {
            message.error("Image must be smaller than 5MB!");
          } 
		  else setFileList([...fileList, ...files]);
          return isJpgOrPng && isLt2M && false;
        }}
        onPreview={handlePreview}
		onRemove={(file)=>{
			const fileIndex=fileList.indexOf(file)
			const newFileList = fileList.slice()
			newFileList.splice(fileIndex,1)
			return setFileList(newFileList)
		}}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Card>
  );
};

export default ShippingField;
