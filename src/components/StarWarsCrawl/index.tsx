import React from "react";
import {
  CrawlContainer,
  CrawlContent,
  EpisodeTitle,
  MovieTitle,
  OpeningCrawl,
  TextContainer,
} from "./style";
import { Modal, Typography } from "antd";

interface StarWarsCrawlProps {
  animate: boolean;
  title: string;
  episode: number;
  text: string;
  width: number;
  close: () => void;
}

const StarWarsCrawl: React.FC<StarWarsCrawlProps> = ({
  text,
  episode,
  title,
  animate,
  width,
  close,
}) => {
  if (width < 768) {
    return (
      <Modal open={animate} footer={null} onCancel={close}>
        <CrawlContainer>
          <CrawlContent animate={animate}>
            <TextContainer>
              <EpisodeTitle level={1}>Episode {episode}</EpisodeTitle>
              <MovieTitle level={2}>{title}</MovieTitle>
              <OpeningCrawl>{text}</OpeningCrawl>
            </TextContainer>
          </CrawlContent>
        </CrawlContainer>
      </Modal>
    );
  }

  return (
    <CrawlContainer>
      <CrawlContent animate={animate}>
        <TextContainer>
          <EpisodeTitle level={1}>Episode {episode}</EpisodeTitle>
          <MovieTitle level={2}>{title}</MovieTitle>
          <OpeningCrawl>{text}</OpeningCrawl>
        </TextContainer>
      </CrawlContent>
    </CrawlContainer>
  );
};

export default StarWarsCrawl;
