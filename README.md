# Route Around

Duration: Two Weeks

Route Around is a web application that showcases modern & historic points of interest located along MN Metro Transit routes. My goal for this project was to create something that promoted transit ridership, encouraged tourism in the Twin Cities, and helped develop a healthy sense of curiousity for the world around us. 

## Approach

This was easily the biggest project I've built to date, and knowing that it was coming down the line, I started thinking through the features I wanted and how I might implement CRUD very early on in the process. I developed a wireframe in Figma, an outline of the database structure I thought I'd need, and scope document highlighting my goals and timelines. Candidly, they were not particularly accurate the first time around, but after workshopping with my instructors and peers I landed on a solid plan to reach MVP (and what might come next).

[Scope Document w/ Wireframes, ERD](https://docs.google.com/document/d/1XGXvDvByzFVY3iMQnAQt6xVA3N8h_I7nvBNPS5x4HhM/edit?usp=sharing)

## Getting Started

### Prerequisites
-[React.js](https://beta.reactjs.org/) (built on version 17.0.2)
-Key for [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) API
-dotEnv file
-[Node.js](https://nodejs.org/en/docs/)
-Axios
-Redux
-Redux-Saga
-[Material-UI](https://mui.com/)
-Express
-Body-parser
-pg
-[Passport](https://www.passportjs.org/)
-Database manager (I utilized [Postico 2](https://eggerapps.at/postico2/))

### Installation

1. Using your package manager, install the dependencies.
```
$ ~ npm install
```

2. In your database manager, create a database named route_around. Use the provided database files to create the necessary tables for this project. Dummy data has been included for one transit line.

3. Populate your dotEnv file with:
```
SERVER_SESSION_SECRET= 'string' 
mapboxgl.accessToken= 'string'
```

4. With your database set up - start the server.
```
$ ~ npm run server
```

5. With the server running - open another terminal window and start your client. Navigate to http://localhost:3000 if the run client script doesn't automatically open the application.
```
$ ~ npm run client
```

### Built With

-[React.js](https://beta.reactjs.org/)
-[Node.js](https://nodejs.org/en/docs/)
-[Material-UI](https://mui.com/) - Form & Navbar Components/Styling
-[Passport](https://www.passportjs.org/) - Secure Login & Account Management

For a full list of dependencies - see the Package.json



## Screen Shots




## Usage




## Notes



## Acknowledgement


