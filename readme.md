# Weather App

This is an app that will show you the weather based on your current location if you want, or you can search for your favorite location to retrieve the weather conditions for it too.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Intallation](#installation)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Continued Development](#continued-development)
- [Author](#author)

## Overview

### The Challenge

Users should be able to:

- Get the weather based on their location by pressing the compass icon and allowing the app to retrieve the weather conditions.

- Get the weather using the search box and clicking the magnifying glass icon.

### Screenshot

#### Mobile Design

![Mobile Design](https://i.imgur.com/KsxDbqI.png)

#### Desktop Design

![Desktop Design](https://i.imgur.com/aOqvV2L.png)

### Links

- Live Site URL: [https://bryanclouddev.github.io/weather-app/](https://bryanclouddev.github.io/weather-app/)

## Installation

In case you want to get this code, make changes, or test it, here are the steps to install it. However, if you only need to deploy it, you can run it as it is since it is already packaged.

1- Verify Node.js Installation

- Open your command prompt or terminal.
- Run the following command:

```
node -v
```

- If Node.js is installed, it will display the version number. Otherwise, you'll need to install Node.js.

### Install Node.js

- Visit the official Node.js website [nodejs.org](https://nodejs.org).
- Download the appropriate installer for your operating system.
- Run the installer and follow the installation instructions.
- After installation, verify the installation by running the `node -v` command again.

### Install Dependencies

- Open your command prompt or terminal.
- Navigate to your project directory.
- Run the following command to install dependencies specified in the `package.json` file:

```
npm install
```

- This will install all the necessary dependencies listed in the `dependencies` section of the `package.json` file.

Please note that the above steps assume you are using npm as your package manager. If you are using yarn, you can replace npm with yarn in the commands.

### Generate build for TS files and node_modules

After you do the necessary changes you need, you may just run:

```
npx webpack
```

It will generate the compiled JS code in the folder `dist`, which is the one that `index.html` uses.


## My Process

### Built With

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- DOM manipulation
- SOLID principles
- Clean code and DRY
- Webpack
- TypeScript

### What I Learned

I learned to apply best practices using clean code, DRY, and SOLID principles. It's really important now that I know how to better structure and make use of the features that TypeScript has in order to take full advantage of it and use types to have full control of the app through the weatherapi API, using pure HTML, CSS, and TS to create a nice-looking app.

### Continued Development

I will continue practicing and improving my skills using SOLID since it's a must to write understandable and maintainable code for me and my colleagues.

## Author

- Website - [bryancloud.dev](https://bryancloud.dev)
- Twitter - [@BryanCloudDev](https://twitter.com/BryanCloudDev)