# Lokaverkefni Vefforritun 2015
## Egill Örn Sigurjónsson,
### eos21@hi.is
## Gísli Georgsson,
### gig26@hi.is
## Guðmundur Sigurðsson, 
### gus97@hi.is

## readme
Hægt er að skoða og nota vefsíðuna á [vefloka.herokuapp.com](https://vefloka.herokuapp.com/)

En ef þú vilt setja upp verkefnið heima hjá þér. Er það gert svona.

1. Setja upp gagnagrunn með hjálp `sql.sql`
1. Setja inn hlekk á gagnagrunninn í `.env`
1. `> npm install`
1. `> npm start`

## Annað



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
}
```
###Hérna er líka kóði
Fjögur leading spaces

    function loginHandler( req, res, next ){
        var username = req.body.user;
        var password = req.body.pass;
    }
###Hlekkir

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

Or leave it empty and use the [link text itself].

[link text itself]: http://www.reddit.com

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
