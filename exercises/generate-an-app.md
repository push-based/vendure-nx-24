# Exercise: Generate an app

In this exercise, we will create a new app to our workspace.

## 1. Add plugin to Nx workspace to generate apps

We want to add a plugin to our Nx workspace to generate react apps.

```bash
npx nx add @nx/react
```

This will add the plugin to our Nx workspace and you should see the following:

```
NX   Package @nx/react added successfully.
```

## 2. Use the plugin and create an app

### 2.1 Generate a React app

Now that we have the plugin installed, we can generate a new React app using the following command:

> [!NOTE]
> You can use whatever folder directory structure you like for this. You can directly pass `--directory`
> and then choose whatever mode (`derived` or `as-provided`) that fits your likings.
> 
> Also don't worry, you can easily get rid of created projects after generating them. You'll learn about
> this in the next step of this exercise (3)

Remember how the commands are structured, `nx generate ${plugin}:${type} ${name}`:

<details>
  <summary>Generate the app</summary>

```bash

npx nx generate @nx/react:app movies

```

</details>

It will ask you some questions, so make sure to fill them in like this:

```bash
✔ Which stylesheet format would you like to use? · scss
✔ Would you like to add React Router to this application? (y/N) · true
✔ Which E2E test runner would you like to use? · playwright
✔ Which bundler do you want to use to build the application? · vite
```

This will generate a new React app in the `movies` folder. But also, it will create a `movies-e2e` folder with the necessary files to run E2E tests with Playwright.

The structure of the generated app should look like this:

```bash
├── .nx
├── .vscode
├── node_modules
├── movies
│   ├── public
│   ├── src
│   │   ├── app
│   │   ├── assets
│   │   ├── main.tsx
│   │   └── styles.scss
│   ├── .eslintrc.json
│   ├── jest.config.ts
│   ├── project.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── tsconfig.app.json   
│   ├── tsconfig.spec.json   
│   └── tsconfig.json   
├── movies-e2e
│   ├── src
│   │   └── example.spec.ts
│   ├── .eslintrc.json
│   ├── playwright.config.ts
│   ├── project.json
│   └── tsconfig.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── jest.config.ts
├── jest.preset.js 
├── nx.json
├── package.json
├── tsconfig.base.json
└── README.md
```

Some new things to note:
- We have a `movies` app, which is the main app we will build.
- We have a `movies-e2e` app, which is the app we will use to run E2E tests with Playwright.
- We have a `jest.config.ts` file, which is the configuration file for Jest.
- We have a `tsconfig.base.json` file, which is the base configuration file for TypeScript, which other `tsconfig.*.json` files extend. We will use this to configure our libraries and apps.
- ESLint and Prettier have been added to the workspace, so we can use them to lint our code.
- The `movies` app has a `vite.config.ts` file, which is the configuration file for serving & building.

### 2.2 Be the inspector 🕵️

In case nx is a new experience for you, this is the perfect time inspecting everything you are seeing here. Explore
the folder structure and configuration files. If you have any specific question about anything, please reach out
to the instructor.

We will discuss everything you find in either upcoming exercises or open discussions.

## 3. Remove the app

In case you want to try out different styles (`derived` vs. `as-provided`), you probably want to remove
the existing app before you do that. 
Use the `nx g rm` command to delete the app (and it's e2e dependency).

<details>
  <summary>Remove both apps</summary>

```bash

nx g rm movies-e2e

nx g rm movies

```

</details>

Well done! It's super simple to delete once generated apps/libs from your workspace. So you don't have to worry.

## 4. Re-create the app with a different style

As we of course need it back, please generate it again. This your chance to try
out a different style ;)

<details>
  <summary>Recreate the app</summary>

```bash
npx nx generate @nx/react:app movies --directory=packages
```

</details>

## 5. [OPTIONAL]: Move your application

It is also possible to **MOVE** once generated apps and libs with a simple command.

Try out the `nx g mv` command to move the movies app to a different folder than it was before.

<details>
  <summary>Move the app</summary>

```bash
npx nx g move --destination=apps/movies --projectName=movies --projectNameAndRootFormat=as-provided
```

</details>


