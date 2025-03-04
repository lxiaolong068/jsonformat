import React from "react";
import { Container, Title, Accordion } from "@mantine/core";
import { useLanguage } from "src/contexts/LanguageContext";
import EnQuestions from "src/data/faq.json";
import ZhQuestions from "src/data/faq.zh.json";
import JaQuestions from "src/data/faq.ja.json";
import KoQuestions from "src/data/faq.ko.json";
import DeQuestions from "src/data/faq.de.json";

export const FAQ = () => {
  const { language } = useLanguage();
  const Questions = language === "zh" ? ZhQuestions : 
                   language === "ja" ? JaQuestions : 
                   language === "ko" ? KoQuestions :
                   language === "de" ? DeQuestions :
                   EnQuestions;
  
  return (
    <Container id="faq" component="section" size="sm" py={80}>
      <Title
        c="black"
        order={2}
        fz={{
          base: 24,
          xs: 30,
          sm: 36,
        }}
        fw={600}
        mb={60}
        ta="center"
      >
        {language === "zh" ? "常见问题" : 
         language === "ja" ? "よくある質問" : 
         language === "ko" ? "자주 묻는 질문" :
         language === "de" ? "Häufig gestellte Fragen" :
         "Frequently Asked Questions"}
      </Title>
      <Accordion
        variant="separated"
        styles={{
          panel: {
            background: "#f9f9f9",
            color: "#1d1d1d",
          },
          label: {
            color: "#1d1d1d",
            fontWeight: 500,
          },
          item: {
            background: "#f9f9f9",
            color: "#1d1d1d",
            overflow: "hidden",
            border: "1px solid #ededed",
            borderRadius: 12,
            fontWeight: 300,
          },
        }}
      >
        {Questions.map(({ title, content }) => (
          <Accordion.Item key={title} value={title}>
            <Accordion.Control>{title}</Accordion.Control>
            <Accordion.Panel>{content}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};
