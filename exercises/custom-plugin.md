# Exercise: Custom Plugin

Learn how to create a custom executor with Nx for enhancing your project setup. This guide covers generating a plugin, adopting a custom configuration, and executing the executor to streamline development processes.

This document guides you through creating a custom Nx executor to run Stylelint configuration in your project, ensuring consistent style conventions.

## 0. Add @nx/plugin

Add the `@nx/plugin` plugin with `nx add`.

<details>
  <summary>add `@nx/plugin` plugin</summary>

```bash

npx nx add @nx/plugin

```

</details>

## 1. Generate Plugin

Generate a new plugin called `workspace-tools` in the `tools/workspace` directory.

This step initializes the necessary setup for your custom generator.

<details>
  <summary>generate plugin</summary>

```bash

nx generate @nx/plugin:plugin workspace-tools --directory=tools/workspace

```

</details>

![image](./images/custom-plugin-directory.png)
