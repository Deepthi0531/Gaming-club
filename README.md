Gaming Club App
A full-stack web application for managing memberships, games, collections, recharges, and more for club-based gaming.
Technologies: React (frontend), Spring Boot (backend), MongoDB (database).

Features

Login & Admin Authentication
Membership Management: Create and manage club members.
Member Search & Details: View member info, history, and balance.
Game Management: Add and manage games played at the club.
Recharge & Transaction History: Track all financial activities.
Collections: View daily recharge collections.
Tabbed Member Page: Games, Recharges, Played Games history.

Folder Structure
gaming-club-frontend/
  src/
    api/
    components/
    pages/
    App.js, routes.js
    index.js, App.css

gaming/
  src/main/java/com/gaming/
    Controller/
    Model/
    Repository/
    GamingApplication.java
  resources/
    application.properties


Getting Started

1. Clone the Repository
git clone https://github.com/yourusername/gaming-club-app.git
cd gaming-club-frontend

2. Frontend Setup (React)
npx create-react-app gaming-club-frontend
cd gaming-club-frontend
npm install
npm start

3. Backend Setup (Spring Boot + MongoDB)
cd gaming-club-backend
# Import project in IntelliJ/Eclipse, or build with Maven:
mvn clean install
# run the app:
mvn spring-boot:run

4. API Connection
The React frontend communicates with backend REST endpoints using Axios or Fetch.

Update URLs in /src/api/*.js as needed.