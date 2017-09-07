# Anis Hakbot

Bot der Ru ein wenig aufmöbelt

## Features 
* HakBot - Verteilt automatisch Hak 
* CommentBot - Links werden anklickbar, Youtube Videos und Images automatisch eingeblendet 
* Blacklists - User die auf den Blacklists stehen bekommen kein Hak 
	* Blacklist nach Disqus ID: User können per Dropdown im Commentar auf die Disqus Blacklist gesetzt und von dieser entfernt werden 
	* Blacklist nach Namepattern: Namepattern, also Usernames oder Clans können per Formular in der Blacklist Konfiguration geblacklisted werden 
* Erweiterter Kommentar Editor - Icons für Fettschrift, Kursiv, Unterstrichen oder Durchgestrichen werden beim Kommentarfeld eingeblendet Wird ein Text im Kommentar markiert und einer der Knöpf gedrückt werden die notwendigen HTML Tags gesetzt um den Text so darzustellen 
* Zinkus Button - Reloadet das Disqus Plugin um im Falle von Zinkus nicht ganze RU Seite neuladen zu müssen 
* Kommentare nachladen - Neue Kommentare und Antworten werden automatisch nachgeladen 
* Hak Bot,Komentare nachladen, automatischer Reload des Disqus Plugins können per Userinterface ausgeschaltet werden 
* Statusanzeige im Communitynamen (Rot=Bot aus, Grün=Bot an) 
* Bot differenziert zwischen den Seiten, er startet nur, wenn die Seite ihm bekannt ist.
* Makros - User können sich Texte als Makro speichern und diese per Mausklick posten/als Antwort schicken
* Fakelinkchecker - Überprüft ob Rapupdate Links zu Artikeln führen oder nicht, Fakes werden durch "(Fake!)" hervorgehoben
* Links werden Postbar gemacht - Wenn ein link eingegeben wird, wird dieser in Postbare Form gebracht
* Kommentare können vorgelesen werden
* Neue Artikel Checker - Bringt Infofeld über Kommentarbereich, Webnotification und automatischen Wechsel auf neuen Kommentar
* FastSend - Abschicken von Kommentaren per Enter, Neue Zeile per Shift+Enter
* Show Downvotes - Zeigt einen kleinen Counter mit Downvotes an. Beta: Daten sind nicht immer Korrekt!

## TODO - Weitere Todos finden sich in der Issues Liste

* ~~Erweiterte Tags im Advanced Editor~~
* ~~Makros können verschoben werden~~
* ~~Makros Bearbeiten hinzufügen~~
* ~~Advanced Editor lädt nicht immer~~
* ~~Bugfixing hinsichtlich Antwortmakros~~
* ~~Antwort Makros~~
* ~~Kommentar Makros~~
* ~~Repost Bot bei Antworten-Bug beheben~~
* ~~Blacklist Interface Benutzerfreundlicher machen~~
* ~~Blacklist Dropdown Link entsprechend der Dahinterliegenden Funktion beschriften~~

## Installation
<a href="https://www.youtube.com/embed/H6CuLzc17xY">Installationsanleitung - Youtube Video</a>

Als Skript verwendet die <a href="https://github.com/rapupdate/AnisHakbot/blob/master/Hakbot.user.js">Hakbot.user.js</a> aus diesem Repository

## Known Bugs:
* Hin und wieder Abmeldung von Disqus. 
	* Anmeldung nicht immer direkt wieder möglich, dauert manchmal moment oder Browser muss neu geladen
* Wird manchmal nicht richtig injeziert

## FAQ
<details> 
  <summary>Was hast du davon?</summary>
  <blockquote>Ich habe den Hakbot ursprünglich für mich entwickelt.<br>
  Als Buddha dann kam und geile Funktionen einbaute, dachte ich, ich kann das auch. Rausgekommen ist eine RU-Toolbox.<br>
  Mir macht die Entwicklung des "HakBots" Spaß, das ist mein einziger Motivator, neben eurer dankbarkeit und der optimierung meines RU 	Erlebnisses</blockquote>
</details> 
<details> 
  <summary>Wirst du mich leaken wenn ich den Bot nutze</summary>
  <blockquote>
   Ich weiß dass ist nicht viel Wert, aber ich habe kein Interesse an irgendwelchen Leaks.<br>
   Ich bin kein Hurensohn und finde jeder sollte sorgenfrei RU nutzen können.<br>
   Ich habe keine Ahnung wer meinen Bot benutzt und ich habe auch nicht vor dies zu ändern.<br>
   Sämtliche HTTP Requests werden über die GM_XMLHTTPrequest Schnittstelle versendet, so werdet ihr, wenn es ein neues Ziel gibt jedes mal informiert wenn es einen neuen Zielserver gibt. Bis auf rapupdate.de ist es bisher allerdings nicht notwendig dass ihr andere Ziele akzeptiert.
   </blockquote>
