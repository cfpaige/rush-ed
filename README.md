# RushEd
A career-match app that takes user preferences and strengths, suggests next steps towards a chosen career, and keeps track of progress.

## Motivation

This project is part of UW Continuing Education Coding Bootcamp. It's creators are so-called mature students, and have a good number of other qualifications and experiences under their belts--all of them ultimately inadequate to our long-term needs and interests.

Our stories and the paths that brought us here are not uncommon. Few highschoolers know exactly what they want, or have the benefit of an insightful and impartial counsellor. Instead, most of us are asked to choose a degree or a line of work long before we know much about ourselves, or the professional world that awaits us. We settle on what's familiar, or affordable, or expected. Then, we can spend years trying to make that one rash decision work, often with no resources to change the course.

RushEd can fill the gap in the decision-making process for young people choosing their next steps, and help them stay on track.

## Overview

TBD

## Demo

TBD

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites

The app has been tested on and is compatible with IE 11, Edge 18, Firefox 66, Safari =< 11 12, Opera 60, Chrome 74, iOS =< 10 11 12, and Android =< 3 4*.

\* Most Android devices from 4.4 onwards use Chrome as the default browser, older versions use the original Android stock browser.

Standard system requirements for installation:

|  | Windows requirements | Mac requirements | Linux requirements |
|:---|:---:|:---:|:---:|
|**Operating system**|Windows 7 or later|Mac OS X Yosemite 10.10 or later 64-bit|Ubuntu 12.04+, Debian 8+, openSUSE 12.2+, or Fedora Linux 17+|
|**Processor**|Intel Pentium 4 or later	Intel|Intel Pentium 3 / Athlon 64 or later|
|**Memory**|2 GB minimum, 4 GB recommended|
|**Screen resolution**|1280x1024 or larger|
|**Application window size**|1024x680 or larger|
|**Internet connection**|Required|

#### Installation

Fork or clone the repository from https://github.com/cfpaige/rush-ed/.

The app's dependencies are:

* express
* express-handlebars
* sequelize
* mysql2
* dotenv
* lodash@4.17.14 (vulnerability patch--ignore if your node.js version uses lodash v.4.17.12 or later)

All of them are available as packages that can be installed with npm or bower, or added with yarn. Check out npm documentation for specific instructions. (E.g. for express: https://www.npmjs.com/package/express). If you're cloning this repo, it comes with package.json file that has all of those listed, so you'd only need to run
```npm install```
(if using npm) in your root folder to get all of them set up.

#### Deployment

This app has been deployed by linking the GitHub repo to Heroku. If you don't already have a [Heroku](https://dashboard.heroku.com/) account, you will need to sign up for one. Then log into GitHub, open Heroku, and click on <New> --> <Create new app>. Give it a name (or let Heroku choose for you), then click <Create app>. On the next page, under <Deployment Method>, choose <Connect to GitHub>, then enter the name of the GitHub repository you'd like to connect and click <Search>. Click <Connect>, choose if you'd like to deploy automatically or manually and which repo branch, and you're done.

For testing, you can deploy locally and access the app from your browser by running the app from the command line:
```node server.js```
and navigating to http://localhost:3000 (if you're using the PORT specified in server.js).

To deploy on your preferred server instead, you will need to:
- have access to DNS record management or know the people to contact;
- set up the DNS records and make sure that all the settings are correct;
- set up and test the website on the production server (where it will live);
- set up email;
- back up any old site RushEd would be replacing (if applicable) and deploy the new one;

#### Usage

#### Built With 

[Virtual Studio Code](https://code.visualstudio.com/)

**APIs used:** 

   - [Google Geolocation](https://developers.google.com/maps/documentation/geolocation/intro)
   - [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/start)
   - [Google Calendar](https://developers.google.com/calendar/)

**Additional technologies and languages:**
   - [Sass](https://sass-lang.com/)

**Testing**

  - [Travis CI](https://travis-ci.org/)

#### Contributing

All bugs, feature requests, pull requests, feedback, etc., are welcome. Use the [Issues](https://github.com/cfpaige/rush-ed/issues) feature of GitHub to get in touch about any of those.

#### Authors

- [**helanjose**](https://github.com/helanjose?tab=repositories)
- [**drogalsky**](https://github.com/drogalsky?tab=repositories)
- [**cfpaige**](https://github.com/cfpaige?tab=repositories)

#### License

Licensed under [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html).
