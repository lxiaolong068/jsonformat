import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Stack, Flex, Button, Image } from "@mantine/core";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa6";
import { useLanguage } from "src/contexts/LanguageContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin-ext"],
});

const StyledHeroSection = styled.main`
  position: relative;

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-size: 40px 40px;
    background-image: linear-gradient(to right, #f7f7f7 1px, transparent 1px),
      linear-gradient(to bottom, #f7f7f7 1px, transparent 1px);
    image-rendering: pixelated;
    -webkit-mask-image: linear-gradient(to bottom, transparent, 0%, white, 98%, transparent);
    mask-image: linear-gradient(to bottom, transparent, 0%, white, 98%, transparent);
  }

  @media only screen and (max-width: 1240px) {
    flex-direction: column;
  }
`;

const StyledHeroSectionBody = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 6rem 10% 4rem;
  overflow: hidden;
  text-align: center;
  gap: 60px;
  min-height: 40vh;

  @media only screen and (max-width: 768px) {
    padding: 6em 16px;
    padding-top: 10vh;
  }
`;

const StyledHeroTitle = styled.h1`
  position: relative;
  font-size: 2.3rem;
  font-weight: 700;
  display: inline;
  color: #120f43;
  width: fit-content;
  line-height: 1.15;
  max-width: 30rem;
  letter-spacing: -0.75px;
  word-spacing: 6px;
  font-family: ${plusJakartaSans.style.fontFamily};

  @media only screen and (min-width: 576px) {
    font-size: 3.4rem;
    max-width: 34rem;
  }

  @media only screen and (min-width: 992px) {
    font-size: 3.8rem;
    max-width: 40rem;
  }

  @media only screen and (min-width: 1400px) {
    font-size: 4.2rem;
    max-width: 50rem;
  }
`;

const StyledHeroText = styled.h2`
  font-size: 14px;
  color: #4a5568;
  font-weight: 400;
  max-width: 75%;
  margin-top: 1rem;
  text-align: center;

  strong {
    font-weight: 400;
    color: #115fe6;
  }

  @media only screen and (min-width: 576px) {
    font-size: 18px;
    max-width: 80%;
  }

  @media only screen and (min-width: 1400px) {
    font-size: 18px;
    max-width: 60%;
  }
`;

export const HeroSection = () => {
  const { language } = useLanguage();
  
  return (
    <StyledHeroSection>
      <StyledHeroSectionBody>
        <Stack flex="1" miw={250} mx="auto" align="center">
          <Link href="https://todiagram.com" target="_blank">
            <Flex align="center" gap={5}>
              {language === "zh" ? "由" : 
               language === "ja" ? "開発元" : 
               language === "ko" ? "제작" : 
               language === "de" ? "entwickelt von" : 
               "built by"}
              <Image
                src="/assets/todiagram_logo.png"
                alt="Todiagram Logo"
                h={14}
                w="fit-content"
                loading="eager"
              />
              {language === "zh" ? "构建" : 
               language === "ja" ? "構築" : 
               language === "ko" ? "제작" : 
               language === "de" ? "" : 
               ""}
            </Flex>
          </Link>
          <StyledHeroTitle>
            {language === "zh" ? "将JSON可视化为交互式图表" : 
             language === "ja" ? "JSONをインタラクティブなグラフに可視化" : 
             language === "ko" ? "JSON을 인터랙티브 그래프로 시각화" : 
             language === "de" ? "Visualisieren Sie JSON in interaktive Graphen" : 
             "Visualize JSON into interactive graphs"}
          </StyledHeroTitle>
          <StyledHeroText>
            {language === "zh" ? (
              <>最佳在线JSON查看工具，用于<strong>可视化</strong>、<strong>格式化</strong>和<strong>探索</strong>。</>
            ) : language === "ja" ? (
              <>最高のオンラインJSONビューアツールで<strong>可視化</strong>、<strong>フォーマット</strong>、<strong>探索</strong>。</>
            ) : language === "ko" ? (
              <>최고의 온라인 JSON 뷰어 도구로 <strong>시각화</strong>, <strong>포맷</strong> 및 <strong>탐색</strong>하세요.</>
            ) : language === "de" ? (
              <>Das beste Online-JSON-Viewer-Tool zum <strong>Visualisieren</strong>, <strong>Formatieren</strong>{" "}
              und <strong>Erkunden</strong>.</>
            ) : (
              <>The best online JSON viewer tool to <strong>visualize</strong>, <strong>format</strong>{" "}
              and <strong>explore</strong>.</>
            )}
          </StyledHeroText>

          <Flex gap="xs" wrap="wrap" justify="center" hiddenFrom="xs">
            <Button
              component="a"
              color="#202842"
              href={`/${language !== "en" ? language + "/" : ""}editor`}
              size="md"
              radius="md"
              rightSection={<FaChevronRight />}
              fw="500"
            >
              {language === "zh" ? "前往编辑器" : 
               language === "ja" ? "エディターへ" : 
               language === "ko" ? "에디터로 이동" : 
               language === "de" ? "Zum Editor" : 
               "Go to Editor"}
            </Button>
          </Flex>
          <Flex gap="lg" wrap="wrap" justify="center" visibleFrom="xs">
            <Button
              component="a"
              color="#202842"
              href={`/${language !== "en" ? language + "/" : ""}editor`}
              size="lg"
              radius="md"
              rightSection={<FaChevronRight />}
              fw="500"
            >
              {language === "zh" ? "前往编辑器" : 
               language === "ja" ? "エディターへ" : 
               language === "ko" ? "에디터로 이동" : 
               language === "de" ? "Zum Editor" : 
               "Go to Editor"}
            </Button>
          </Flex>
        </Stack>
      </StyledHeroSectionBody>
    </StyledHeroSection>
  );
};
