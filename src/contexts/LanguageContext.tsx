import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import enTranslations from "../../public/locales/en/common.json";
import zhTranslations from "../../public/locales/zh/common.json";
import jaTranslations from "../../public/locales/ja/common.json";

type Translations = typeof enTranslations;
type Language = "en" | "zh" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string>) => string;
}

const translations: Record<Language, Translations> = {
  en: enTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 从localStorage获取语言设置，默认为英文
  const [language, setLanguage] = useState<Language>("en");
  const router = typeof window !== "undefined" ? useRouter() : null;

  useEffect(() => {
    // 首先检查URL中的locale参数
    if (router?.locale && (router.locale === "en" || router.locale === "zh" || router.locale === "ja")) {
      setLanguage(router.locale as Language);
      localStorage.setItem("language", router.locale);
    } else {
      // 如果URL中没有locale参数，则从localStorage获取保存的语言设置
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh" || savedLanguage === "ja")) {
        setLanguage(savedLanguage);
      }
    }
  }, [router?.locale]);

  useEffect(() => {
    // 当语言变化时保存到localStorage
    localStorage.setItem("language", language);
    // 设置文档的lang属性
    document.documentElement.lang = language;
  }, [language]);

  // 翻译函数
  const t = (key: string, options?: Record<string, string>): string => {
    // 按照点表示法分割键
    const keys = key.split(".");
    let value: any = translations[language];

    // 遍历键路径获取翻译值
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回键名
        return key;
      }
    }

    // 如果值是字符串且有插值选项
    if (typeof value === "string" && options) {
      return Object.entries(options).reduce((acc, [optKey, optValue]) => {
        return acc.replace(new RegExp(`\\{\\{${optKey}\\}\\}`, "g"), optValue);
      }, value);
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};