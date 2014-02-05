(function () {
    'use strict';
    angular.module('myFirstApp').config([
        "$i18nTProvider",
        function ($i18nTProvider) {
            $i18nTProvider
                .translations("en", {
                    SHOW_HELLO: "Show Hello",
                    THIS_IS_HELLO: "This is Hello",
                    CHOOSE_LANG: "Choose language",
                    EN: "English",
                    PL: "Polish",
                    MAIN: {
                        HELLO: "Hello World !",
                        DESCRIPTION: "This is example of using i18nT"
                    },
                    POSTS:{
                        INFO: [
                            "defaults",
                            "You have no posts",
                            "You have $n post",
                            "You have $n posts"
                        ],
                        PERSON_POSTS: ["myOwnFilter",
                            "no one commented yet",
                            "$first commented",
                            "$first and $second commented",
                            "$first, $second and $k more person commented",
                            "$first, $second and $k people commented"
                        ]
                    }
                },
                {
                    //defaults is always needed, the rest is optional
                    defaults: [
                        "n===0",
                        "n===1",
                        "true"
                    ],
                    myOwnFilter: [
                        "n===0",
                        "n===1",
                        "n===2",
                        "n===3",
                        "true"
                    ]
                }
            );
            //setting the default language
            $i18nTProvider.setDefaultLanguage("en");
        }]
    );
}());
