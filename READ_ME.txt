1) Clone the repository by:
extracting the zipped file or 
running `git clone https://github.com/gsimantiras/CRM-Contacts-2`

2) Open the solution in Visual Studio.

3) Publish CRM.Api in Folder. Maybe you need to rebuild so that packages are loaded.
This will run npm install and `npm run` and `npm run build -- --prod` 

4) Run `Crm-contacts/CRM.Api/bin/Release/netcoreapp3.1/publish/CRM.Api.exe`.

5) Open `https://localhost:5001/contacts` in browser. 
The first time might take a few seconds as it creates the database.


Notes
Database is created upon running the application. 
Database created can be found in `Server=(localdb)\\mssqllocaldb;Database=CRMContacts`.
Error file logs can be found in `c:\temp\CRM-all-yyyy-mm-dd.log`.
Angular code is found in CRM.Api/ClientApp.