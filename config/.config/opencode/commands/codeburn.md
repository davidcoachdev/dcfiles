# CodeBurn Command

Run CodeBurn observability dashboard for OpenCode.

## Usage

Run codeburn directly:
```bash
codeburn status --provider opencode
codeburn report --provider opencode
codeburn optimize --provider opencode
```

Or use aliases:
```bash
cb    # codeburn report --provider opencode
cbs   # codeburn status --provider opencode
cbo   # codeburn optimize --provider opencode
```

Or with tmux floating window:
```bash
codeburn-tmux status
codeburn-tmux report
codeburn-tmux optimize
```

## Arguments

- `status` (default) — compact 1-liner with today + month cost
- `report` — full dashboard with charts
- `optimize` — detect waste patterns
- `today` — today's usage only
- `month` — this month's usage

## Options

- `--provider opencode` — specify OpenCode provider
- `-f json` — JSON output format
- `-p 7days` — period filter