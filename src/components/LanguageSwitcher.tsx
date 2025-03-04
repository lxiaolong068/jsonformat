import { Button, Menu } from "@mantine/core";
import { FaGlobe } from "react-icons/fa";
import { useRouter } from "next/router";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const { pathname, asPath, query } = router;
  
  const changeLanguage = (locale: string) => {
    // 更新LanguageContext中的语言状态
    setLanguage(locale as "en" | "zh" | "ja" | "ko" | "de");
    
    // 同时更新next-i18next的语言设置，通过路由切换
    router.push({ pathname, query }, asPath, { locale });
  };
  
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle" leftSection={<FaGlobe />}>
          {language === "en" ? "English" : 
           language === "zh" ? "中文" : 
           language === "ja" ? "日本語" : 
           language === "ko" ? "한국어" : 
           language === "de" ? "Deutsch" : "English"}
        </Button>
      </Menu.Target>
      
      <Menu.Dropdown>
        <Menu.Item onClick={() => changeLanguage("en")}>
          English
        </Menu.Item>
        <Menu.Item onClick={() => changeLanguage("zh")}>
          中文
        </Menu.Item>
        <Menu.Item onClick={() => changeLanguage("ja")}>
          日本語
        </Menu.Item>
        <Menu.Item onClick={() => changeLanguage("ko")}>
          한국어
        </Menu.Item>
        <Menu.Item onClick={() => changeLanguage("de")}>
          Deutsch
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSwitcher;