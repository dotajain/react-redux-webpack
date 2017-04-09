#Starter Kit for Building Applications in React and Redux using Webpack

## PREREQUIREMENTS
1. **Install [Node 7](https://nodejs.org)**.
2. **Make sure you're in the directory you just created.** - `cd react-redux-webpack`.
3. **Install [Yarn](https://yarnpkg.com/).** - `npm install yarn -g`. ***(optional - best practice)***
4. **Install Node Packages.** - `npm install` or `yarn install`.


# Installation Project from scratch
1. Initialize package.json for adding node module dependencies `yarn init` or `npm init`.
2. Install Webpack `yarn add webpack --dev` or `npm i -D webpack`.
3. **Run the app.** - `npm run dev` or `yarn dev`.


# Setting up basic application folder structure
```
config
├── webpack.config.common.js
├── webpack.config.dev.js
├── webpack.config.prod.js
src
├── assets
│   │── fonts
│   │   └── ... custom fonts
│   │── images
│   │   └── ... images
│   └── styles
│       └── app.scss
└── js
    ├── config
    │   └── routes.js
    ├── screens
    │   └── App
    │       ├── components
    │       ├── screens
    │       │   ├── Admin
    │       │   │   ├── components
    │       │   │   ├── screens
    │       │   │   │   ├── Reports
    │       │   │   │   │   ├── components
    │       │   │   │   │   └── index.js
    │       │   │   │   └── Users
    │       │   │   │       ├── components
    │       │   │   │       └── index.js
    │       │   │   └── index.js
    │       │   └── Course
    │       │       ├── components
    │       │       ├── screens
    │       │       │   └── Assignments
    │       │       │       ├── components
    │       │       │       └── index.js
    │       │       └── index.js
    │       └── index.js
    └── index.js
```
