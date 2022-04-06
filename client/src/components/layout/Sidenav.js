// import { useState } from "react";
import { Menu } from "antd";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { dashboard, tables, billing, signin, signup } from "../../assets/icons";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const handleLogout = () => {
    localStorage.removeItem("authUser");
  };

  const menuData = [
    {
      id: 1,
      label: "Dashboard",
      slug: "dashboard",
      icon: dashboard,
      link: "/dashboard",
    },
    {
      id: 2,
      label: "Sellers",
      slug: "sellers",
      icon: signin,
      link: "/sellers",
    },
    {
      id: 3,
      label: "Customers",
      slug: "customers",
      icon: signup,
      link: "/customers",
    },
    {
      id: 4,
      label: "Jobs",
      slug: "jobs",
      icon: tables,
      link: "/jobs",
    },
    {
      id: 5,
      label: "Payments",
      slug: "payments",
      icon: billing,
      link: "/payments",
    },
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Jambu Space</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {menuData.map(item => (
          <Menu.Item key={item.id}>
            <NavLink to={item.link}>
              <span
                className="icon"
                style={{
                  background: page === item.slug ? color : "",
                }}
              >
                {item.icon}
              </span>
              <span className="label">{item.label}</span>
            </NavLink>
          </Menu.Item>
        ))}
        <hr />
        <Menu.Item onClick={handleLogout}>
          <NavLink to="/sign-in">
            <span className="icon">
              <AiOutlineLogout />
            </span>
            <span className="label">Logout</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
