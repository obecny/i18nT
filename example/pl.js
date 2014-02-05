(function () {
    'use strict';
    angular.module('myFirstApp').config([
        "$i18nTProvider",
        function ($i18nTProvider) {
            $i18nTProvider
                .translations("pl", {
                    SHOW_HELLO: "Pokaż cześć",
                    THIS_IS_HELLO: "To jest cześć",
                    CHOOSE_LANG: "Wybierz język",
                    EN: "Angielski",
                    PL: "Polski",
                    MAIN: {
                        HELLO: "Witaj świecie !",
                        DESCRIPTION: "To jest przykład użycia tłumaczenia i18nT"
                    },
                    POSTS:{
                        INFO: [
                            "defaults",
                            "Nie ma żadnych komentarzy",
                            "Masz jeden komentarz",
                            "Masz $n komentarze",
                            "Masz $n komentarzy"
                        ],
                        PERSON_POSTS: [
                            "myOwnFilter",
                            "nikt nie skomentował",
                            "$first skomentował",
                            "$first skomentowała",
                            "$first i $second skomentowali",
                            "$first i $second skomentowały",
                            "$first, $second oraz $k osoba skomentowała",
                            "$first, $second oraz pozostałe $k osoby skomentowały",
                            "$first, $second oraz pozostałych $k osób skomentowało"
                        ]
                    }
                },
                {
                    //defaults is always needed, the rest is optional
                    defaults: [
                        "n===0",
                        "n===1",
                        "(n%10>=2&&n%10<=4)&&(n%100<12||n%100>14)",
                        "true"
                    ],
                    myOwnFilter: [
                        "n===0",
                        "n===1&&gender==='male'",
                        "n===1&&gender==='female'",
                        "n===2&&gender==='male'",
                        "n===2&&gender==='female'",
                        "n===3",
                        "(n%10>=4&&n%10<=6)&&(n%100<14||n%100>16)",
                        "true"
                    ]
                }
            );
        }]
    );
}());
