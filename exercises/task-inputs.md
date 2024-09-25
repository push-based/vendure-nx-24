# Exercise: Task inputs

In this exercise we learn how to configure `inputs` for tasks in nx.

# 0. Get to know the problem

We currently have a problem. Take a look at the `deploy` target of the `movies` app. It has a dependency
to the `tools/deploy/frontend.Dockerfile`.

If you do any change to the `frontend.Dockerfile`, the `deploy` command won't be affected at all.

<details>
  <summary>Change to tools/deploy/frontend.Dockerfile</summary>

```dockerfile

FROM nginx:1.21.4-alpine
ARG APP_NAME

RUN adduser -D -g 'www' www

COPY tools/deploy/nginx.conf /etc/nginx/nginx.conf
COPY dist/apps/$APP_NAME/browser /usr/share/nginx/html

# this is just a comment 👈️ should be enough

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80


```

</details>

You can confirm bey either watching the `affected task graph` or actually run the `affected:deploy` command.

> [!TIP]
> Please confirm that your git is currently clean. You should not have other changes locally

<details>
  <summary>Affected Task Graph</summary>

```bash

nx affected -t deploy --graph

```

</details>


# 1. Introduce task inputs

The missing piece are of course the right inputs for the task.

## 1.1 namedInputs for dockerFiles

First, create a section `namedSections` that has a configuration for
a `dockerFiles` input that points to the dockerfile we are using for the deployment.

Go to the `project.json` of the `movies` app.
<details>
  <summary>Configure namedInputs</summary>

```json
// apps/movies/project.json
{
  "namedInputs": {
    "dockerFiles": ["{workspaceRoot}/tools/deploy/frontend.Dockerfile"]
  },
}

```

</details>

## 1.2 use the namedInputs in the target

Configure the `deploy` target of the `movies` app so that it uses the newly created `namedInputs`.

We want to make it right directly in the beginning, so please also add the following options to the `inputs`:

```json
{ "dependentTasksOutputFiles": "**/dist/**/*", "transitive": true }
```

<details>
  <summary>use the namedInputs in the target</summary>

```json

{
  "inputs": [
    "dockerFiles",
    { "dependentTasksOutputFiles": "**/dist/**/*", "transitive": true }
  ],
}

```

</details>

# 2. Use task inputs

## 2.1 Commit the project.json

Now you should commit only the `project.json` so that your branch is again clean, **but** the changes you've
done to the .Dockerfile

```bash
git add apps/movies/project.json
git commit -m "fix inputs for deploy target"
```

## 2.2 confirm deploy is affected now

Now the `deploy` target should be affected when there is a change to the `.Dockerfile`.


