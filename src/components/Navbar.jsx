import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  FileSearchOutlined,
  TableOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-gray-200 p-4 shadow-lg">
      <div className="container mx-auto flex justify-center">
        <Menu
          mode="horizontal"
          selectedKeys={[currentPath]}
          className="bg-transparent text-white border-none flex justify-center space-x-4"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/" className="text-white">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/result" icon={<FileSearchOutlined />}>
            <Link to="/result" className="text-white">
              Results
            </Link>
          </Menu.Item>
          <Menu.Item key="/table" icon={<TableOutlined />}>
            <Link to="/table" className="text-white">
              Table
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
