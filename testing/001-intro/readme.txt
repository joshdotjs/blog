Why add testing so soon?
- The project is still small => easier to add now than later
- With tests added it will be easier for other developers to collaborate without worying about introducing breaking changes
- Already have manual testing via console logs - just automate these and we can then just autonomously test these test cases even after finished with current part (loading files)
- The app is starting to get big enough for it to be easy to introduce a bug in one part of the app by adding a feature in another part of the app.


Why Vitest?
- Vitest is basically perfectly compatible with Jest.
- Vitest uses native ES6 modules by default (Jest can use ES6 modules, but the setup is much more complicated)
- Vitest works easily with TypeScript and JSX (Jest is overly complicated to use this way)
- Vitest is both a test runner and an assertion library.