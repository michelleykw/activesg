# Demo Link - View the Website Here!

- [Version 1](https://michelleykw.github.io/activesg/?version=1)
- [Version 2](https://michelleykw.github.io/activesg/?version=2)
- [Version 3](https://michelleykw.github.io/activesg/?version=3)
- [Version 4](https://michelleykw.github.io/activesg/?version=4)

- To view, open on mobile or set the window dimensions to have a maximum width of 600px.

## How to Set Up Locally?

1. Set up node packages: `npm install` or `npm i`
   - To install a particular package: `npm i <PACKAGE NAME>`
2. Run on local 3000: `npm start`
3. When done, commit and push and `npm run deploy` (Remember to have `npm install gh-pages --save-dev`)

## Version Numbers

1. Old search, New result
2. Old search, Old result
3. New search, New result
4. New search, Old result

- Note: The version number above is not the same as the order of trials showed to users.

# Description of Files and Folders

- The website is built using React, with main files under the `src` folder.

## Pages Folder

- `FacilitiesPage.jsx` - `/activesg/facilities` - All Facilities Page
- `ResultPage.jsx` - `/activesg/facilities/result` - Search Result Page
- `FacilityViewPage.jsx` - `/activesg/facilities/view` - Specific Facility View
- `Complete.jsx` - `/activesg/complete` - Page shown on completion
- `SearchPage.jsx` - Page shown for search, with a new and old version
- Consists of a data folder with pre-populated data

## Logging Folder

- Consists of `logging.js` file for the tracking of user's usage on the website, including clicks and time taken

## Components, Form, Resources and Static Folder

- Consists of common resources used and data, form and components code used
- Local storage is used as data base and is reset each time the task is completed
- For Search/Result component, there are 2 versions (new and old) where the relevant ones will be rendered based on versionId
