import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { GitHub } from "./icons/GitHub";

// TODO Try Downshift https://material-ui.com/demos/autocomplete/#react-autosuggest
const languageOptions = [
  { value: "javascript", name: "JavaScript" },
  { value: "go", name: "Go" },
  { value: "csharp", name: "C#" },
  { value: "java", name: "Java" },
  { value: "kotlin", name: "Kotlin" },
  { value: "python", name: "Python" },
  { value: "ruby", name: "Ruby" },
  { value: "shell", name: "Shell" },
  { value: "typescript", name: "TypeScript" },
  { value: "swift", name: "Swift" },
  { value: "rust", name: "Rust" },
  { value: "ocaml", name: "OCaml" },
  { value: "php", name: "PHP" },
];

const styles = (_) =>
  createStyles({
    select: {
      color: "#fff",
    },
    title: {
      flex: "1",
      textAlign: "left",
    },
  });

interface Props extends WithStyles<typeof styles> {
  language: string;
  fetchedRepositoryCount: number;
  totalRepositoryCount: number;
}

const progress = (
  fetchedReposCount: number,
  repositoryCount: number
): number => {
  if (repositoryCount === 0) {
    return 0;
  }

  return (fetchedReposCount / repositoryCount) * 100;
};

const Header: React.FC<Props> = ({
  language,
  classes,
  fetchedRepositoryCount,
  totalRepositoryCount,
}: Props) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          Good First Issues
        </Typography>

        <FormControl>
          <Select
            value={language}
            onChange={(event: any) => {
              window.location.href = `/?language=${event.target.value}`;
            }}
            inputProps={{
              id: "language",
              name: "language",
            }}
            className={classes.select}
          >
            {languageOptions.map((languageOption) => (
              <MenuItem key={languageOption.value} value={languageOption.value}>
                {languageOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title="GitHub repository" enterDelay={200}>
          <IconButton
            color="inherit"
            component="a"
            href="https://github.com/ohbarye/goofi"
            target="_blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Tooltip
        title={`${fetchedRepositoryCount} / ${totalRepositoryCount}`}
        enterDelay={200}
        placement="bottom-end"
      >
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress(fetchedRepositoryCount, totalRepositoryCount)}
        />
      </Tooltip>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
