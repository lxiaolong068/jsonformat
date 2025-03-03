import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { SEO } from "src/constants/seo";
import { FAQ } from "src/layout/Landing/FAQ";
import { Features } from "src/layout/Landing/Features";
import { HeroPreview } from "src/layout/Landing/HeroPreview";
import { HeroSection } from "src/layout/Landing/HeroSection";
import { LovedBy } from "src/layout/Landing/LovedBy";
import { Section1 } from "src/layout/Landing/Section1";
import Layout from "src/layout/PageLayout";

export const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <NextSeo {...SEO} canonical="https://jsoncrack.com" />
      <HeroSection />
      <HeroPreview />
      <Section1 />
      <Features />
      <FAQ />
      <LovedBy stars={props.stars} />
    </Layout>
  );
};

export default HomePage;

export const getStaticProps = (async ({ locale }) => {
  try {
    const res = await fetch("https://api.github.com/repos/AykutSarac/jsoncrack.com");
    const data = await res.json();

    return {
      props: {
        stars: data?.stargazers_count || 0,
        ...(await serverSideTranslations(locale || "en", ["common"])),
      },
    };
  } catch (error) {
    return {
      props: {
        stars: 0,
        ...(await serverSideTranslations(locale || "en", ["common"])),
      },
    };
  }
}) satisfies GetStaticProps<{ stars: number }>;
