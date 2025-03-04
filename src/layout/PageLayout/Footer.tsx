import React from "react";
import Link from "next/link";
import { Anchor, Container, Divider, Flex, Stack, Text, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { JSONCrackLogo } from "../JsonCrackLogo";
import { useLanguage } from "src/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  
  const getTranslation = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      resources: {
        en: "Resources",
        zh: "资源",
        ja: "リソース",
        ko: "리소스",
        de: "Ressourcen"
      },
      friends: {
        en: "Friends",
        zh: "友情链接",
        ja: "友達",
        ko: "친구들",
        de: "Partner"
      },
      social: {
        en: "Social",
        zh: "社交媒体",
        ja: "ソーシャル",
        ko: "소셜",
        de: "Soziale Medien"
      },
      terms: {
        en: "Terms",
        zh: "条款",
        ja: "利用規約",
        ko: "이용약관",
        de: "Nutzungsbedingungen"
      },
      privacy: {
        en: "Privacy",
        zh: "隐私",
        ja: "プライバシー",
        ko: "개인정보",
        de: "Datenschutz"
      },
      vsCodeExtension: {
        en: "VS Code Extension",
        zh: "VS Code 扩展",
        ja: "VS Code 拡張機能",
        ko: "VS Code 확장",
        de: "VS Code Erweiterung"
      }
    };
    
    return translations[key][language] || translations[key].en;
  };
  
  return (
    <Container mt={60} px={60} pb="xl" bg="black" fluid>
      <Divider color="gray.3" mb="xl" mx={-60} />
      <Flex justify="space-between">
        <Stack gap={4} visibleFrom="sm">
          <JSONCrackLogo />
          <Anchor href="mailto:contact@todiagram.com" fz="xs" c="dimmed">
            contact@todiagram.com
          </Anchor>
        </Stack>
        <Flex gap={60} visibleFrom="sm">
          <Stack gap="xs">
            <Text fz="sm" c="white">
              {getTranslation("resources")}
            </Text>
            <Anchor component={Link} prefetch={false} fz="sm" c="gray.5" href="/#faq">
              FAQ
            </Anchor>
            <Anchor component={Link} prefetch={false} fz="sm" c="gray.5" href="/docs">
              Docs
            </Anchor>
            <Anchor
              href="https://marketplace.visualstudio.com/items?itemName=AykutSarac.jsoncrack-vscode"
              fz="sm"
              c="gray.5"
              rel="noopener"
            >
              {getTranslation("vsCodeExtension")}
            </Anchor>
          </Stack>
          <Stack gap="xs">
            <Text fz="sm" c="white">
              {getTranslation("friends")}
            </Text>
            <Anchor href="https://www.snowdaycal.cc/" fz="sm" c="gray.5" rel="noopener">
              Snow Day Calculator
            </Anchor>
            <Anchor href="https://www.makepdfscan.cc/" fz="sm" c="gray.5" rel="noopener">
              make pdf look scanned
            </Anchor>
            <Anchor href="https://todiagram.com" fz="sm" c="gray.5" rel="noopener">
              ToDiagram
            </Anchor>
          </Stack>
          <Stack gap="xs">
            <Text fz="sm" c="white">
              {getTranslation("social")}
            </Text>
            <Flex gap="xs">
              <Anchor
                aria-label="LinkedIn"
                href="https://www.linkedin.com/company/jsoncrack"
                fz="sm"
                rel="noopener"
              >
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaLinkedin size={20} />
                </ThemeIcon>
              </Anchor>
              <Anchor aria-label="X" fz="sm" href="https://x.com/jsoncrack" rel="noopener">
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaXTwitter size={20} />
                </ThemeIcon>
              </Anchor>
              <Anchor
                aria-label="GitHub"
                href="https://github.com/lxiaolong068/jsonformat"
                fz="sm"
                rel="noopener"
              >
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaGithub size={20} />
                </ThemeIcon>
              </Anchor>
              <Anchor
                aria-label="Discord"
                fz="sm"
                href="https://discord.com/invite/yVyTtCRueq"
                rel="noopener"
              >
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaDiscord size={20} />
                </ThemeIcon>
              </Anchor>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Flex gap="xl">
        <Text fz="sm" c="dimmed">
          {dayjs().get("year")} JsonFormat
        </Text>
        <Anchor component={Link} prefetch={false} fz="sm" c="dimmed" href="/legal/terms">
          <Text fz="sm" c="dimmed">
            {getTranslation("terms")}
          </Text>
        </Anchor>
        <Anchor component={Link} prefetch={false} fz="sm" c="dimmed" href="/legal/privacy">
          <Text fz="sm" c="dimmed">
            {getTranslation("privacy")}
          </Text>
        </Anchor>
      </Flex>
    </Container>
  );
};
