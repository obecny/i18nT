i18nT
=====

angular translation module with custom filters for different languages
with regex support

This is example of using i18nT

{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'male',n:post,k:post-2,first:'Peter',second:'John'}]}}
{{'POSTS.PERSON_POSTS' | i18nT:[{gender:'female',n:post,k:post-2,first:'Anna',second:'Christine'}]}}

index 	simple case 	male case 	female case
0 	You have no posts 	no one commented yet 	no one commented yet
1 	You have 1 post 	Peter commented 	Anna commented
2 	You have 2 posts 	Peter and John commented 	Anna and Christine commented
3 	You have 3 posts 	Peter, John and 1 more person commented 	Anna, Christine and 1 more person commented
6 	You have 6 posts 	Peter, John and 4 people commented 	Anna, Christine and 4 people commented
8 	You have 8 posts 	Peter, John and 6 people commented 	Anna, Christine and 6 people commented
21 	You have 21 posts 	Peter, John and 19 people commented 	Anna, Christine and 19 people commented
22 	You have 22 posts 	Peter, John and 20 people commented 	Anna, Christine and 20 people commented
25 	You have 25 posts 	Peter, John and 23 people commented 	Anna, Christine and 23 people commented
27 	You have 27 posts 	Peter, John and 25 people commented 	Anna, Christine and 25 people commented
