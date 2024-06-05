import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom"; // Certifique-se de ter o React Router configurado
import { HeaderTitle } from "./style";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: (
      <Link to="/">
        <HeaderTitle level={3}>Star Wars</HeaderTitle>
      </Link>
    ),
  },
];

const CustomHeader = () => {
  return <Menu mode="horizontal" items={items} selectedKeys={[""]}></Menu>;
};

export default CustomHeader;
