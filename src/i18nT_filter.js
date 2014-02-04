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
