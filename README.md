# CLI Cooking

A collection of small Node.js CLI tools for productivity, scaffolding, and developer workflows.

## Featured CLIs

| `todo-cli`                                                                                           | `create-jatin-app`                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**: Manage todos from terminal with persistent storage.                                     | **Purpose**: Scaffold new projects with interactive prompts.                                                                                                |
| **Bin**: `todo`                                                                                      | **Bin**: `create-jatin-app`                                                                                                                                 |
| **Highlights**: Add/list/complete/delete/clear todos, table output, colored UI, JSON persistence.    | **Highlights**: Framework selection, TypeScript option, dependency install option, git init option, spinner/log feedback.                                   |
| **Install**: `npm i -g ./todo-cli`                                                                   | **Install**: `npm i -g ./create-jatin-app`                                                                                                                  |
| **Run (dev)**: `cd todo-cli && npm run dev`                                                          | **Run (dev)**: `cd create-jatin-app && node index.js`                                                                                                       |
| **Key Commands**: `todo add "task"`, `todo list`, `todo done <id>`, `todo delete <id>`, `todo clear` | **Key Flow**: `create-jatin-app` -> enter project name -> choose framework (`vanilla`, `express`, `next`, `react-vite`) -> pick TypeScript/deps/git options |

### `todo-cli` Usage

```bash
todo add "Ship CLI README"
todo list
todo done 1
todo delete 1
todo clear
```

### `create-jatin-app` Usage

```bash
create-jatin-app
```

What it scaffolds:

- Vanilla Node starter
- Express REST API starter
- Next.js App Router starter
- React + Vite starter

Typical next steps after generation:

```bash
cd <project-name>
npm install
npm run dev
```

## Other CLIs

<details>
<summary><strong>dev-runner-cli</strong></summary>

- **Bin**: `devrunner`
- **Purpose**: Run development commands quickly.
- **Command**: `run`

```bash
devrunner run "npm run dev"
devrunner run "node index.js"
```

</details>

<details>
<summary><strong>git-helper-cli</strong></summary>

- **Bin**: `git-helper`
- **Purpose**: Shortcut wrapper for common git checks.
- **Commands**: `status`, `log`, `branch`

```bash
git-helper status
git-helper log
git-helper branch
```

</details>

<details>
<summary><strong>scaffold-cli</strong></summary>

- **Bin**: `project-j`
- **Purpose**: Scaffold a basic app template.
- **Commands**: `create-app <project-name>` or direct project name argument

```bash
project-j create-app my-app
# or
project-j my-app
```

</details>

<details>
<summary><strong>minicalc-cli</strong></summary>

- **Bin**: `minicalc`
- **Purpose**: Basic arithmetic in terminal.
- **Commands**: `add`, `sub`, `mul`, `div`, `mod`

```bash
minicalc add 11 12
minicalc div 20 5
```

</details>

<details>
<summary><strong>notes-cli</strong></summary>

- **Bin**: `notes`
- **Purpose**: Simple notes manager with local persistence.
- **Commands**: `add`, `list`, `remove`, `clear`

```bash
notes add "review PR #42"
notes list
notes remove 1
notes clear
```

</details>
