# The best Data App for busy people

Are you a planner tired of seeing tons of data and willing to get to the point?
Are you a developer looking for reusability? This application is easy to use:
To easily create a new dashboard with stats and filters all you have to do is the following:

1-Check the props config at schema.ts
2-Configure the props like in JobConfig.ts and add the api queries
2-Enjoy! Now you have a well-performant data table with infinite scrolling, filters, sorting and the stats you wish!
3-Wanna add a new functionality? Simply adapt schema.ts, your dashboard config in question, and the logic to the ui component and it will be instantly available!

## How to start

1-Install Dependencies with yarn install
2-Start JSON Server with serve-json in the client folder
3-Start React App with yarn start in the client folder

## Tech Stack

- TypeScript
- React

## What's left

- Custom sorting for dates depending on their type as well as datepicker filters
- Additional refactoring
- Other stats/ways to show key insights
