import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { useUser } from "@clerk/clerk-react";
const Baseurl = "https://s3-to-emai.vercel.app";
const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/tablecontents`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "px-2 sm:px-4 py-2 text-center",
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      className: "px-2 sm:px-4 py-2 text-center",
    },
    {
      title: "Verify",
      dataIndex: "verify",
      key: "verify",
      render: (verify) => (verify ? "Yes" : "No"),
      className: "px-2 sm:px-4 py-2 text-center",
    },
    {
      title: "Company Domain",
      dataIndex: "company_domain",
      key: "company_domain",
      className: "px-2 sm:px-4 py-2 text-center",
    },
    {
      title: "Emails",
      key: "emails",
      render: (text, record) => {
        const emails = [
          record.email1,
          record.email2,
          record.email3,
          record.email4,
          record.email5,
          record.email6,
        ]
          .filter((email) => email)
          .join(", ");
        return <span>{emails}</span>;
      },
      className: "px-2 sm:px-4 py-2 text-center",
    },
  ];

  return (
    <div className="container mx-auto p-2 sm:p-4 mt-20">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        className="bg-white shadow-lg"
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
      {/* <div>
        <h2>User Information</h2>
        <p>
          <strong>Email:</strong> {user.primaryEmailAddress.emailAddress}
        </p>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
      
      </div> */}
    </div>
  );
};

export default TableComponent;
