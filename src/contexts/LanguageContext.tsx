import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import enCommonTranslations from "../../public/locales/en/common.json";
import zhCommonTranslations from "../../public/locales/zh/common.json";
import jaCommonTranslations from "../../public/locales/ja/common.json";
import koCommonTranslations from "../../public/locales/ko/common.json";
import deCommonTranslations from "../../public/locales/de/common.json";
import enEditorTranslations from "../../public/locales/en/editor.json";
import zhEditorTranslations from "../../public/locales/zh/editor.json";
import jaEditorTranslations from "../../public/locales/ja/editor.json";
import koEditorTranslations from "../../public/locales/ko/editor.json";
import deEditorTranslations from "../../public/locales/de/editor.json";

type CommonTranslations = typeof enCommonTranslations;
type EditorTranslations = typeof enEditorTranslations;
type Translations = CommonTranslations & EditorTranslations;
type Language = "en" | "zh" | "ja" | "ko" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string>) => string;
}

const translations: Record<Language, Translations> = {
  en: { ...enCommonTranslations, ...enEditorTranslations },
  zh: { ...zhCommonTranslations, ...zhEditorTranslations },
  ja: { ...jaCommonTranslations, ...jaEditorTranslations },
  ko: { ...koCommonTranslations, ...koEditorTranslations },
  de: { ...deCommonTranslations, ...deEditorTranslations },
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
    if (router?.locale && (router.locale === "en" || router.locale === "zh" || router.locale === "ja" || router.locale === "ko" || router.locale === "de")) {
      setLanguage(router.locale as Language);
      localStorage.setItem("language", router.locale);
    } else {
      // 如果URL中没有locale参数，则从localStorage获取保存的语言设置
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh" || savedLanguage === "ja" || savedLanguage === "ko" || savedLanguage === "de")) {
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