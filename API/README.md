# Setup
Voer het volgende commando uit in de Package Manager Console voordat je de API voor het eerst start:
`update-database`

# Database
De database wordt automatisch geseed wanneer je de API voor het eerst start.
Je kunt de database bekijken met behulp van een SQLite/SQL Server Compact Toolbox of een soortgelijke tool.
SQLite/SQL Server Compact Toolbox moet je installeren als een extensie in Visual Studio.

# Javascript Client
De JS client staat in wwwroot van API project en start automatisch op met de API. 
Configureer via Project > Configure Startup Projects > Multiple Startup Projects. 
Zorg dat MailAPI en API starten (Website op None zetten).