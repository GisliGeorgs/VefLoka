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

Hugmyndin að síðunni var sú að bjóða notendum upp á sína eigin persónulegu dagbók á netinu.
Til þess þarf að vera hægt að búa til notendanafn og læsa því með lykilorði. Lykilorðið má einnig
ekki vera auðvelt að ná í gegnum árásir á vefsíðuna. Auk þeirrar virkni að geta haldið sína eigin
dagbók þá fannst okkur góð hugmynd að búa til þann möguleika að láta dagbókarfærslu koma upp á forsíðunni.
Þetta lætur forsíðuna vera nokkurs konar opið blogg og hver sem er getur sett sína grein þar.

Verkefnið var leyst með erfiðleikum í byrjun. Ekkert gekk og ekki náðist að tengjast gagnagrunni
í PGAdmin. Eina lausnin á því sem við fundum var að prófa beint á Heroku.
Það var leiðinlegt og gekk ekkert sérlega vel þangað til ákveðið var að færa verkefnið
af Dropbox yfir á github.

Notast var við Express. Til að auðvelda nokkra hluti eins og notenda
umsjón, innskráningu og svoleiðis ásamt grunni fyrir notkun SQL með Express í gegnum Postgre 
og Heroku fengum við mikla hjálp frá dæmi sem tekið var í fyrirlestri 22. 
Við notuðum við nokkra hluti úr lausnum okkar á verkefni 3, dagbókinni með færslum
geymdar í localStorage.

Það helsta sem fór úrskeiðis og lengdi þróunartíma töluvert er það sem var nefnt
hér að ofan, það að ekki tókst að tengjast eða búa til Postgre gagnagrunna í
okkar eigin tölvum. Það var því ekki hægt að prófa síðuna án þess að 'deploya'
á Heroku. Einnig lentum við stundum í vandræðum eftir að skipt var yfir á Github.
Það var aðallega vegna þess að enginn okkar er sérstaklega góður í að nota Github.
