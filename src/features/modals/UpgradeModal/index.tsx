import React from "react";
import type { ModalProps } from "@mantine/core";
import {
  Button,
  Modal,
  Flex,
  Stack,
  Title,
  Text,
  CloseButton,
  FocusTrap,
  Image,
  Divider,
  List,
  ThemeIcon,
} from "@mantine/core";
import Cookie from "js-cookie";
import { LuCheck } from "react-icons/lu";
import useConfig from "src/store/useConfig";

export const UpgradeModal = ({ opened, onClose }: ModalProps) => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  const handleCloseModal = () => {
    Cookie.set("upgrade_shown", "true", { expires: 3 });
    onClose();
  };

  return (
    <Modal
      size="700"
      opened={opened}
      onClose={handleCloseModal}
      zIndex={1001}
      centered
      radius="lg"
      withCloseButton={false}
      styles={{ body: { padding: 0 } }}
      overlayProps={{ blur: 2 }}
    >
      <FocusTrap.InitialFocus />
      <Flex>
        <Image
          src={`/assets/hp-${darkmodeEnabled ? "dark" : "light"}.png`}
          alt="diagram"
          maw={300}
          height="auto"
          style={{ objectPosition: "left" }}
        />
        <Divider orientation="vertical" />
        <Stack gap="24" px="40" py="20" w="100%">
          <Flex justify="space-between" mr="-20">
            <Title c="bright" fw="500" fz="24">
              欢迎使用 JSON Format
            </Title>
            <CloseButton onClick={handleCloseModal} />
          </Flex>
          <Text c="dimmed" fz="md">
            JSON Format 是一个功能强大的 JSON 可视化和处理工具
          </Text>
          <List
            spacing="4"
            icon={
              <ThemeIcon variant="transparent" radius="xl" size="sm" color="teal">
                <LuCheck size="16" />
              </ThemeIcon>
            }
          >
            <List.Item>直观的 JSON 数据可视化</List.Item>
            <List.Item>支持图形视图和树形视图</List.Item>
            <List.Item>多种格式转换（JSON、CSV、XML、YAML）</List.Item>
            <List.Item>自动生成多种编程语言的类型定义</List.Item>
            <List.Item>JSON Schema 验证和生成</List.Item>
            <List.Item>多语言界面支持</List.Item>
            <List.Item>完全免费使用</List.Item>
          </List>
          <Button
            onClick={handleCloseModal}
            color="teal"
            size="md"
            radius="md"
            fullWidth
          >
            开始使用
          </Button>
        </Stack>
      </Flex>
    </Modal>
  );
};
