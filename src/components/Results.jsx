import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Tooltip, Modal, Form, Input, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
const { Option } = Select;

const ResultsComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null); // To store the record being edited
  const [editForm] = Form.useForm(); // Ant Design Form instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s3-to-emai.vercel.app/results"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditModalVisible(true);
    editForm.setFieldsValue({
      company_name: record.company_name,
      email: record.email,
      email_verify: record.email_verify,
    });
  };

  const handleMove = async (id) => {
    try {
      console.log("Deleting record with ID:", id);
      await axios.post(`https://s3-to-emai.vercel.app/movetomain/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      Modal.success({
        title: "Moved",
        content: "Result Moved successfully",
      });
    } catch (error) {
      console.error("Error Moving the data", error);
      Modal.error({
        title: "Error",
        content: "There was an error Moving the result",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://s3-to-emai.vercel.app/delete/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      Modal.success({
        title: "Deleted",
        content: "Result deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting the data", error);
      Modal.error({
        title: "Error",
        content: "There was an error deleting the result",
      });
    }
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this result?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        handleDelete(record._id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showMoveConfirm = (record) => {
    confirm({
      title: "Are you sure you want to Move this result?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        handleMove(record._id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleEditModalOk = () => {
    editForm.validateFields().then(async (values) => {
      try {
        // Make your edit API call here, e.g., axios.put or axios.post
        console.log("Edited values:", values);
        // Close modal and reset form
        setEditModalVisible(false);
        editForm.resetFields();
        Modal.success({
          title: "Edited",
          content: "Result Edited successfully",
        });
      } catch (error) {
        console.error("Error editing the data", error);
        Modal.error({
          title: "Error",
          content: "There was an error editing the result",
        });
      }
    });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    editForm.resetFields();
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      className: "px-4 py-2 text-center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "px-4 py-2 text-center",
    },
    {
      title: "Email Verified",
      dataIndex: "email_verify",
      key: "email_verify",
      render: (email_verify) => (email_verify ? "Yes" : "No"),
      className: "px-4 py-2 text-center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Move">
            <Button
              type="default"
              shape="circle"
              icon={<ArrowRightOutlined />}
              onClick={() => showMoveConfirm(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="bg-red-500 text-white"
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record)}
            />
          </Tooltip>
        </div>
      ),
      className: "px-4 py-2 text-center",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        className="bg-white shadow-lg"
        pagination={false}
        bordered
      />

      <Modal
        title="Edit Result"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editForm"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="company_name"
            label="Company Name"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email_verify"
            label="Email Verified"
            rules={[
              { required: true, message: "Please select email verify status" },
            ]}
          >
            <Select>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResultsComponent;
