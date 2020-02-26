# ReactJS based app on Typescript for visualizing air quality related values gathered by Raspberry Pi at home

This ReactJS application provides various visualizations of airquality related measurement data. The charts used for visualizations are based on the library [Recharts](http://recharts.org/en-US).

Apollo Client connects to the GraphQL API and fetches the air quality measurement data from there (array of measurement objects with a timestamp string as well as temperature and humidity as float values).

The app uses Material UI for the basic UI and the simple navigation has been implemented with the _BottomNavigation_ component.

## Chart view of the application

![Sample view](https://user-images.githubusercontent.com/1672059/75363137-fcb2ed00-58b9-11ea-916d-ef7901e8a4d1.png)

## TODO

- Improve the performance and optimize the set of data obtained.
- Add support for more indicators and use further visualizations.
- Add webpack configuration
- Typescript improvements
