import Paper from "@material-ui/core/Paper";
import { FC, useState } from "react";

import Header from "./Header";
import RepositoryList from "./RepositoryList";
import { apiClient } from "../utils/ApiClient";
import ButtonArea from "./ButtonArea";
import Grid from "@material-ui/core/Grid";
import { StyleRulesCallback } from "@material-ui/core/styles";
import { WithStyles, withStyles } from "@material-ui/core";
import { Repository, GoodFirstIssuesResponse } from "../interfaces";

const styles: StyleRulesCallback = _ => ({
  paper: {
    backgroundColor: "#efefef",
    paddingTop: "70px"
  }
});

interface Props extends WithStyles<typeof styles> {
  language: string;
  goodFirstIssues: GoodFirstIssuesResponse;
}

interface RepositoryState {
  repositories: Repository[];
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
  };
  repositoryCount: number;
}

const useRepositories = (
  language: string,
  goodFirstIssues: GoodFirstIssuesResponse
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [
    { repositories, pageInfo, repositoryCount },
    setRepositoryState
  ] = useState<RepositoryState>(goodFirstIssues);

  const fetchMoreRepositories = async () => {
    setLoading(true);
    const endCursor = pageInfo.endCursor;
    const response = await apiClient.get("/api/issues", {
      params: {
        endCursor,
        language,
        perPage: 20
      }
    });

    setRepositoryState({
      repositories: repositories.concat(response.data.repositories),
      pageInfo: response.data.pageInfo,
      repositoryCount: response.data.repositoryCount
    });
    setLoading(false);
  };

  return {
    repositories,
    repositoryCount,
    loading,
    pageInfo,
    fetchMoreRepositories
  };
};

const Index: FC<Props> = ({ classes, language, goodFirstIssues }) => {
  const {
    repositories,
    repositoryCount,
    pageInfo,
    fetchMoreRepositories,
    loading
  } = useRepositories(language, goodFirstIssues);

  return (
    <Paper elevation={1} className={classes.paper}>
      <Header
        language={language}
        fetchedRepositoryCount={repositories.length}
        totalRepositoryCount={repositoryCount}
      />
      <Grid container={true} justify={"center"}>
        <Grid item={true} xs={12} sm={10} md={10} lg={8}>
          <RepositoryList loading={loading} repos={repositories} />
          <ButtonArea
            loading={loading}
            handleClick={fetchMoreRepositories}
            hasNextPage={pageInfo.hasNextPage}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Index);
