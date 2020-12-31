import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";
import moment from "moment"; // for dates

const Games = () => {
  const ALL_GAMES_QUERY = gql`
    query AllGamesQuery($date: String!) {
      allGames(date: $date) {
        home_team {
          full_name
          id
        }
        visitor_team {
          full_name
          id
        }
        home_team_score
        status
        id
      }
    }
  `;

  // to call a new date, moment() => the date is matching up to the api
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  // make use of the useQuery hook to populate the component
  const { loading, error, data } = useQuery(ALL_GAMES_QUERY, {
    variables: { date }
  });

  if (loading) return <p>Loading Your NBA Results</p>;
  if (error) console.log(error);
  console.log(data.allGames);
  // by console logging the data, you see how the data is laid out in order to call on it... In this case; data.allGames...

  return (
    <div>
      <h4>Games Component</h4>
    </div>
  );
};

export default Games;

/*
GRAPHQL QUERY LAYOUT (which will be written again inside the games query)
{
  allGames(date: "2020-01-28") {
    visitor_team_score
    status
    visitor_team {
      full_name
    }
  }
}


- create a query name. (query AllGamesQuery)
  - what does it take? takes the variable to search with; in this case, it will let the user select a date.
    - graphql assigns "$" to indicate variables

    useQuery takes the query and any variables such as in this case, the date; It doesn't have to take in any variables
*/
