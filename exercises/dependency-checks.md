# Nx Dependency Checks

In this exercise you'll learn how to validate the dependencies of your projects with eslint.

# 1. Setup @nx/dependency-checks rule

Open the `/.eslintrc.json` file and add the `@nx/dependency-checks` rule into the
existing `overrides` section

<details>
  <summary>/.eslintrc.json</summary>

```json
{
  "files": ["*.json"],
  "parser": "jsonc-eslint-parser",
  "rules": {
    "@nx/dependency-checks": [
      "error",
      {
        "includeTransitiveDependencies": true,
        "checkVersionMismatches": true,
        "ignoredFiles": ["jest.config.ts", "vite.config.ts"]
      }
    ]
  }
}
```

</details>

# 2. Run linter

Run the lint target for the movies project

```bash

nx lint movies

```

You should see that nothing happens 🤔 Let's figure out what is going on here.

# 3. Create package.json

If no package.json exists, the linter actually doesn't care about at all. 
Let's create a `package.json` file with an empty object in it and see what the linter is complaining about.

Please create an empty `package.json` file in `apps/movies/`

> [!NOTE]
> `empty` in this case means `{}`

# 4. Run lint again

Execute the linting job again.

```bash

nx lint movies

```

You should see that it is actually failing because the package.json doesn't reflect the actual dependencies
of the project.

Don't fear, help is near ;)

# 6. Run lint --fix

Execute the linter with `-- fix`, it should populate your package.json file with actual dependencies.

```bash

nx lint movies --fix

```

# 7. Think about the outcome, what could go wrong here?

Please see the contents of the generated `package.json` file and see what was populated.
Do u think the file is a state which reflects all dependencies your application has right now?
If not, what dependencies are missing and how do you think this happened?
