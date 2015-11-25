#Lokaverkefni Vefforritun 2015
##Egill Örn Sigurjónsson, 
### eos21@hi.is
##Gísli Georgsson,
###gig26@hi.is
##Guðmundur Sigurðsson, 
###gus97@hi.is

###Vantar
* Verjast gegn XSS í markdown-vistun
  * [Sjá hér ](https://github.com/leizongmin/js-xss)
* 99% Villumeðhöndlun
* Form validation
  * Register  
  * Login
  * Change Password/User
* Exporta færslur í pdf?



###Lists
1. Fyrsta ætem
2. Annað
  * Unordered sub list
1. Talan skiptir ei máli
  1. Númeraður sublisti
4. Annað

###Code
```language-javascript
    function loginHandler( req, res, next ){
    var username = req.body.user;
    var password = req.body.pass;
    console.log('Userinn er ', username);
```
###Hérna er líka kóði
Fjögur leading spaces

    function loginHandler( req, res, next ){
    var username = req.body.user;
    var password = req.body.pass;
    console.log('Userinn er ', username);

###Hlekkir

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

Or leave it empty and use the [link text itself].

[link text itself]: http://www.reddit.com

###Myndir
Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

###Töflur
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

###Quotes
> Hérna er kvóti
> Þetta er enn sami kvóti

> Abramham Lincoln, 1798
