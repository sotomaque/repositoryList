import React from 'react';
import { useQuery } from 'urql';

// import query from '../graphql/queries/GET_REPOS_BY_USERNAME';

const query = `
query GET_REPOS_BY_USERNAME($login: String!) {
  gitHub {
    user(login: $login) {
      repositories(
        first: 10
        orderBy: { field: CREATED_AT, direction: DESC }
        privacy: PUBLIC
        isFork: false
      ) {
        nodes {
          id
          name
          stargazers(
            first: 10
            orderBy: { field: STARRED_AT, direction: DESC }
          ) {
            totalCount
          }
        }
      }
    }
  }
}

`

const RepositoryList = () => {

  const [result] = useQuery({
    query, 
    variables: { login: "sotomaque" }
  });
  
  const { data, fetching, error } = result;

  if (fetching) {
    return (
      <div>fetching...</div>
    )
  }


  if (error) {
    return (
      <div>error...</div>
    )
  }

  const repos = data.gitHub.user.repositories.nodes;
  console.log('repos: ', repos)

  return (
    <ul>
      {
        repos.map(repo => 
          <li key={repo.id}>{repo.name}</li>
        )
      }
    </ul>
  )
}

export default RepositoryList;