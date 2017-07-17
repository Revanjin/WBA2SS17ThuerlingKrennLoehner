# Willkommen bei **FM² Find Mates for Matches**
## Vorbereitung
Damit alles einwandfrei funktioniert wird [node.js](https://nodejs.org/en/download/) & [MongoDB](https://www.mongodb.com/download-center) benötigt.

Stelle sicher, dass beide Komponenten installiert sind
mit den Befehlen:

`node -v `

`mongod --version`


***
## Verwendung
Klone das Repo
`git clone https://github.com/Revanjin/WBA2SS17ThuerlingKrennLoehner.git`
Navigiere in den Ordner Dienstgeber /-nutzer und führe `npm install` und anschließend `npm start` durch

`cd WBA2SS17ThuerlingKrennLoehner/FM_Dienstgeber npm install`

`cd WBA2SS17ThuerlingKrennLoehner/FM_Dienstgeber npm start`

`cd WBA2SS17ThuerlingKrennLoehner/FM_Dienstnutzer npm install`

`cd WBA2SS17ThuerlingKrennLoehner/FM_Dienstnutzer npm start`

Wenn beide Applikationen gestartet sind navigiere in deinem Browser auf [http://localhost:8001](http://localhost:8001) und starte durch!
Alternativ können via REST-Client folgende Ressourcen angesprochen werden
### GET
<pre>/login</pre>
<pre>/logout</pre>
<pre>/dashboard</pre>
<pre>/dashboard/get-data</pre>
### POST
<pre>/login</pre>
<pre>/logout</pre>
<pre>/dashboard/insert</pre>
<pre>/dashboard/update</pre>
<pre>/dashboard/delete</pre>

Viel Spass beim finden neuer Onlinekollegen! 👍
