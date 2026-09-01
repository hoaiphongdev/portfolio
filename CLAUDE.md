# Project instructions

## Git commit messages

Every commit subject line MUST start with a gitmoji, matching this repo's existing history (`git log --oneline`). Format: `<emoji> <type>: <description>`.

| Emoji | Type     | Use for                               |
| ----- | -------- | ------------------------------------- |
| ✨    | feat     | New feature                           |
| 🐛    | fix      | Bug fix                               |
| 🔥    | remove   | Deleting code, files, or dead exports |
| ♻️    | refactor | Behavior-preserving restructuring     |
| 🔧    | chore    | Tooling, config, dependencies         |
| 👷    | ci       | CI/CD pipeline changes                |
| 📝    | docs     | Documentation only                    |
| 🎨    | style    | Formatting/style, no logic change     |
| 🧪    | test     | Adding or updating tests              |

Never create a commit whose subject line is missing an emoji.
