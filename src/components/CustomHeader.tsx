import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom"; // Certifique-se de ter o React Router configurado
import logo from "../assets/logo.png";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "2",
    label: <Link to="/characters">Characters</Link>,
  },
];

const CustomHeader = () => {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["1"]} items={items}></Menu>
  );
};

export default CustomHeader;
