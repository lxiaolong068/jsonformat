import React from "react";
import {
  Container,
  Flex,
  Title,
  Text,
  Paper,
  Center,
  Badge,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { FaBolt, FaToolbox } from "react-icons/fa";
import { IoImages, IoShieldCheckmark } from "react-icons/io5";
import { MdOutlineFormatIndentIncrease, MdOutlineGeneratingTokens } from "react-icons/md";
import { TbTransformFilled } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";
import { useLanguage } from "src/contexts/LanguageContext";

interface FeatureItem {
  title: string;
  titleZh?: string;
  titleJa?: string;
  titleKo?: string;
  description: string;
  descriptionZh?: string;
  descriptionJa?: string;
  descriptionKo?: string;
  icon: React.ReactNode;
  color: string;
}

const features: FeatureItem[] = [
  {
    title: "Visualizer",
    titleZh: "可视化工具",
    titleJa: "ビジュアライザー",
    titleKo: "시각화 도구",
    description:
      "Transform your data into interactive graphs or trees as you type. Supports JSON, YAML, CSV, XML, and TOML.",
    descriptionZh: "在您输入时将数据转换为交互式图表或树形结构。支持JSON、YAML、CSV、XML和TOML。",
    descriptionJa: "入力しながらデータをインタラクティブなグラフやツリーに変換します。JSON、YAML、CSV、XML、TOMLをサポートしています。",
    descriptionKo: "입력하는 동안 데이터를 대화형 그래프나 트리로 변환합니다. JSON, YAML, CSV, XML 및 TOML을 지원합니다.",
    icon: <FaBolt size={20} />,
    color: "yellow",
  },
  {
    title: "Convert",
    titleZh: "转换",
    titleJa: "変換",
    titleKo: "변환",
    description:
      "Convert JSON to CSV, YAML to JSON, XML to JSON, and more. Our JSON converter supports multiple formats for easy data exchange.",
    descriptionZh: "将JSON转换为CSV，YAML转换为JSON，XML转换为JSON等。我们的JSON转换器支持多种格式，便于数据交换。",
    descriptionJa: "JSONからCSV、YAMLからJSON、XMLからJSONなどへの変換が可能です。当社のJSON変換ツールは、簡単なデータ交換のために複数のフォーマットをサポートしています。",
    descriptionKo: "JSON을 CSV로, YAML을 JSON으로, XML을 JSON으로 등 다양한 변환이 가능합니다. 우리의 JSON 변환기는 쉬운 데이터 교환을 위해 여러 형식을 지원합니다.",
    icon: <TbTransformFilled size={20} />,
    color: "orange",
  },
  {
    title: "Format & Validate",
    titleZh: "格式化与验证",
    titleJa: "フォーマットと検証",
    titleKo: "포맷 및 검증",
    description:
      "Format and beautify your JSON data to make it more readable. Validate JSON, YAML, and CSV.",
    descriptionZh: "格式化和美化您的JSON数据，使其更易读。验证JSON、YAML和CSV。",
    descriptionJa: "JSONデータをフォーマットして読みやすくします。JSON、YAML、CSVを検証します。",
    descriptionKo: "JSON 데이터를 포맷하고 아름답게 만들어 더 읽기 쉽게 합니다. JSON, YAML 및 CSV를 검증합니다.",
    icon: <MdOutlineFormatIndentIncrease size={20} />,
    color: "green",
  },
  {
    title: "Generate Code",
    titleZh: "生成代码",
    titleJa: "コード生成",
    titleKo: "코드 생성",
    description: "Generate TypeScript interface, Golang structs, JSON Schema and more.",
    descriptionZh: "生成TypeScript接口、Golang结构体、JSON Schema等。",
    descriptionJa: "TypeScriptインターフェース、Golang構造体、JSONスキーマなどを生成します。",
    descriptionKo: "TypeScript 인터페이스, Golang 구조체, JSON 스키마 등을 생성합니다.",
    icon: <MdOutlineGeneratingTokens size={20} />,
    color: "grape",
  },
  {
    title: "JSON Schema",
    titleZh: "JSON Schema",
    titleJa: "JSONスキーマ",
    titleKo: "JSON 스키마",
    description:
      "Generate JSON Schema, create mock data, and validate JSON Schema from various data formats like JSON, YAML, XML, and CSV.",
    descriptionZh: "从JSON、YAML、XML和CSV等各种数据格式生成JSON Schema，创建模拟数据，并验证JSON Schema。",
    descriptionJa: "JSON、YAML、XML、CSVなどの様々なデータ形式からJSONスキーマを生成し、モックデータを作成し、JSONスキーマを検証します。",
    descriptionKo: "JSON, YAML, XML, CSV와 같은 다양한 데이터 형식에서 JSON 스키마를 생성하고, 모의 데이터를 만들고, JSON 스키마를 검증합니다.",
    icon: <VscJson size={20} />,
    color: "cyan",
  },
  {
    title: "Advanced JSON Tools",
    titleZh: "高级JSON工具",
    titleJa: "高度なJSONツール",
    titleKo: "고급 JSON 도구",
    description: "Decode JWT, randomize data, execute jq (JSON Query), json path commands.",
    descriptionZh: "解码JWT，随机化数据，执行jq（JSON查询），json路径命令。",
    descriptionJa: "JWTのデコード、データのランダム化、jq（JSONクエリ）、jsonパスコマンドの実行が可能です。",
    descriptionKo: "JWT 디코딩, 데이터 무작위화, jq(JSON 쿼리), json 경로 명령 실행이 가능합니다.",
    icon: <FaToolbox size={20} />,
    color: "teal.5",
  },
  {
    title: "Download Image",
    titleZh: "下载图片",
    titleJa: "画像のダウンロード",
    titleKo: "이미지 다운로드",
    description:
      "Export image of the graph as PNG, JPEG, or SVG. Share your data visualization with others.",
    descriptionZh: "将图表导出为PNG、JPEG或SVG图像。与他人分享您的数据可视化。",
    descriptionJa: "グラフの画像をPNG、JPEG、SVG形式でエクスポートできます。データの可視化を他の人と共有しましょう。",
    descriptionKo: "그래프 이미지를 PNG, JPEG 또는 SVG로 내보낼 수 있습니다. 데이터 시각화를 다른 사람들과 공유하세요.",
    icon: <IoImages size={20} />,
    color: "blue.4",
  },
  {
    title: "Secure",
    titleZh: "安全",
    titleJa: "安全性",
    titleKo: "보안",
    description: "Your data is never stored on our servers. Everything happens on your device.",
    descriptionZh: "您的数据永远不会存储在我们的服务器上。所有处理都在您的设备上进行。",
    descriptionJa: "あなたのデータは当社のサーバーに保存されることはありません。すべての処理はあなたのデバイス上で行われます。",
    descriptionKo: "귀하의 데이터는 절대 우리 서버에 저장되지 않습니다. 모든 처리는 귀하의 기기에서 이루어집니다.",
    icon: <IoShieldCheckmark size={20} />,
    color: "gray",
  },
];

export const Features = () => {
  const { language } = useLanguage();
  return (
    <Container component="section" id="features" fluid py={80}>
      <Container size="xl">
        <Center>
          <Badge
            fw="600"
            tt="none"
            variant="outline"
            c="blue.7"
            color="blue.3"
            bg="blue.0"
            size="lg"
          >
            {language === "zh" ? "功能特性" : 
             language === "ja" ? "機能" : 
             language === "ko" ? "기능" : 
             "Features"}
          </Badge>
        </Center>
        <Title
          c="black"
          order={2}
          px="lg"
          fz={{
            base: 26,
            xs: 32,
            sm: 42,
          }}
          fw={600}
          mb={15}
          style={{ textAlign: "center" }}
        >
          {language === "zh" ? "直观地探索您的数据" : 
           language === "ja" ? "データを視覚的に探索" : 
           language === "ko" ? "데이터를 시각적으로 탐색" : 
           "Explore Your Data Visually"}
        </Title>
        <Title
          order={3}
          fw={500}
          c="gray.7"
          px="lg"
          mx="auto"
          ta="center"
          mb={50}
          fz={{ base: 16, sm: 18 }}
          w={{ base: "100%", xs: "80%", sm: "60%", md: "40%" }}
        >
          {language === "zh" ? 
            "JSON、YAML、CSV、XML和TOML的一体化工具。格式化器、验证器、可视化工具和编辑器。" : 
           language === "ja" ?
            "JSON、YAML、CSV、XML、TOMLのオールインワンツール。フォーマッター、バリデーター、ビジュアライザー、エディター。" :
           language === "ko" ?
            "JSON, YAML, CSV, XML 및 TOML을 위한 올인원 도구. 포맷터, 검증기, 시각화 도구 및 편집기." :
            "All in one tool for JSON, YAML, CSV, XML, and TOML. Formatter, validator, visualizer, and editor."}
        </Title>

        <SimpleGrid
          cols={{
            base: 1,
            xs: 2,
            md: 4,
          }}
          spacing="xl"
        >
          {features.map((feature, index) => (
            <Paper key={index} bg="gray.0" p="lg" radius="md">
              <Flex gap="sm" align="center" justify="center" direction="column">
                <ThemeIcon radius="xl" size="xl" variant="light" color={feature.color}>
                  {feature.icon}
                </ThemeIcon>
                <Title fw={500} ta="center" c="gray.9" order={3}>
                  {language === "zh" && feature.titleZh ? feature.titleZh : 
                   language === "ja" && feature.titleJa ? feature.titleJa : 
                   language === "ko" && feature.titleKo ? feature.titleKo : 
                   feature.title}
                </Title>
                <Text fz="sm" c="gray.8">
                  {language === "zh" && feature.descriptionZh ? feature.descriptionZh : 
                   language === "ja" && feature.descriptionJa ? feature.descriptionJa : 
                   language === "ko" && feature.descriptionKo ? feature.descriptionKo : 
                   feature.description}
                </Text>
              </Flex>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Container>
  );
};
