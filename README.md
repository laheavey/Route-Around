# Route Around

Duration: Two Weeks

Route Around is a web application that showcases modern & historic points of interest located along MN Metro Transit routes. My goal for this project was to create something that promoted transit ridership, encouraged tourism in the Twin Cities, and helped develop a healthy sense of curiousity for the world around us. 

## Approach

This was easily the biggest project I've built to date, and knowing that it was coming down the line, I started thinking through the features I wanted and how I might implement CRUD very early on in the process. I developed a wireframe in Figma, an outline of the database structure I thought I'd need, and scope document highlighting my goals and timelines. Candidly, they were not particularly accurate the first time around, but after workshopping with my instructors and peers I landed on a solid plan to reach MVP (and what might come next).

[Scope Document w/ Wireframes, ERD](https://docs.google.com/document/d/1XGXvDvByzFVY3iMQnAQt6xVA3N8h_I7nvBNPS5x4HhM/edit?usp=sharing)

## Getting Started

### Prerequisites
- [React.js](https://beta.reactjs.org/) (built on version 17.0.2)
- Key for [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) API
- dotEnv file
- [Node.js](https://nodejs.org/en/docs/)
- Axios
- Redux
- Redux-Saga
- [Material-UI](https://mui.com/)
- Express
- Body-parser
- pg
- [Passport](https://www.passportjs.org/)


### Installation

Using your package manager, install the dependencies.
```
$ ~ npm install
```

In your database manager, create a database named route_around. Use the provided database files to create the necessary tables for this project. Dummy data has been included for one transit line and one point of interest.

Populate your dotEnv file with:
```
SERVER_SESSION_SECRET= 'string' 
mapboxgl.accessToken= 'string'
```

With your database set up, start the server.
```
$ ~ npm run server
```

With the server running, open another terminal window and start your client. Navigate to http://localhost:3000 if the run client script doesn't automatically open the application.
```
$ ~ npm run client
```

### Built With

- [React.js](https://beta.reactjs.org/)
- [Node.js](https://nodejs.org/en/docs/)
- [Material-UI](https://mui.com/): Form & Navbar components/styling
- [Passport](https://www.passportjs.org/): Secure login & account management
- [Postico 2](https://eggerapps.at/postico2/): Database manager 
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)
- [Metro Transit General Transit Feed Specification (GTFS) data](https://svc.metrotransit.org/index.html)

For a full list of dependencies, see the package.json

## Usage

1. **Log In/Register:** First view on open, toggles between Log In/Register depending on user account status. Registration only requires the user to create a username and password.
2. **Dashboard:** Landing page once logged in. Shows a map of the Twin Cities, as well as popular routes and the users 'loved' points of interest (if any exist).
3. **All Routes:** A list of all Metro Transit routes. Each route name is a link that sends the user to that route's detail page.
4. **Route Detail:** Displays a map with the entire route drawn. Below that the user can see the following:
- the name of the route
- the Metro Transit agency responsible for operating that line
- what kind of vehicle that route uses (light rail/bus)
- a brief description of the route (start/end/major stops)
- a link to additional fare & schedule info
- a link to start the Active Route view
5. **All Points of Interest:** A map with pins on the location of each point of interest, and list of all currently available points of interest. Each point name is a link that sends the user ot that point's detail page.
6. **Point of Interest Detail:** Displays a map with a pin dropped on that point's location. Below, the user can see the following:
- the name of the point of interest
- an image of the point (either modern or historic)
- a click-to-toggle heart icon to love/unlove the point
- the current address (or indication of demolition)
- a description of the point and any interesting facts
7. **User Profile:** An individual user's profile page. It shows that user's current profile image, username, associated email address, and date of account creation. Below the user can find sections showing their recent activity and loved points.
8. **Edit User Profile:** Allows the user to edit their profile image and/or update the email address they've listed.
9. **Active Route:** A scrolly-telling split screen. The top half is a map with pins; the bottom half is a series of building names and brief facts about the location. As the user scrolls through the building names/descriptions a point becomes 'active' and the map flies to the corresponding pin. 

## Screenshots
1. Log In/Register ![1. Log In/Register](public/images/screenshots/1Login.png)
![2. Dashboard](public/images/screenshots/2Dashboard.png)
![3. All Routes](public/images/screenshots/3AllRoutes.png)
![4. Route Detail](public/images/screenshots/4RouteDetail.png)
![5. All Points of Interest](public/images/screenshots/5AllPOI.png)
![6. Point of Interest Detail](public/images/screenshots/6PointDetail.png)
![7. User Profile](public/images/screenshots/7UserProfile.png)
![8. Edit User Profile](public/images/screenshots/8EditProfile.png)
![9. Active Route](public/images/screenshots/9ActiveRoute.gif)

## Notes



## Acknowledgement


