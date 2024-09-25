# Exercise: Create a branch

## 0. Setup a new branch & configure `base`

### 0.1 Create a new branch

Make sure you are on your own branch, otherwise follow the next step.

<details>
  <summary>Create your branch</summary>

You can use the following pattern: `{your-branch-name}`

```bash
git checkout -b {your-branch-name}
```

</details>


### 0.2 Configure `defaultBase`

Nx needs a `base` branch to compare changes again. We now pretend that **your** personal branch
will be the new `main` now.

For this we need to configure the `defaultBase` to be the branch you are currently working in the `nx.json` file.

<details>
  <summary>Adjust `defaultBase`</summary>

```json
// nx.json

{
  "defaultBase": "", // 👈️ the branch you are working on, e.g. solutions/hey-its-mario
}

```

</details>


### 0.3 Commit & Push

In case you haven't committed anything yet. Please do so now!

```bash
git commit -a -m "this is everything from me"
```

And also push your changes to the remote.

```bash
git push
```
