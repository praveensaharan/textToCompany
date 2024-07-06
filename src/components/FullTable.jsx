import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input } from "antd";
import { useSession } from "@clerk/clerk-react";

const Baseurl = "https://s3-to-emai.vercel.app";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { session } = useSession();
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const token = await session.getToken();
          const response = await axios.get(
            `${Baseurl}/database/tablecontents`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching the data", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  const fetchSearchResults = async () => {
    try {
      const token = await session.getToken();
      const response = await axios.get(
        `${Baseurl}/database/search/${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching search results", error);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setSearchLoading(true);
      setTypingTimeout(setTimeout(() => fetchSearchResults(), 2000));
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [searchQuery, session]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const dataSource = searchQuery.trim() !== "" ? searchResults : data;

  return (
    <div className="container mx-auto p-2 sm:p-4 my-20 ">
      <input
        placeholder="Search...(2s delay)"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-52 mb-2 p-2 border-2 focus:border-lightgray rounded-xl border-orange transition duration-200"
      />
      <p className="text-2xl font-semibold text-black mb-4 my-4">Top 20 Data</p>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading || searchLoading}
        rowKey="id"
        className="bg-transparent shadow-lg"
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default TableComponent;
