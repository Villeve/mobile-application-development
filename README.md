# The Great University App
This is the specification document of an application built for course Mobile Application Development (2020) at University of Vaasa

### Usage
Scan [this QR code](https://expo.io/@villeve/react-native-app) with your Expo mobile app to load this project immediately. Create new account or use an admin account with following credentials **(CAUTION: CASE SENSITIVE)**: admin@example.com | admin2020!

### Basic idea
This App allows users to view the course selection of various universities and comment on them. Currently all data about the universities/courses is manually entered by admin users. 

## Frontend
The frontend is mostly built out of react native screens and it uses the AppNavigator to navigate between them. The code is quite ugly; a lot of repeatance, promises are handled in varying manner and styling is bad. Coolest things are probably the screen navigation as previously mentioned and the use of AsyncStorage to save tokens and user information even when the app is closed

### How to Run
    npm start

### Stack
- React Native (Expo)
- Axios

### Github
>https://github.com/Villeve/mobile-application-development

## Backend
The backend uses token based authentication (passport-jwt, express-jwt) and mongoose for data modeling. All endpoint except /login and /register require authorization. POST and DELETE endpoints also require admin role.

### How to Run
    npm start

### Stack
- Node
- Express
- MongoDB

### Routes
- /api/users
- /api/universities
- /api/faculties
- /api/courses
- /api/comments

### Database structure
All Universities, faculties, courses, comments and users are in their own collections. Universities are at the top of the hierarchy as they have references to their corresponding faculties (array of IDs). Faculties have reference to their parent University. Courses have reference to their parent Faculty. Comments have reference to their parent Course

### Hosting
The backend is hosted on Heroku
>https://mobile-app-backend-uva.herokuapp.com/

### Github
>https://github.com/Villeve/mobile-application-development-backend

----