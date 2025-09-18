 🕹️ Gaming Club App

A full-stack web application for managing memberships, games, recharges, collections, and more for club-based gaming.

 ⚙️ Tech Stack

* Frontend:React
* Backend:Spring Boot
* Database:MongoDB

 ✨ Features

* 🔐 **Login & Admin Authentication**
* 👥 **Membership Management:** Create and manage club members
* 🔍 **Member Search & Details:** View member info, history, and balance
* 🎮 **Game Management:** Add and manage games played at the club
* 💸 **Recharge & Transaction History:** Track all financial activities
* 📊 **Collections:** View daily recharge collections
* 🧾 **Tabbed Member Page:** Separate tabs for games, recharges, and played games history

📁 Project Structure

gaming-club-frontend/
  src/
    api/
    components/
    pages/
    App.js
    routes.js
    index.js
    App.css

gaming-club-backend/
  src/main/java/com/gaming/
    Controller/
    Model/
    Repository/
    GamingApplication.java
  src/main/resources/
    application.properties


 🚀 Getting Started

1. Clone the Repository

```bash
git clone https://github.com/Deepthi0531/Gaming-club.git
```


2. Frontend Setup (React)

```bash
cd gaming-club-frontend
npx create-react-app gaming-club-frontend
npm install
npm start
```

3. Backend Setup (Spring Boot + MongoDB)

```bash
cd gaming-club-backend
mvn clean install
mvn spring-boot:run
```

4. API Connection

* The React frontend communicates with the backend REST endpoints using  or Fetch.
* Update the base URLs in:
  ```
  gaming-club-frontend/src/api/*.js
  ```

