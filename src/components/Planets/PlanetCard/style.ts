import styled from "styled-components";
import Card from "antd/es/card/Card";
import Skeleton from "antd/es/skeleton";
import { Typography } from "antd";

export const PlanetContainer = styled(Card)`
  width: 240px;
  margin: 10px;
  height: 400px;
`;

export const SkeletonImage = styled(Skeleton.Image)`
  height: 300px;
  width: 240px;
`;

export const Description = styled(Typography.Paragraph)`
  font-size: 12px;
  font-family: "AURABESH";
`;
