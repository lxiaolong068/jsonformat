import React from "react";
import Link from "next/link";
import { Button, Stack, Text, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { SEO } from "src/constants/seo";
import Layout from "src/layout/PageLayout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <NextSeo {...SEO} title="404 | JsonFormat" noindex />
      <Stack mt={100} justify="center" align="center">
        <Title fz={150} style={{ fontFamily: "monospace" }}>
          404
        </Title>
        <Title order={2}>{t('notFound.title', 'Nothing to see here')}</Title>
        <Text c="dimmed" maw={800} style={{ textAlign: "center" }}>
          {t('notFound.description', 'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.')}
        </Text>
        <Link href="/">
          <Button size="lg" color="gray" type="button">
            {t('notFound.goHome', 'Go Home')}
          </Button>
        </Link>
      </Stack>
    </Layout>
  );
};

export default NotFound;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
