/*
i18nT
author: Bartlomiej Obecny obecny@interia.pl
translation module for angular
generated on:
2014-02-05 00:30 version: 0.0.1 
*/

angular.module("i18nT", ["ng"]).run([
    "$i18nT",
    function ($i18nT) {
        'use strict';
        if (!$i18nT.getLanguage()) {
            throw("i18nT: no language set, use setDefaultLanguage");
        }
    }
]);

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

angular.module("i18nT").filter("i18nT", [
    "$i18nT",
    function ($i18nT) {
        'use strict';
        var cache = {},
            cacheKey;
        return function (key, arr) {
            var getTranslation,
                replacePluralRules,

                params,
                plurals,
                translation;

            cacheKey = $i18nT.getLanguage() + "__" + key + "__" + JSON.stringify(arr || "");
            if (cache[cacheKey]) {
                return cache[cacheKey];
            }
            getTranslation = function (pluralRules, translation, params) {
                var i, length, re, rule;
                for (i = 0, length = pluralRules.length; i < length; i++) {
                    if (eval(pluralRules[i])) {
                        rule = i + 1;
                        break;
                    }
                }
                if (rule > 0) {
                    translation = translation[rule];
                }
                angular.forEach(params, function (value, key) {
                    re = new RegExp("\\$" + key, "g");
                    translation = translation.replace(re, value);
                });
                return translation;
            };

            replacePluralRules = function (rules, params) {
                var re, newRules;
                newRules = angular.copy(rules);
                angular.forEach(rules, function (ruleValue, ruleKey) {
                    angular.forEach(params, function (value, key) {
                        re = new RegExp("\\b" + key, "g");
                        newRules[ruleKey] = newRules[ruleKey].replace(re, angular.isNumber(value) ? Math.abs(value) : "'" + value + "'");
                    });
                });
                return newRules;
            };

            params = (arr || [])[0];
            translation = $i18nT.getTranslations(key);
            if (translation) {
                plurals = replacePluralRules($i18nT.getPlurals(translation), params);
            }

            if (translation && typeof translation !== "string") {
                if (params) {
                    translation = getTranslation(plurals, translation, params);
                } else {
                    //clear translation as it is missing parameters
                    translation = "";
                }
            }
            else {
                if (params) {
                    translation = getTranslation([], translation, params);
                }
            }
            cache[cacheKey] = translation;
            return translation ? translation || key : key;
        };
    }
]);

angular.module("i18nT").directive("i18nT".toLowerCase(), [
    '$filter',
    function ($filter) {
        'use strict';
        var i18nT;

        i18nT = $filter("i18nT");

        return {
            restrict: 'AE',
            scope: true,
            link: function linkFn(scope, element, attr) {
                attr.$observe("i18nT".toLowerCase(), function (i18nKey) {
                    if (!scope.i18nKey) {
                        scope.i18nKey = i18nKey;
                        element.html(i18nT(i18nKey));
                    }
                });
                scope.$on('i18nTLanguageChange', function () {
                    element.html(i18nT(scope.i18nKey));
                });
            }
        };
    }
]);
