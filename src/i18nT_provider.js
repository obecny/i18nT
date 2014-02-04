angular.module("i18nT").provider("$i18nT", [
    function () {
        'use strict';
        var
            i18nLanguage = "",
            i18nPlurals = {},
            i18nT = {},
            i18nTranslations = {},

            flatten,
            getLanguage,
            getPlurals,
            getTranslations,
            setLanguage,
            translations;

//            converts json to 1 level concatenated with dot
        flatten = function (i18nJson, previousKey) {
            var translationsKeys = {};
            previousKey = previousKey ? previousKey + "." : "";

            angular.forEach(i18nJson, function (value, key) {
                if (angular.isString(value) || angular.isArray(value)) {
                    translationsKeys[previousKey + key] = value;
                } else {
                    angular.extend(translationsKeys, flatten(value, previousKey + key));
                }
            });
            return translationsKeys;
        };

        getLanguage = function () {
            return  i18nLanguage;
        };

        getPlurals = function (translation) {
            var key;
            if (angular.isArray(translation)) {
                key = translation[0];
            } else {
                key = "defaults";
            }
            //plurals rule are everytime changed based on params, that's why we need a fresh copy
            return angular.copy(i18nPlurals[i18nLanguage][key]);
        };

        getTranslations = function (key) {
            return i18nTranslations[i18nLanguage][key];
        };

        setLanguage = function (language) {
            i18nLanguage = language;
        };

        translations = function (language, i18nJson, plurals) {
            i18nTranslations[language] = flatten(i18nJson);
            i18nPlurals[language] = plurals;
        };
        this.$get = [
            "$rootScope",
            function ($rootScope) {
                i18nT.getLanguage = getLanguage;
                i18nT.getPlurals = getPlurals;
                i18nT.getTranslations = getTranslations;
                i18nT.setLanguage = function (language) {
                    setLanguage(language);
                    //notify directive
                    $rootScope.$broadcast('i18nTLanguageChange');
                };
                return i18nT;
            }
        ];

        this.translations = translations;
        this.setDefaultLanguage = setLanguage;
    }
]);
