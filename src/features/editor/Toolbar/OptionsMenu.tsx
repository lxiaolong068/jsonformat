import React from "react";
import { Menu, Text, Flex } from "@mantine/core";
import { event as gaEvent } from "nextjs-google-analytics";
import { BsCheck2 } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { VscLock } from "react-icons/vsc";
// 导入翻译hook
import { useTranslation } from "next-i18next";
import useConfig from "src/store/useConfig";
import useModal from "src/store/useModal";
import { StyledToolElement } from "./styles";

export const OptionsMenu = () => {
  const setVisible = useModal(state => state.setVisible);
  const toggleGestures = useConfig(state => state.toggleGestures);
  const toggleChildrenCount = useConfig(state => state.toggleChildrenCount);
  const toggleDarkMode = useConfig(state => state.toggleDarkMode);
  const toggleRulers = useConfig(state => state.toggleRulers);
  const toggleCollapseButton = useConfig(state => state.toggleCollapseButton);
  const toggleImagePreview = useConfig(state => state.toggleImagePreview);
  // 使用翻译函数
  const { t } = useTranslation("editor");

  const gesturesEnabled = useConfig(state => state.gesturesEnabled);
  const childrenCountVisible = useConfig(state => state.childrenCountVisible);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const rulersEnabled = useConfig(state => state.rulersEnabled);
  const collapseButtonVisible = useConfig(state => state.collapseButtonVisible);
  const imagePreviewEnabled = useConfig(state => state.imagePreviewEnabled);

  return (
    <Menu shadow="md" trigger="click" closeOnItemClick={false} withArrow>
      <Menu.Target>
        <StyledToolElement>
          <Flex gap={4}>
            <MdSettings size="18" />
          </Flex>
        </StyledToolElement>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<BsCheck2 opacity={rulersEnabled ? 100 : 0} />}
          onClick={() => {
            toggleRulers(!rulersEnabled);
            gaEvent("toggle_rulers", { label: rulersEnabled ? "on" : "off" });
          }}
        >
          <Text size="xs">{t("editor.options.rulers")}</Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<BsCheck2 opacity={gesturesEnabled ? 100 : 0} />}
          onClick={() => {
            toggleGestures(!gesturesEnabled);
            gaEvent("toggle_gestures", { label: gesturesEnabled ? "on" : "off" });
          }}
        >
          <Text size="xs">{t("editor.options.trackpadGestures")}</Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<BsCheck2 opacity={childrenCountVisible ? 100 : 0} />}
          onClick={() => {
            toggleChildrenCount(!childrenCountVisible);
            gaEvent("toggle_children_count", { label: childrenCountVisible ? "on" : "off" });
          }}
        >
          <Text size="xs">{t("editor.options.itemCount")}</Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<BsCheck2 opacity={imagePreviewEnabled ? 100 : 0} />}
          onClick={() => {
            toggleImagePreview(!imagePreviewEnabled);
            gaEvent("toggle_image_preview", { label: imagePreviewEnabled ? "on" : "off" });
          }}
        >
          <Text size="xs">{t("editor.options.imageLinkPreview")}</Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<BsCheck2 opacity={collapseButtonVisible ? 100 : 0} />}
          onClick={() => {
            toggleCollapseButton(!collapseButtonVisible);
            gaEvent("toggle_expand_collapse", { label: collapseButtonVisible ? "on" : "off" });
          }}
        >
          <Text size="xs">{t("editor.options.showExpandCollapse")}</Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<BsCheck2 opacity={darkmodeEnabled ? 100 : 0} />}
          onClick={() => {
            toggleDarkMode(!darkmodeEnabled);
            gaEvent("toggle_dark_mode", { label: darkmodeEnabled ? "on" : "off" });
          }}
        >
          <Text size="xs">{t("editor.options.darkMode")}</Text>
        </Menu.Item>
        <Menu.Item
          closeMenuOnClick
          leftSection={<VscLock />}
          onClick={() => setVisible("UpgradeModal", true)}
        >
          <Text size="xs">{t("editor.options.customizeColors")}</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
