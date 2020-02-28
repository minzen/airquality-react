# ReactJS based app on Typescript for visualizing air quality related values gathered by Raspberry Pi at home

This ReactJS application provides various visualizations of airquality related measurement data. The charts used for visualizations are based on the library [Recharts](http://recharts.org/en-US).

Apollo Client connects to the GraphQL API and fetches the air quality measurement data from there (an array of measurement objects with a timestamp string as well as temperature and humidity as float values).

The app uses Material UI for the basic UI and the simple navigation has been implemented with the _BottomNavigation_ component.

## Building and running of the app

- System requirements: nodejs v.10, e.g. v10.19.0, npm or yarn installed
- Backend running on GraphQL and providing the API, e.g. [https://github.com/minzen/airquality-storing](https://github.com/minzen/airquality-storing)
- Configure the environment variable REACT_APP_APOLLO_SERVER_URI (see .env.example)
- Checkout the code and execute the command _yarn install_ in the checked out project directory to install required dependencies.
- Run the development version by executing _yarn start_
- For the production mode, execute the command _yarn build_ und run the built app e.g. by using the command _serve -s build_

## Chart view of the application

![Sample view](https://user-images.githubusercontent.com/1672059/75363137-fcb2ed00-58b9-11ea-916d-ef7901e8a4d1.png)

## TODO

- Add support for more indicators and use further visualizations.
- Typescript improvements
