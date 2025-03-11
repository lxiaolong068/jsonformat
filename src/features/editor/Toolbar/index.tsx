import React from "react";
import { Flex, Group, Select, Button } from "@mantine/core";
import styled from "styled-components";
import toast from "react-hot-toast";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
// 导入翻译hook
import { useTranslation } from "next-i18next";
import { type FileFormat, formats } from "src/enums/file.enum";
import { JSONCrackLogo } from "src/layout/JsonCrackLogo";
import useFile from "src/store/useFile";
import useModal from "src/store/useModal";
import { FileMenu } from "./FileMenu";
import { OptionsMenu } from "./OptionsMenu";
import { ToolsMenu } from "./ToolsMenu";
import { ViewMenu } from "./ViewMenu";
import { ZoomMenu } from "./ZoomMenu";
import { StyledToolElement } from "./styles";

const StyledTools = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  height: 40px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.TOOLBAR_BG};
  color: ${({ theme }) => theme.SILVER};
  z-index: 36;
  border-bottom: 1px solid ${({ theme }) => theme.SILVER_DARK};

  @media only screen and (max-width: 320px) {
    display: none;
  }
`;

function fullscreenBrowser() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Unable to enter fullscreen mode.");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

interface ToolbarProps {
  isWidget?: boolean;
}

export const Toolbar = ({ isWidget = false }: ToolbarProps) => {
  const setVisible = useModal(state => state.setVisible);
  const setFormat = useFile(state => state.setFormat);
  const format = useFile(state => state.format);
  // 使用翻译函数
  const { t } = useTranslation("editor");

  return (
    <StyledTools>
      {!isWidget && (
        <Group gap="xs" justify="left" w="100%" style={{ flexWrap: "nowrap" }}>
          <JSONCrackLogo />

          <Select
            defaultValue="json"
            size="xs"
            value={format}
            onChange={e => setFormat(e as FileFormat)}
            miw={80}
            w={120}
            data={formats}
            allowDeselect={false}
          />

          <FileMenu />
          <ViewMenu />
          <ToolsMenu />
        </Group>
      )}
      <Group gap="6" justify="right" w="100%" style={{ flexWrap: "nowrap" }}>
        <StyledToolElement title={t("editor.toolbar.fullscreen")} onClick={fullscreenBrowser}>
          <AiOutlineFullscreen size="18" />
        </StyledToolElement>
        <StyledToolElement title={t("editor.toolbar.download")} onClick={() => setVisible("DownloadModal", true)}>
          <FiDownload size="18" />
        </StyledToolElement>
        <OptionsMenu />
        <ZoomMenu />
      </Group>
    </StyledTools>
  );
};
