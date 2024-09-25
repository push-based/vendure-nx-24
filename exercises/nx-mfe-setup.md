# Exercise: Setup Nx Module Federation

In this exercise, we will create a host application inside our monorepo, and two remote apps, that will be consumed by the host app.

## 1. Create host app
In order to create a host app, we will use the `@nx/react` plugin which is already installed in our workspace.

Name the app `host-shell`

<details>
  <summary>Create host app</summary>    

```bash
npx nx generate @nx/react:host host-shell --directory=apps/host-shell --e2eTestRunner=none
```

This will generate a new React app in the `host-shell` folder. 

</details>

### 1.1 Start the app
We can start the app just like any other app.

<details>
  <summary>Start host app</summary>    

```bash
npx nx serve host-shell
```

You should see the webpack dev server start and you should be able to access the app at http://localhost:4200/.

</details>


## 2. Create remote apps
Create two remote apps, call them `remote-1` and `remote-2`.

<details>
  <summary>Create remote apps</summary>   

```bash
npx nx generate @nx/react:remote remote-1 --directory=apps/remote-1 --host=host-shell --e2eTestRunner=none
npx nx generate @nx/react:remote remote-2 --directory=apps/remote-2 --host=host-shell --e2eTestRunner=none
```

Now we have two remote apps, that will be consumed by the host app.
Both will be already connected to the host app.

</details>

## 3. Start remote apps independently
We can start the remote apps independently using the serve command.

<details>
  <summary>Start remote apps</summary>    

```bash
npx nx serve remote-1
npx nx serve remote-2
```

You should see the webpack dev server start and you should be able to access the remotes at http://localhost:4201/ and http://localhost:4202/.

</details>

## 4. Start host app
Now we can start the host app. And see how the remote apps are being consumed.

<details>
  <summary>Start host app</summary>    

```bash
npx nx serve host-shell
```

You should see the webpack dev server start and you should be able to access the app at http://localhost:4200/.
You should also see the remote apps being consumed.

</details>


## 5. Update the host module federation config to include the remotes local urls
Now we need to update the host app module federation config to include the remotes local urls.

<details>
  <summary>Update host app module federation config</summary>    

```diff
// apps/host-shell/src/module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'host-shell',
-  remotes: ['remote-1', 'remote-2'],
+  remotes: [['remote-1', 'http://localhost:4201/'], ['remote-2', 'http://localhost:4202/']],
};
```

Now, when we serve the host app, we can also serve the remote apps.
And hot-reloading will work as expected.

</details>

## 6. Start host app and remote-1 remote app
In order to see the remote apps being consumed, we need to start the host app and the remote-1 remote app and 
introduce some changes to the remote-1 app and see how the host app is updated.

<details>
  <summary>Start host app and remote-1 remote app</summary>    

```bash
npx nx serve host-shell
npx nx serve remote-1
```

After running the commands separately, go to the remote-1 app and introduce some changes.

Then open http://localhost:4200/ in your browser and see how the host app is updated, when you navigate to the remote-1 app.

</details>
