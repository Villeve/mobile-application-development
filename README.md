# The Great University App
This is the specification document of an application built for course Mobile Application Development (2020) at University of Vaasa

### Usage
Scan [this QR code](https://expo.io/@villeve/react-native-app) with your Expo mobile app to load this project immediately. Create new account or use an admin account with following credentials **(CAUTION: CASE SENSITIVE)**: admin@example.com | admin2020!

### Basic idea
This App allows users to view the course selection of various universities and comment on them. Currently all data about the universities/courses is manually entered by admin users. Most of the Universities are empty, but there are a couple of courses added under University of Vaasa. You may go a head and add your own course!

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
The backend uses token based authentication (passport-jwt, express-jwt) and mongoose for data modeling.

### How to Run
    npm start

### Stack
- Node
- Express
- MongoDB

### Endpoints
- Every endpoint requires authentication (except for login and register)
- All users can send GET-requests
- All users can send or remove their own comment
- Admin users can remove any comment
- Only admin users can send POST or DELETE requests (Comments are an exception)

### Routes
- /api/users
- /api/universities
- /api/faculties
- /api/courses
- /api/comments

### Database
All of the applications data is stored in five JSON-like collections in a NoSQL database, MongoDB. One collection for each type: universities, faculties, courses, comments and users.

- Universities are at the top of the hierarchy as they have references to their corresponding faculties (array of IDs)
- Faculties have reference to their parent University
- Courses have reference to their parent Faculty
- Comments have reference to their parent Course

Users are stored in following manner (passwords are hashed using [bcrypt](https://www.npmjs.com/package/bcryptjs) and 10 salting rounds):

    _id:5e349f0e907d6c56a4466ba7
    role:"0"
    name:"ville"
    email:"ville@example.com"
    password:"$2a$10$BsWYhgDHMmQbNhw66C8EAOks6o/wz4nVmBk/2DUatrcI0UqpVDh.O"
    date:2020-01-31T21:41:34.796+00:00
    __v:0

### Hosting
The backend is hosted on Heroku
>https://mobile-app-backend-uva.herokuapp.com/

### Github
>https://github.com/Villeve/mobile-application-development-backend

----