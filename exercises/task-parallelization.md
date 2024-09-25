# Exercise: Task Parallelization
In this exercise we'll learn how to run tasks in parallel.

## 1. Run Task in parallel
In order to run tasks in parallel, we can just add the `--parallel` to the command, and it will run the tasks 
which can be parallelized in parallel.

Run the lint target for all projects in parallel 
- with 1 parallel worker
- reset the cache
- with 5 parallel workers
- see the difference in time

<details>
  <summary>Run lint target in parallel</summary>

```bash
npx nx run-many -t lint --parallel=1

nx reset 

npx nx run-many -t lint --parallel=5
```

</details>

## 2. Configure a default in nx.json
Configure the default parallelization in the `nx.json` file.

<details>
  <summary>Configure default parallelization</summary>

```json nx.json
{
  // ...,
  "parallel": 5
}
```

</details>

## 3. Run more tasks
Try to run:
- test
- build 

<details>
  <summary>Run more tasks</summary>

```bash
npx nx run-many -t test
npx nx run-many -t build
```

</details>  

## 4. Make the ci run tasks in parallel
Let's update the ci pipeline to run tasks in parallel.

> [!WARNING]
> DON'T RAISE IT TOO HARD PLEASE (MAX 3)! GITHUB IS POOR! :-D

<details>
  <summary>Make the ci run tasks in parallel</summary>  

```yaml
      - name: Run commands in parallel
        run: npx nx affected -t lint build --base=HEAD^ --parallel=3
```

</details>
