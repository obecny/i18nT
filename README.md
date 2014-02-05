i18nT
=====

angular translation module with custom filters for different languages
with regex support

This is example of using i18nT

1. Directive
    <p ng-bind="'MAIN.HELLO' | i18nT"></p>

2. Filter
    <span>{{'POSTS.INFO' | i18nT:[{n:post}]}}</span>
    <span>{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'male',n:post,k:post-2,first:'Peter',second:'John'}]}}</span>
    <span>{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'female',n:post,k:post-2,first:'Anna',second:'Christine'}]}}</span>

3. In Controller
    alert(i18nT('MAIN.HELLO'));

