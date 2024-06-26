import styled from "styled-components";
import Typography from "antd/es/typography";

const { Title } = Typography;

export const NameTitle = styled(Title)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const TooltipTitleName = styled(Title)`
  font-family: "AURABESH";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const ContainerTitle = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
