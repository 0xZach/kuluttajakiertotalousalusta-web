module.exports = {
    defaultLocale: 'fi-FI',
    locales: ['en-GB', 'fi-FI'],
    loadLocaleFrom: (lang, ns) => {
        return import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default);
    },
    pages: {
        '*': ['common'],
    },
    logBuild: false,
    localeDetection: false,
};
