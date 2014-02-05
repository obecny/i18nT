i18nT
=====

angular translation module with custom filters for different languages
with regex support

Live example:

<a href="http://i18nt.obecny.eu/" target="_blank">i18nt.obecny.eu</a>


This is example of using i18nT

1. Directive <br>
    &lt;p ng-bind="'MAIN.HELLO' | i18nT"&gt;&lt;/p&gt;<br>

2. Filter <br>
    &lt;span&gt;{{'POSTS.INFO' | i18nT:[{n:post}]}}&lt;/span&gt;<br>
    &lt;span&gt;{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'male',n:post,k:post-2,first:'Peter',second:'John'}]}}&lt;/span&gt;<br>
    &lt;span&gt;{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'female',n:post,k:post-2,first:'Anna',second:'Christine'}]}}&lt;/span&gt;<br>
<br>
3. In Controller<br>
    alert(i18nT('MAIN.HELLO'));<br>

<br>

