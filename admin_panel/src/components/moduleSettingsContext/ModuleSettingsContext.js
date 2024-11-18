// ModuleSettingsContext.js (now AdminSettingsContext.js)
import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../common/LocalStorageService";

const ModuleSettingsContext = createContext();

export const useModuleSettings = () => useContext(ModuleSettingsContext);

export const ModuleSettingsProvider = ({ children }) => {
    const defaultSettings = {
        filter: "all",
        search: "",
        page: 1,
        limit: 10,
        lang: "ENGLISH",
    };

    const [settings, setSettings] = useState(getLocalStorageItem("adminSettings", defaultSettings));

    useEffect(() => {
        setLocalStorageItem("adminSettings", settings);
    }, [settings]);

    const setFilter = (filter) => {
        setSettings((prev) => ({ ...prev, filter }));
    };

    const setSearch = (search) => {
        setSettings((prev) => ({ ...prev, search }));
    };

    const setPage = (page) => {
        setSettings((prev) => ({ ...prev, page }));
    };

    const setLimit = (limit) => {
        setSettings((prev) => ({ ...prev, limit }));
    };

    const setLang = (lang) => {
        setSettings((prev) => ({ ...prev, lang }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
    };

    return (
        <ModuleSettingsContext.Provider value={{ ...settings, setFilter, setSearch, setPage, setLimit, setLang, resetSettings }}>
            {children}
        </ModuleSettingsContext.Provider>
    );
};










// // ModuleSettingsContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getLocalStorageItem, setLocalStorageItem } from "../../common/LocalStorageService";

// const ModuleSettingsContext = createContext();

// export const useModuleSettings = () => useContext(ModuleSettingsContext);

// export const ModuleSettingsProvider = ({ children }) => {
//     const [filter, setFilter] = useState(getLocalStorageItem("filter", "all"));
//     const [search, setSearch] = useState(getLocalStorageItem("search", ""));
//     const [page, setPage] = useState(getLocalStorageItem("page", 1));
//     const [limit, setLimit] = useState(getLocalStorageItem("limit", 10));
//     const [language, setLanguage] = useState(getLocalStorageItem("language", "english"));

//     useEffect(() => {
//         setLocalStorageItem("filter", filter);
//     }, [filter]);

//     useEffect(() => {
//         setLocalStorageItem("search", search);
//     }, [search]);

//     useEffect(() => {
//         setLocalStorageItem("page", page);
//     }, [page]);

//     useEffect(() => {
//         setLocalStorageItem("limit", limit);
//     }, [limit]);

//     useEffect(() => {
//         setLocalStorageItem("language", language);
//     }, [language]);

//     const resetSettings = () => {
//         setFilter("all");
//         setSearch("");
//         setPage(1);
//         setLimit(10);
//         setLanguage("english");
//     };

//     return (
//         <ModuleSettingsContext.Provider value={{ filter, setFilter, search, setSearch, page, setPage, limit, setLimit, language, setLanguage, resetSettings }}>
//             {children}
//         </ModuleSettingsContext.Provider>
//     );
// };
