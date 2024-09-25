# Exercise: Create Nx Workspace 

In this exercise, we will create a new empty Nx workspace. 

## 1. Create a new Nx workspace

Using the nx cli, we can create a new Nx workspace with the following command:

```bash
npx create-nx-workspace@latest
```

And answer the questions like this: 

```bash
✔ Where would you like to create your workspace? · `react-monorepo`
✔ Which stack do you want to use? · `none`
✔ Package-based monorepo, integrated monorepo, or standalone project? · `integrated`
✔ Which CI provider would you like to use? · `skip`
✔ Would you like remote caching to make your build faster? · `skip`
```

> [!NOTE]
> The above is only **one** way how to generate the workspace. You are specifically **allowed**
> to also play around with different styles of workspaces.
> Remember, this workshop is **FOR YOU** to get familiar with the nx toolchain.
> 
> So please make sure to also test `package-based` & `standalone` types or even different stacks added by default

This will create a new Nx workspace with the following structure:

```bash
├── .nx
├── .vscode
├── node_modules
├── .editorconfig
├── .gitignore
├── nx.json
├── package.json
└── README.md
```

Congratulations, you have created your first nx workspace 🥳🥳🥳!

It's empty as of now, but we'll add more projects to it soon.

## 2. Be the inspector 🕵️

In case nx is a new experience for you, this is the perfect time inspecting everything you are seeing here. Explore
the folder structure and configuration files. If you have any specific question about anything, please reach out
to the instructor.

We will discuss everything you find in either upcoming exercises or open discussions.
