# About auctioneer-bot-website

 - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
 - The primary purpose of this web app is to provide information about the Buyer's Guide discord bot
 - Users can also use the links provided to invite the discord bot to their server.

# Running the applicaiton locally

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Building and deploying the application

### `npm run build`

 - Builds the app for production to the `build` folder.
 - This script also copies the contents of the `build` folder into the `docs` folder -- which is necessary for deployment to GitHub pages.
 - Currently, the contents of the `docs` folder needs to be pushed to master so that GitHub can recognize the new build.
 - The application is built using [CRACO](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md) due to Tailwind CSS. i.e. Create React App [doesn’t let you override the PostCSS configuration natively](https://tailwindcss.com/docs/guides/create-react-app#install-and-configure-craco), so we need to use CRACO.
 - The build is minified and the filenames include the hashes.


# Other notes

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
