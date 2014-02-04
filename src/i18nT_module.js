angular.module("i18nT", ["ng"]).run([
    "$i18nT",
    function ($i18nT) {
        'use strict';
        if (!$i18nT.getLanguage()) {
            throw("i18nT: no language set, use setDefaultLanguage");
        }
    }
]);
