# Store Sales Inventory

A full stack web app for managing customers, products, stores, and sales.

## Features
- Create, view, update, and delete customers, products, stores, and sales
- Paginated data tables
- Form validation with React Hook Form and Yup
- Global state management with Redux Toolkit
- RESTful API built with ASP.NET Core
- SQL Server database managed with Entity Framework Core migrations

## Built with
**Frontend:** React, Vite, Redux Toolkit, React Router, Axios, Semantic UI React

**Backend:** C#, .NET 8, ASP.NET Core Web API, Entity Framework Core, Swagger

**Database:** SQL Server

## Run it locally
1. Clone the repository.
2. Add your SQL Server connection string to the `Database` setting in `StoreSalesInventory.Server/appsettings.Development.json`.
3. Run this command in `StoreSalesInventory.Server`:

   ```powershell
   dotnet ef database update
   ```

4. In `storesalesinventory.client`, create a `.env` file and set `VITE_API_URL` to your API address.
5. Run this command in `storesalesinventory.client`:

   ```powershell
   npm install
   ```

6. Open `StoreSalesInventory.sln` in Visual Studio and start the project.

## Screenshots
<img width="1920" height="1080" alt="Screenshot (843)" src="https://github.com/user-attachments/assets/536e6e87-026f-4997-9246-4fe1b7ef97c6" />

