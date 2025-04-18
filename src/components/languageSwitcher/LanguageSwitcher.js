import { useLocale } from "@/context/LocaleContext";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { locale, changeLocale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Current language display
  const currentLanguage = locale === "en" ? "English" : "العربية";
  const languageIcon = locale === "ar" ? "ع" : "En";

  // Handle language change
  const handleLanguageChange = (newLocale) => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 inline-flex items-center justify-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
      >
        <span className="text-gray-400 w-5 text-center">{languageIcon}</span>
        <span className="hidden lg:inline ml-1">{currentLanguage}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                locale === "en" ? "bg-gray-50 font-medium" : ""
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("ar")}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                locale === "ar" ? "bg-gray-50 font-medium" : ""
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