</details> 
<details> 
  <summary>Ahhhhhhh ich will nicht gebannt werden...</summary>
  <blockquote>
  Das wollen wir alle nicht.<br>
  Bisher ist noch niemand der meinen Bot benutzt hat gebannt worden. Ich benutze den Bot inzwischen seit 3 Monaten ohne Ban.<br>
  Wenn euch der Hakbot zu unsicher ist, könnt ihr ihn aber auch ausschalten und die anderen tollen Funktionen der Toolbox verwenden.
  </blockquote>
</details>
<details> 
  <summary>Was ist dieses Fakelinkchecker?</summary>
  <blockquote>
  Diese Funktion überprüft ob die von Usern geposteten Links auf "Rapupdate Artikel" wirklich existieren.<br>
  Existiert der Link nicht, so wird dieser durch "(FAKE!)" gekennzeichnet.<br><br>
  Die Fakelink Funktion benötigt XMLHTTPRequests. Diese können auch missbraucht werden. Der Hakbot wird nur Requests in Richtung rapupdate.de absetzen, auf diese Weise garantiere ich euch, dass ich eure Daten nicht abfangen kann. Sollte es eine Änderung mit den XMLHTTPrequests geben, werde ich diese per Popup mitteilen und euch die möglichkeit geben diese, wie auch den Fakelinkchecker zu deaktivieren!
  </blockquote>
</details>
<details> 
  <summary>Ich habe den Fakelinkchecker aktiviert/deaktiviert und will das andere!</summary>
  <blockquote>
	Kein Problem:
	Öffne einfach die Einstellungen und entferne/setze das häkchen bei Fakelinkchecker.
  </blockquote>
</details>
<details> 
  <summary>Fakelinkchecker Domain nicht zugelassen, was nun?</summary>
  <blockquote>
   Dieses Problem entsteht wenn ihr im Tampermonkey Popup nicht die Domain zugelassen habt oder diese sogar Aktiv gesperrt habt.<br>
   <ul>
   <li>Solltet ihr versehendlich die Domain gesperrt haben:
   <ol>
    	<li> Clickt auf das Tampermonkey Icon in eurem Browser.
	<li> Rechtsklick auf "RU-Bot.
 	<li> Einstellungen.
 	<li> Entfernt "rapupdate.de" aus der "Domain Negativliste" im Unterpunkt "XHR-Sicherheit".
 	<li> Fügt "rapupdate.de" zu "Benutzer-definierte Domain-Positivlist" im Unterpunkt "XHR-Sicherheit" hinzu.
 	<li> Ladet die Rapupdate Seite neu
	</ol>
   <li> Solltet ihr absichtlich die Domain gesperrt haben weil ihr keinen XMLHTTP-Request zu Rapupdate zulassen wollt:
   <ol>
   	<li> Clickt auf das Tampermonkey Icon in eurem Browser.
 	<li> Rechtsklick auf "RU-Bot.
 	<li> Speicher.
 	<li> Sucht den Eintrag ""checkLinks": true" und setzt ihn auf false
	<li> Ladet die Rapupdate Seite neu
	</ol>
	</ul>
	</blockquote>
  </details> 
  <details> 
  <summary>Ich will aber keine automatischen Updates</summary>
  <blockquote>Das kann abgestellt werden indem die Zeilen "UpdateURL" und DownloadURL aus den Kopfdaten gelöscht werden
  </blockquote>
</details> 

## Screenshots
<details> 
  <summary>Übersicht </summary>
  <img src="https://github.com/rapupdate/AnisHakbot/blob/master/HakBot%20%C3%9Cbersicht.PNG">
  </details> 
  <details> 
   <summary>Youtube Einbettung </summary>
<img src="https://github.com/rapupdate/AnisHakbot/blob/master/HakBot%20Youtube%20Embed.PNG">
</details> 
  <details> 
   <summary>Bild Einbettung </summary>
<img src="https://github.com/rapupdate/AnisHakbot/blob/master/HakBot%20Image%20Embed.PNG">
	</details> 
  <details> 
   <summary>Makro Seite </summary>
<img src="https://github.com/rapupdate/AnisHakbot/blob/master/HakBot%20Makros.PNG"> 

</details>
