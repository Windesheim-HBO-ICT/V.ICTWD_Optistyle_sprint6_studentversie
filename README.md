# Welkom in Sprint 6
De tijd vliegt: sprint 6 alweer. Tijdens deze sprint ga je aan de slag met authenticatie en autorisatie. Tijdens de theorieweek maak je kennis met het implementeren van complexe authenticatie en autorisatievormen. 
Deze repository is de startrepo van deze sprint: hierin ga je veilig authenticatie en autorisatie realiseren onder begeleiding van de vakdocenten.

## What's new?
Inmiddels zijn we volledig losgekomen van onze MVC-app/SPA + API-constructie. De SPA is een volwaardige vervanging geworden van de MVC-app. Bovendien is .NET 10 sinds kort uit, dus we hebben ervoor gekozen om de projecten en nuget packages te updaten van 8.0 naar deze latest stable.
Ik kan je vertellen: het heeft heel wat bloed, zweet, en ChatGPT* gekost. 😮‍💨
Om te voorkomen dat CORS de API-calls tussen projecten blokkeert, hebben we een reverse proxy toegevoegd aan het SPA-project (zie Program.cs). We hebben hiervoor gebruikgemaakt van YARP (https://learn.microsoft.com/nl-nl/aspnet/core/fundamentals/servers/yarp/yarp-overview?view=aspnetcore-10.0).

*Uiteraard gebruiken wij ook GenAI. Voor ons gelden dezelfde regels als voor jullie: we zijn kritisch op wat het genereert en zetten het veilig en verantwoord in.

## What's not new?
We focussen ons meer en meer op het realiseren, zoals je wellicht gemerkt hebt. Daarbij moeten we keuzes maken. Wij hebben ervoor gekozen om geen nieuwe versie van het FO en TO te geven van Optistyle. 
Het is belangrijk dat je weet dat dit een onderwijskundige keuze is, en geen keuze die gebaseerd is op de praktijk. Als Optistyle een echt project was, dan was het onacceptabel geweest om vanaf nu geen ontwerpdocumenten bij te werken. 
Voor jouw showcase is het dan ook nog steeds van belang dat je de ontwerpen blijft beheren en de gemaakte keuzes (in dit geval voor authenticatie en autorisatie) vastlegd.
