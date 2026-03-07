# Bubble Tea Crystal Port (Draft)

This folder is the starting point for migrating
[charmbracelet/bubbletea](https://github.com/charmbracelet/bubbletea) from Go to Crystal.

## Current status

- Project scaffold created in `crystal/bubbletea`.
- Core Bubble Tea concepts sketched:
  - `Message` (`Msg`)
  - `Cmd` (`Proc(Msg?)`)
  - `Model` (`init`, `update`, `view`)
  - `Program` (basic event loop)
- Example apps:
  - `examples/counter.cr`
  - `examples/calculator.cr` (interactive calculator)

## Structure

- `src/bubbletea.cr` - library entrypoint
- `src/bubbletea/message.cr` - message types
- `src/bubbletea/cmd.cr` - command alias
- `src/bubbletea/model.cr` - abstract model contract
- `src/bubbletea/program.cr` - minimal runtime loop
- `examples/counter.cr` - quick smoke example
- `examples/calculator.cr` - interactive calculator example

## Next migration milestones

1. Add terminal renderer and diffing behavior comparable to Bubble Tea.
2. Port key handling and input event abstractions.
3. Implement asynchronous command scheduling and internal message queue.
4. Add unit tests that mirror core upstream behavior.
5. Port selected examples from the Go repository for parity checks.

## Run locally

```bash
cd crystal/bubbletea
crystal run examples/counter.cr
```

```bash
cd crystal/bubbletea
crystal run examples/calculator.cr
```

## Run with Docker (Crystal 1.19)

```bash
cd crystal/bubbletea
docker build -t bubbletea-crystal:1.19 .
docker run --rm -it bubbletea-crystal:1.19
```
