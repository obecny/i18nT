(function () {
    'use strict';
    angular.module("myFirstApp").controller("HelloController", [
        "$scope",
        "$i18nT",
        "$filter",
        function ($scope, $i18nT, $filter) {
            var i18nT;
            i18nT = $filter("i18nT");
            $scope.setLang = function (lang) {
                $i18nT.setLanguage(lang);
            };
            $scope.showHello = function () {
                alert(i18nT('THIS_IS_HELLO'))
            };
        }
    ]);
}());