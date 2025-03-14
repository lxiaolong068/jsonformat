import React from "react";
import { Menu, Flex } from "@mantine/core";
import { JSONSchemaFaker } from "json-schema-faker";
import { event as gaEvent } from "nextjs-google-analytics";
import toast from "react-hot-toast";
import { CgChevronDown } from "react-icons/cg";
import { FaRandom } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuGlobe } from "react-icons/lu";
import { MdCompare, MdFilterListAlt } from "react-icons/md";
import { SiJsonwebtokens } from "react-icons/si";
import { VscSearchFuzzy, VscJson, VscGroupByRefType, VscLock } from "react-icons/vsc";
// 导入自定义的useLanguage钩子
import { useLanguage } from "src/contexts/LanguageContext";
// 保留next-i18next的useTranslation以便平滑过渡
import { useTranslation } from "next-i18next";
import { jsonToContent } from "src/lib/utils/jsonAdapter";
import useFile from "src/store/useFile";
import useJson from "src/store/useJson";
import useModal from "src/store/useModal";
import { StyledToolElement } from "./styles";

export const ToolsMenu = () => {
  const setVisible = useModal(state => state.setVisible);
  const getJson = useJson(state => state.getJson);
  const setContents = useFile(state => state.setContents);
  const getFormat = useFile(state => state.getFormat);
  // 使用自定义的useLanguage钩子
  const { t: customT } = useLanguage();
  // 保留next-i18next的useTranslation以便平滑过渡
  const { t: i18nextT } = useTranslation("editor");

  // 组合使用两种翻译函数，优先使用自定义的翻译
  const t = (key: string) => {
    const customTranslation = customT(key);
    // 如果自定义翻译返回的是键名本身，说明没有找到翻译，尝试使用next-i18next
    return customTranslation === key ? i18nextT(key) : customTranslation;
  };

  const randomizeData = async () => {
    try {
      // generate json schema
      const { run } = await import("json_typegen_wasm");
      const jsonSchema = run(
        "Root",
        getJson(),
        JSON.stringify({
          output_mode: "json_schema",
        })
      );

      // generate random data
      const randomJson = JSONSchemaFaker.generate(JSON.parse(jsonSchema));
      const contents = await jsonToContent(JSON.stringify(randomJson, null, 2), getFormat());
      setContents({ contents });

      gaEvent("randomize_data");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate mock data");
    }
  };

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <StyledToolElement onClick={() => gaEvent("show_tools_menu")}>
          <Flex align="center" gap={3}>
            {t("editor.toolbar.tools")} <CgChevronDown />
          </Flex>
        </StyledToolElement>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          fz={12}
          leftSection={<VscSearchFuzzy />}
          onClick={() => {
            setVisible("JQModal", true);
            gaEvent("open_jq_modal");
          }}
        >
          {t("editor.toolsMenu.jsonQuery")}
        </Menu.Item>
        <Menu.Item
          fz={12}
          leftSection={<VscJson />}
          onClick={() => {
            setVisible("SchemaModal", true);
            gaEvent("open_schema_modal");
          }}
        >
          {t("editor.toolsMenu.jsonSchema")}
        </Menu.Item>
        <Menu.Item
          fz={12}
          leftSection={<MdFilterListAlt />}
          onClick={() => {
            setVisible("JPathModal", true);
            gaEvent("open_json_path_modal");
          }}
        >
          {t("editor.toolsMenu.jsonPath")}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          fz={12}
          leftSection={<SiJsonwebtokens />}
          onClick={() => {
            setVisible("JWTModal", true);
            gaEvent("open_jwt_modal");
          }}
        >
          {t("editor.toolsMenu.decodeJWT")}
        </Menu.Item>
        <Menu.Item
          fz={12}
          leftSection={<FaRandom />}
          onClick={randomizeData}
        >
          {t("editor.toolsMenu.randomizeData")}
        </Menu.Item>
        {/* 暂时注释掉 AIModal 功能，因为该模态框组件尚未实现
        <Menu.Item
          fz={12}
          leftSection={<FaWandMagicSparkles />}
          onClick={() => {
            setVisible("AIModal", true);
            gaEvent("open_ai_modal");
          }}
        >
          {t("editor.toolsMenu.aiAssistant")}
        </Menu.Item>
        */}
        <Menu.Item
          fz={12}
          leftSection={<VscGroupByRefType />}
          onClick={() => {
            setVisible("TypeModal", true);
            gaEvent("open_type_modal");
          }}
        >
          {t("editor.toolsMenu.generateTypes")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
