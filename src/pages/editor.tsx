import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import styled, { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { NextSeo } from "next-seo";
// 导入next-i18next的serverSideTranslations函数
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SEO } from "src/constants/seo";
import { darkTheme, lightTheme } from "src/constants/theme";
import { BottomBar } from "src/features/editor/BottomBar";
import { FullscreenDropzone } from "src/features/editor/FullscreenDropzone";
import { Toolbar } from "src/features/editor/Toolbar";
import useConfig from "src/store/useConfig";
import useFile from "src/store/useFile";

const ModalController = dynamic(() => import("src/features/modals/ModalController"));
const ExternalMode = dynamic(() => import("src/features/editor/ExternalMode"));
const TextEditor = dynamic(() => import("src/features/editor/TextEditor"), {
  ssr: false,
});
const LiveEditor = dynamic(() => import("src/features/editor/LiveEditor"), {
  ssr: false,
});
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const StyledPageWrapper = styled.div`
  height: calc(100vh - 27px);
  width: 100%;

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

export const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledEditor = styled(Allotment)`
  position: relative !important;
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};
  height: calc(100vh - 67px);

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

const EditorPage = () => {
  const { query, isReady } = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const checkEditorSession = useFile(state => state.checkEditorSession);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  // 使用useTranslation钩子获取翻译函数
  const { t } = useTranslation("editor");

  useEffect(() => {
    if (isReady) checkEditorSession(query?.json);
  }, [checkEditorSession, isReady, query]);

  useEffect(() => {
    setColorScheme(darkmodeEnabled ? "dark" : "light");
  }, [darkmodeEnabled, setColorScheme]);

  return (
    <>
      <NextSeo
        {...SEO}
        title={t("editor.title")}
        description={t("editor.description")}
        canonical="https://jsonformat.help/editor"
      />
      <ThemeProvider theme={darkmodeEnabled ? darkTheme : lightTheme}>
        <QueryClientProvider client={queryClient}>
          <ExternalMode />
          <StyledPageWrapper>
            <Toolbar />
            <StyledEditorWrapper>
              <StyledEditor>
                <TextEditor />
                <LiveEditor />
              </StyledEditor>
            </StyledEditorWrapper>
            <BottomBar />
            <FullscreenDropzone />
            <ModalController />
          </StyledPageWrapper>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

// 添加getStaticProps函数以支持国际化
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "editor"])),
    },
  };
};

export default EditorPage;
