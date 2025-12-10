"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

import styles from './LanguageSwitcher.module.css';
import "@/lib/i18n";

type Props = {
  className?: string;
};

const LanguageSwitcher = ({ className }: Props) => {
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleChange = (locale: "en" | "th") => {
    if (locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
  };

  return (
    <Select
      className={styles.select}
      value={i18n.language as "en" | "th"}
      onChange={handleChange}
      options={[
        { value: "en", label: t("english") },
        { value: "th", label: t("thai") },
      ]}
    />
  );
};

export default LanguageSwitcher;
