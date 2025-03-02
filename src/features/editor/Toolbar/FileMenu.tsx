import React from "react";
import { Flex, Menu } from "@mantine/core";
import { event as gaEvent } from "nextjs-google-analytics";
import { CgChevronDown } from "react-icons/cg";
// 导入翻译hook
import { useTranslation } from 'next-i18next';
import useFile from "src/store/useFile";
import useModal from "src/store/useModal";
import { StyledToolElement } from "./styles";

export const FileMenu = () => {
  const setVisible = useModal(state => state.setVisible);
  const getContents = useFile(state => state.getContents);
  const getFormat = useFile(state => state.getFormat);
  // 使用翻译函数
  const { t } = useTranslation('editor');

  const handleSave = () => {
    const a = document.createElement("a");
    const file = new Blob([getContents()], { type: "text/plain" });

    a.href = window.URL.createObjectURL(file);
    a.download = `jsoncrack.${getFormat()}`;
    a.click();

    gaEvent("save_file", { label: getFormat() });
  };

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <StyledToolElement title={t('editor.toolbar.file')}>
          <Flex align="center" gap={3}>
            {t('editor.toolbar.file')}
            <CgChevronDown />
          </Flex>
        </StyledToolElement>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item fz={12} onClick={() => setVisible("ImportModal", true)}>
          {t('editor.fileMenu.import')}
        </Menu.Item>
        <Menu.Item fz={12} onClick={handleSave}>
          {t('editor.fileMenu.export')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
