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

## TODO

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

## FAQ
<details> 
  <summary>Was hast du davon?</summary>
  <blockquote>Ich habe den Hakbot ursprünglich für mich entwickelt.
  Als Buddha dann kam und geile Funktionen einbaute, dachte ich, ich kann das auch. Rausgekommen ist eine RU-Toolbox.
  Mir macht die Entwicklung des "HakBots" Spaß, das ist mein einziger Motivator, neben eurer dankbarkeit und der optimierung meines RU 	Erlebnisses</blockquote>
</details> 
<details> 
  <summary>Wirst du mich leaken wenn ich den Bot nutze</summary>
  <blockquote>
   Ich weiß dass ist nicht viel Wert, aber ich habe kein Interesse an irgendwelchen Leaks.
   Ich bin kein Hurensohn und finde jeder sollte sorgenfrei RU nutzen können.
   Ich habe keine Ahnung wer meinen Bot benutzt und ich habe auch nicht vor dies zu ändern.
   Sämtliche HTTP Requests werden über die GM_XMLHTTPrequest Schnittstelle versendet, so werdet ihr, wenn es ein neues Ziel gibt jedes mal informiert wenn es einen neuen Zielserver gibt. Bis auf rapupdate.de ist es bisher allerdings nicht notwendig dass ihr andere Ziele akzeptiert.
   </blockquote>
</details> 
<details> 
  <summary>Fakelinkchecker Domain nicht zugelassen</summary>
  <blockquote>
   Dieses Problem entsteht wenn ihr im Tampermonkey Popup nicht die Domain zugelassen habt oder diese sogar Aktiv gesperrt habt.
   * Solltet ihr versehendlich die Domain gesperrt haben:
    	* Clickt auf das Tampermonkey Icon in eurem Browser.
	* Rechtsklick auf "RU-Bot.
 	* Einstellungen.
 	* Entfernt "rapupdate.de" aus der "Domain Negativliste" im Unterpunkt "XHR-Sicherheit".
 	* Fügt "rapupdate.de" zu "Benutzer-definierte Domain-Positivlist" im Unterpunkt "XHR-Sicherheit" hinzu.
 	* Ladet die Rapupdate Seite neu
   * Solltet ihr absichtlich die Domain gesperrt haben:
   	* Clickt auf das Tampermonkey Icon in eurem Browser.
 	* Rechtsklick auf "RU-Bot.
 	* Speicher.
 	* Sucht den Eintrag ""checkLinks": true" und setzt ihn auf false
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
