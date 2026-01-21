import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "pl" | "en";

type Translations = {
  home: string;
  list: string;
  add: string;
  delete: string;
  addTitle: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  save: string;
  peopleList: string;
  noPeople: string;
  deleteTitle: string;
  deleted: string;
};

const translations: Record<Language, Translations> = {
  pl: {
    home: "Strona główna",
    list: "Lista",
    add: "Dodaj osobę",
    delete: "Usuń osobę",
    addTitle: "Dodaj nową osobę",
    firstName: "Imię",
    lastName: "Nazwisko",
    birthDate: "Data urodzenia",
    phone: "Telefon",
    email: "Email",
    address: "Adres",
    save: "Zapisz",
    peopleList: "Lista osób",
    noPeople: "Brak zapisanych osób",
    deleteTitle: "Usuń osoby",
    deleted: "Osoba usunięta",
  },
  en: {
    home: "Home",
    list: "List",
    add: "Add person",
    delete: "Delete person",
    addTitle: "Add new person",
    firstName: "First name",
    lastName: "Last name",
    birthDate: "Birth date",
    phone: "Phone",
    email: "Email",
    address: "Address",
    save: "Save",
    peopleList: "People list",
    noPeople: "No people added yet",
    deleteTitle: "Delete people",
    deleted: "Person removed",
  },
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
