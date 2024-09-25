# Exercise: Task Dependencies

In this exercise we'll learn how you can configure tasks to depend on each other.

> [!NOTE]
> If you haven't installed docker, no problem. There are two ways to solve it:
> 1. go to https://www.docker.com/products/docker-desktop/ and install docker-desktop to your system. that's it
> 2. exchange the deploy command in the movies project.json with `echo 'thanks for deploying with austrian airlines'`. This is cheap, but works.

# 0. Get to know the Problem

## 0.1 Delete the dist folder

Please delete the `dist` folder from your machine.

## 0.2 Execute deploy

Run the `deploy` command for the `movies` app.

<details>
  <summary>execute deploy</summary>

```bash

npx nx run movies:deploy

```

</details>

You will notice that it fails, as it requires to the `dist` folder to be present!

## 0.3 Explore the task graph

If you open the task graph for the `movies:deploy` target, you'll notice that is has no dependencies at all.

<details>
  <summary>Run deploy task graph</summary>

```bash

npx nx run movies:deploy --graph

```

</details>

So our main pain point here is that `build` is not getting executed before `deploy` is executed.

We are going to fix that soon ;).

# 1. Make `build` depends on `deploy`

## 1.1 Configure `deploy` to be dependent on `build`

Go to either the `nx.json` or the `apps/movies/project.json` file and configure the `deploy` target to `{ "dependsOn" : ["build"] }`

## 1.2 execute `deploy`

Now let's execute the `deploy` command again.

<details>
  <summary>execute deploy</summary>

```bash

npx nx run movies:deploy

```

</details>

You should see that it'll execute `build` before it does execute `deploy`.

# 2. Explore the task graph

If you open the task graph for the `movies:deploy` target, you'll notice that it now has dependencies!

<details>
  <summary>Run deploy task graph</summary>

```bash

npx nx run movies:deploy --graph

```

</details>

# 3. Create other `dependsOn` relations

> [!NOTE]
> The workshop is **for you**! So that you can get familiar with new tools.
> If you feel like playing around, go ahead and finish this exercise as well.

e.g. build depends on lint & test
or just deploy depends on build test & lint

This task has a very abstract description: Just go ahead and configure other constraints that make sense to you.
You can always validate what you did by watching the task graph!
