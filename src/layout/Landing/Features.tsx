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
  description: string;
  descriptionZh?: string;
  icon: React.ReactNode;
  color: string;
}

const features: FeatureItem[] = [
  {
    title: "Visualizer",
    titleZh: "可视化工具",
    description:
      "Transform your data into interactive graphs or trees as you type. Supports JSON, YAML, CSV, XML, and TOML.",
    descriptionZh: "在您输入时将数据转换为交互式图表或树形结构。支持JSON、YAML、CSV、XML和TOML。",
    icon: <FaBolt size={20} />,
    color: "yellow",
  },
  {
    title: "Convert",
    titleZh: "转换",
    description:
      "Convert JSON to CSV, YAML to JSON, XML to JSON, and more. Our JSON converter supports multiple formats for easy data exchange.",
    descriptionZh: "将JSON转换为CSV，YAML转换为JSON，XML转换为JSON等。我们的JSON转换器支持多种格式，便于数据交换。",
    icon: <TbTransformFilled size={20} />,
    color: "orange",
  },
  {
    title: "Format & Validate",
    titleZh: "格式化与验证",
    description:
      "Format and beautify your JSON data to make it more readable. Validate JSON, YAML, and CSV.",
    descriptionZh: "格式化和美化您的JSON数据，使其更易读。验证JSON、YAML和CSV。",
    icon: <MdOutlineFormatIndentIncrease size={20} />,
    color: "green",
  },
  {
    title: "Generate Code",
    titleZh: "生成代码",
    description: "Generate TypeScript interface, Golang structs, JSON Schema and more.",
    descriptionZh: "生成TypeScript接口、Golang结构体、JSON Schema等。",
    icon: <MdOutlineGeneratingTokens size={20} />,
    color: "grape",
  },
  {
    title: "JSON Schema",
    titleZh: "JSON Schema",
    description:
      "Generate JSON Schema, create mock data, and validate JSON Schema from various data formats like JSON, YAML, XML, and CSV.",
    descriptionZh: "从JSON、YAML、XML和CSV等各种数据格式生成JSON Schema，创建模拟数据，并验证JSON Schema。",
    icon: <VscJson size={20} />,
    color: "cyan",
  },
  {
    title: "Advanced JSON Tools",
    titleZh: "高级JSON工具",
    description: "Decode JWT, randomize data, execute jq (JSON Query), json path commands.",
    descriptionZh: "解码JWT，随机化数据，执行jq（JSON查询），json路径命令。",
    icon: <FaToolbox size={20} />,
    color: "teal.5",
  },
  {
    title: "Download Image",
    titleZh: "下载图片",
    description:
      "Export image of the graph as PNG, JPEG, or SVG. Share your data visualization with others.",
    descriptionZh: "将图表导出为PNG、JPEG或SVG图像。与他人分享您的数据可视化。",
    icon: <IoImages size={20} />,
    color: "blue.4",
  },
  {
    title: "Secure",
    titleZh: "安全",
    description: "Your data is never stored on our servers. Everything happens on your device.",
    descriptionZh: "您的数据永远不会存储在我们的服务器上。所有处理都在您的设备上进行。",
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
            {language === "zh" ? "功能特性" : "Features"}
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
          {language === "zh" ? "直观地探索您的数据" : "Explore Your Data Visually"}
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
                  {language === "zh" && feature.titleZh ? feature.titleZh : feature.title}
                </Title>
                <Text fz="sm" c="gray.8">
                  {language === "zh" && feature.descriptionZh ? feature.descriptionZh : feature.description}
                </Text>
              </Flex>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Container>
  );
};
