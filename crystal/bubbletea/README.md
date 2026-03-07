# Bubble Tea Crystal Port (Draft)

This folder is the starting point for migrating
[charmbracelet/bubbletea](https://github.com/charmbracelet/bubbletea) from Go to Crystal.

## Current status

Implemented runtime features:

- Core MVU contract:
  - `Message` (`Msg`)
  - `Cmd` (`Proc(Msg?)`)
  - `Model` (`init`, `update`, `view`)
- Program runtime:
  - asynchronous command execution
  - internal mailbox/event loop
  - line-mode input and key-mode input
  - best-effort raw terminal mode for key input
  - optional window size message dispatch (`WindowSizeMessage`)
- Renderer:
  - full-frame rendering
  - diff rendering mode
  - alternate screen support
  - cursor hide/show and clear screen controls
- Command helpers:
  - `BubbleTea.quit`
  - `BubbleTea.batch`
  - `BubbleTea.sequence`
  - `BubbleTea.tick`
  - `BubbleTea.every`
  - renderer control commands (`enter_alt_screen`, `exit_alt_screen`, etc.)
- Styling:
  - ANSI color helpers with `FORCE_COLOR` / `NO_COLOR` behavior.

## Structure

- `src/bubbletea.cr` - library entrypoint
- `src/bubbletea/message.cr` - message types
- `src/bubbletea/cmd.cr` - command alias
- `src/bubbletea/model.cr` - abstract model contract
- `src/bubbletea/program.cr` - runtime loop + mailbox
- `src/bubbletea/program_options.cr` - runtime options
- `src/bubbletea/input_reader.cr` - line/key input parsing
- `src/bubbletea/terminal.cr` - raw mode + window size helpers
- `src/bubbletea/renderer.cr` - terminal frame renderer
- `src/bubbletea/commands.cr` - helper commands and internal control messages
- `src/bubbletea/style.cr` - ANSI styling helpers
- `src/bubbletea/calculator.cr` - calculator model/messages
- `examples/counter.cr` - quick smoke example
- `examples/calculator.cr` - interactive calculator (key mode + alt screen by default)
- `examples/clock.cr` - ticking clock demo using async commands
- `spec/*` - runtime, renderer, command helper, input, and app specs

## Run locally

```bash
cd crystal/bubbletea
crystal run examples/counter.cr
```

```bash
cd crystal/bubbletea
crystal run examples/calculator.cr
```

```bash
cd crystal/bubbletea
crystal run examples/clock.cr
```

Color behavior:

- The calculator demo (`examples/calculator.cr`) is color-on by default.
- Set `DEMO_NO_COLOR=1` to force plain output for the demo.
- In library mode, `FORCE_COLOR=1` enables colors and overrides `NO_COLOR`.
- For calculator, use `DEMO_LINE_MODE=1` to run without raw key mode.

## Run with Docker (Crystal 1.19)

```bash
cd crystal/bubbletea
docker build -t bubbletea-crystal:1.19 .
docker run --rm -it bubbletea-crystal:1.19
```

## Run tests

```bash
cd crystal/bubbletea
crystal spec
```

Test run artifacts generated in this repo:

- `artifacts/calculator-app-run-output.txt`
- `artifacts/calculator-app-run-screenshot.png`
