import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s3-to-emai.vercel.app/tablecontents"
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "px-4 py-2 text-center",
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      className: "px-4 py-2 text-center",
    },
    {
      title: "Verify",
      dataIndex: "verify",
      key: "verify",
      render: (verify) => (verify ? "Yes" : "No"),
      className: "px-4 py-2 text-center",
    },
    {
      title: "Company Domain",
      dataIndex: "company_domain",
      key: "company_domain",
      className: "px-4 py-2 text-center",
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
      className: "px-4 py-2 text-center",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        className="bg-white shadow-lg"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default TableComponent;
