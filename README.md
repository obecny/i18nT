i18nT
=====

angular translation module with custom filters for different languages
with regex support

This is example of using i18nT

1. Directive
    &lt;p ng-bind="'MAIN.HELLO' | i18nT"&gt;&lt;/p&gt;

2. Filter
    &lt;span&gt;{{'POSTS.INFO' | i18nT:[{n:post}]}}&lt;/span&gt;
    &lt;span&gt;{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'male',n:post,k:post-2,first:'Peter',second:'John'}]}}&lt;/span&gt;
    &lt;span&gt;{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'female',n:post,k:post-2,first:'Anna',second:'Christine'}]}}&lt;/span&gt;

3. In Controller
    alert(i18nT('MAIN.HELLO'));

