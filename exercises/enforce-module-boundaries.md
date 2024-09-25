# Nx Enforce Module Boundaries

In this exercise you'll learn how to enforce architecture constraints. We will use the built-in eslint rule `@nx/enforce-module-boundaries`
in order to configure how libraries are allowed to depend on each other.

## 1. Configure tags

The first thing we need to do is to tag our projects so that our eslint rule is able to treat them.

For each project, go ahead and assign the proper tag into the project.json file

**Libraries in libs/movies/**

* `"tags": ["scope:movies", "type:feature"]`
* `"tags": ["scope:movies", "type:data-access"]`
* `"tags": ["scope:movies", "type:ui"]`
* `"tags": ["scope:movies", "type:util"]`

**Libraries in libs/shared/**

* `"tags": ["scope:shared", "type:feature"]`
* `"tags": ["scope:shared", "type:data-access"]`
* `"tags": ["scope:shared", "type:ui"]`
* `"tags": ["scope:shared", "type:util"]`

## 2. Setup Scope Constraints

Let's setup constraints between different scopes.

Open the `.eslintrc.json` file in the root folder and locate the `@nx/enforce-module-boundaries` rule


```json
// eslintrc.json

"rules": {
  "@nx/enforce-module-boundaries": [
    "error",
    {
      "enforceBuildableLibDependency": true,
      "allow": [],
      "depConstraints": [
        {
          "sourceTag": "*",
          "onlyDependOnLibsWithTags": ["*"]
        }
      ]
    }
  ]
}
```

Change its configuration so that `scope:movie` can only depend on `scope:shared` & `scope:movie`.
Also `scope:shared` can only depend on `scope:shared`.

<details>
  <summary>Solution</summary>

```json
// eslintrc.json

[
  {
    "sourceTag": "scope:movies",
    "onlyDependOnLibsWithTags": ["scope:movies", "scope:shared"]
  },
  {
    "sourceTag": "scope:shared",
    "onlyDependOnLibsWithTags": ["scope:shared"]
  }
]
```

</details>

Great, go ahead and confirm that the rule you have applied is actually working.

Go to any file within the shared scope and try to import a file from the movie scope.
If configured properly, your IDE should already warn you about something is wrong.

Run the lint command for affected projects to see if your changes break some rule or not.

```bash
nx affected:lint
```

## 3. Setup Type Constraints

Now let's introduce another dimension to our architecture enforcement ruleset. 
We are going to setup constraints within scopes & cross-scopes, **between types**.

Again open the `eslintrc.json` file and add the following rules:

* type feature can only depend on type feature, data-access, ui, util
* type data-access can only depend on type data-access, util
* type ui can only depend on type ui, util
* type util can only depend on type util

### feature 

<details>
  <summary>Feature</summary>

```json
// eslintrc.json

[
  {
    "sourceTag": "type:feature",
    "onlyDependOnLibsWithTags": ["type:feature", "type:data-access", "type:ui", "type:util"]
  },
]
```

</details>

Great, go ahead and confirm that the rule you have applied is actually working.

Go to any library of type ui and try to import a file from a library of type feature.
If configured properly, your IDE should already warn you about something is wrong.

Run the lint command for affected projects to see if your changes break some rule or not.

```bash
nx affected:lint
```

### data-access

<details>
  <summary>data-access</summary>

```json
// eslintrc.json

[
  {
    "sourceTag": "type:data-access",
    "onlyDependOnLibsWithTags": ["type:data-access", "type:util"]
  },
]
```

</details>

Great, go ahead and confirm that the rule you have applied is actually working.

Go to any library of type data-access and try to import a file from a library of type ui.
If configured properly, your IDE should already warn you about something is wrong.

Run the lint command for affected projects to see if your changes break some rule or not.

```bash
nx affected:lint
```

### ui

<details>
  <summary>ui</summary>

```json
// eslintrc.json

[
  {
    "sourceTag": "type:ui",
    "onlyDependOnLibsWithTags": ["type:ui", "type:util"]
  },
]
```

</details>

Great, go ahead and confirm that the rule you have applied is actually working.

Go to any library of type ui and try to import a file from a library of type data-access.
If configured properly, your IDE should already warn you about something is wrong.

Run the lint command for affected projects to see if your changes break some rule or not.

```bash
nx affected:lint
```

### util

<details>
  <summary>util</summary>

```json
// eslintrc.json

[
  {
    "sourceTag": "type:util",
    "onlyDependOnLibsWithTags": ["type:util"]
  }
]
```

</details>

Great, go ahead and confirm that the rule you have applied is actually working.

Go to any library of type ui and try to import a file from a library of type data-access.
If configured properly, your IDE should already warn you about something is wrong.

Run the lint command for affected projects to see if your changes break some rule or not.

```bash
nx affected:lint
```

Congratulation, you have now enforced dependency constraints for your workspace architecture!
