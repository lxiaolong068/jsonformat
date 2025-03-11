import React from "react";
import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import styled from "styled-components";
import { LuSettings } from "react-icons/lu";
import { useTranslation } from "next-i18next";
import { ViewMode } from "src/enums/viewMode.enum";
import useConfig from "src/store/useConfig";

const StyledMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.BACKGROUND_TERTIARY};
  border-radius: 4px;
  padding: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const OptionsMenu = () => {
  const { t } = useTranslation("editor");
  const toggleRulers = useConfig(state => state.toggleRulers);
  const toggleGestures = useConfig(state => state.toggleGestures);
  const toggleChildrenCount = useConfig(state => state.toggleChildrenCount);
  const toggleCollapseButton = useConfig(state => state.toggleCollapseButton);
  const toggleImagePreview = useConfig(state => state.toggleImagePreview);
  const toggleDarkMode = useConfig(state => state.toggleDarkMode);
  const setViewMode = useConfig(state => state.setViewMode);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const rulersEnabled = useConfig(state => state.rulersEnabled);
  const gesturesEnabled = useConfig(state => state.gesturesEnabled);
  const childrenCountVisible = useConfig(state => state.childrenCountVisible);
  const collapseButtonVisible = useConfig(state => state.collapseButtonVisible);
  const imagePreviewEnabled = useConfig(state => state.imagePreviewEnabled);
  const viewMode = useConfig(state => state.viewMode);

  return (
    <StyledMenuWrapper>
      <Menu shadow="md" width={200} position="top-end">
        <Menu.Target>
          <Tooltip label={t("editor.options.settings")} position="top">
            <ActionIcon variant="transparent" color="gray" size="lg">
              <LuSettings size={20} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>{t("editor.options.settings")}</Menu.Label>
          <Menu.Item
            onClick={() => toggleRulers(!rulersEnabled)}
            rightSection={rulersEnabled ? "✓" : null}
          >
            {t("editor.options.rulers")}
          </Menu.Item>
          <Menu.Item
            onClick={() => toggleGestures(!gesturesEnabled)}
            rightSection={gesturesEnabled ? "✓" : null}
          >
            {t("editor.options.trackpadGestures")}
          </Menu.Item>
          <Menu.Item
            onClick={() => toggleChildrenCount(!childrenCountVisible)}
            rightSection={childrenCountVisible ? "✓" : null}
          >
            {t("editor.options.itemCount")}
          </Menu.Item>
          <Menu.Item
            onClick={() => toggleImagePreview(!imagePreviewEnabled)}
            rightSection={imagePreviewEnabled ? "✓" : null}
          >
            {t("editor.options.imageLinkPreview")}
          </Menu.Item>
          <Menu.Item
            onClick={() => toggleCollapseButton(!collapseButtonVisible)}
            rightSection={collapseButtonVisible ? "✓" : null}
          >
            {t("editor.options.showExpandCollapse")}
          </Menu.Item>
          <Menu.Item
            onClick={() => toggleDarkMode(!darkmodeEnabled)}
            rightSection={darkmodeEnabled ? "✓" : null}
          >
            {t("editor.options.darkMode")}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>{t("editor.viewMenu.viewMode")}</Menu.Label>
          <Menu.Item
            onClick={() => setViewMode(ViewMode.Graph)}
            rightSection={viewMode === ViewMode.Graph ? "✓" : null}
          >
            {t("editor.views.graph")}
          </Menu.Item>
          <Menu.Item
            onClick={() => setViewMode(ViewMode.Tree)}
            rightSection={viewMode === ViewMode.Tree ? "✓" : null}
          >
            {t("editor.views.tree")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </StyledMenuWrapper>
  );
}; 