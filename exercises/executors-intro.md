# Exercise: Run Executors

In this exercise, we will run our first executors.

## 1. Run the app

Now that we have our app, we can also run it using the `serve` command.

Remember how the commands are structured, `nx ${target} ${project}` OR `nx run ${project}:${target}`


<details>
  <summary>Serve the app</summary>


```bash

npx nx serve movies

## OR

npx nx run movies:serve

```

</details>

This will start the app in development mode, and you can access it at http://localhost:4200/.

You should see something like this:

![image](./assets/empty-react-app.png)

## 2. Build the app

We are also able to produce a build output from our newly created app. Let's create one!

Remember how the commands are structured, `nx ${target} ${project}` OR `nx run ${project}:${target}`

<details>
  <summary>Build the app</summary>


```bash

npx nx build movies

## OR

npx nx run movies:build

```

</details>

You should have a `dist/` folder now containing the output of the build.


## 3. Explore other commands

- Lint the code using ESLint: `npx nx lint movies`
- Run the unit tests: `npx nx test movies`
- Run the E2E tests: `npx nx e2e movies-e2e`
- Run the app in production mode: `npx nx serve movies`
- Run the app in production mode with Vite: `npx nx run movies:serve-static`

