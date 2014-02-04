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
