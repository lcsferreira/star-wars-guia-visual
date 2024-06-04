import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom"; // Certifique-se de ter o React Router configurado
import logo from "../assets/logo.png";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: (
      <Link to="/">
        <p
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "18px",
            fontFamily: "SFDistantGalaxy-Regular",
          }}
        >
          Star Wars
        </p>
      </Link>
    ),
  },
];

const CustomHeader = () => {
  return <Menu mode="horizontal" items={items}></Menu>;
};

export default CustomHeader;
