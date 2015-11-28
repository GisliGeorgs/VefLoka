# Lokaverkefni Vefforritun 2015
### Egill Örn Sigurjónsson,
#### eos21@hi.is
### Gísli Georgsson,
#### gig26@hi.is
### Guðmundur Sigurðsson, 
#### gus97@hi.is

## readme
Hægt er að skoða og nota vefsíðuna á [vefloka.herokuapp.com](https://vefloka.herokuapp.com/)

En ef þú vilt setja upp verkefnið heima hjá þér. Er það gert svona.

1. Setja upp gagnagrunn með hjálp `sql.sql`
1. Setja inn hlekk á gagnagrunninn í `.env`
1. `> npm install`
1. `> npm start`

Hægt er að nota JSHint með því fylgja eftirfarandi leiðbeiningum

1. Opna góðan console glugga í möppunni
1. `> gulp` eða `> gulp jshint`

## Annað

Verkefnið var leyst með svita og tárum. Ekki náðist að tengjast gagnagrunni
í tölvum okkar þannig að það þurfti að prófa og þróa með Heroku beint. Að 
gera smá breytingar og svo þurfa að hlaða þeim upp á Heroku var ekki 
skemmtilegt ferli. Það batnaði hins vegar til munar þegar ákveðið var að
færa verkefnið yfir á Github.

Byrjað var á því að ákveða sirka hvaða virkni átti að vera. Svo var farið í það
að útfæra þá virkni, aðallega byrjað á að gera bakendan og fá grunnvirkni upp.
Síðan var farið í flóknari hlutina. Þá var endað á að fá flott, gott og rétt
útlit á síðuna.

Hugsunarferli

Það helsta sem fór úrskeiðis og lengdi þróunartíma töluvert er það sem var nefnt
hér að ofan, það að ekki tókst að tengjast eða búa til Postgre gagnagrunna í
okkar eigin tölvum. Það var því ekki hægt að prófa síðuna án þess að 'deploya'
á Heroku