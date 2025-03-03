import React from "react";
import type { AppProps } from "next/app";
// 恢复 next-i18next 导入
import { appWithTranslation } from "next-i18next";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import { ThemeProvider } from "styled-components";
import { NextSeo, SoftwareAppJsonLd } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Toaster } from "react-hot-toast";
import GlobalStyle from "src/constants/globalStyle";
import { SEO } from "src/constants/seo";
import { lightTheme } from "src/constants/theme";
// 导入 LanguageProvider
import { LanguageProvider } from "src/contexts/LanguageContext";

const theme = createTheme({
  autoContrast: true,
  fontSmoothing: false,
  respectReducedMotion: true,
  cursorType: "pointer",
  fontFamily:
    "system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"",
  defaultGradient: {
    from: "#388cdb",
    to: "#0f037f",
    deg: 180,
  },
  primaryShade: 8,
  colors: {
    brightBlue: [
      "#e6f2ff",
      "#cee1ff",
      "#9bc0ff",
      "#649dff",
      "#3980fe",
      "#1d6dfe",
      "#0964ff",
      "#0054e4",
      "#004acc",
      "#003fb5",
    ],
  },
  radius: {
    lg: "12px",
  },
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
  },
});

const IS_PROD = process.env.NODE_ENV === "production";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo {...SEO} />
      <SoftwareAppJsonLd
        name="JsonFormat"
        price="0"
        priceCurrency="USD"
        applicationCategory="DeveloperApplication"
        operatingSystem="Web"
      />
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <ThemeProvider theme={lightTheme}>
          <LanguageProvider>
            <Toaster
              position="bottom-right"
              containerStyle={{
                bottom: 34,
                right: 8,
                fontSize: 14,
              }}
              toastOptions={{
                style: {
                  background: "#4D4D4D",
                  color: "#B9BBBE",
                  borderRadius: 4,
                },
              }}
            />
            <GlobalStyle />
            {IS_PROD && <GoogleAnalytics trackPageViews />}
            <Component {...pageProps} />
          </LanguageProvider>
        </ThemeProvider>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(App);
