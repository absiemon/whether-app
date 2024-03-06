# Weather App

The Weather App is a full-stack application developed to display weather information sourced from an API. It was created with the aim of gaining valuable experience in React and Node.js development, specifically focusing on building a full-stack application. 

# Functionality

- **Get the five days whether forecast based on city name.**
- **Get the five days whether forecast based on Latitude and Longitude.**
- **Can Switch between the units like Celcius and Fahrenheit**
- **Response are cached so it will be intaced even after reload.**
- **Clear cache if you want to start over.**
- **Click on the card to get more details about the whether forecast.**


# Installation
1. Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/absiemon/whether-app
   ```
2. Naviagte to the frontend and backedn one by one and download the required node packages using the npm install command:

```bash
$ npm install
```

3. Setup OpenWhether Account and get the AppId.

4. Create a .env file in the server directory of the application and add the following variables:
```bash
OPENWHETHER_APPID = your OpenWhether APPID
```
5. Start the backend by executing this command:
```bash
$ npm run dev
```
6. Start the frontend by executing this command:
```bash
$ npm start
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

