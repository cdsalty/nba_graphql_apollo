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

  const handleChange = e => {
    // console.log(e.target.value)
    setDate(e.target.value);
  };

  if (loading) return <p>Loading Your NBA Results</p>;
  if (error) console.log(error);
  console.log(data.allGames);
  // by console logging the data, you see how the data is laid out in order to call on it... In this case; data.allGames...

  return (
    <div>
      <label htmlFor="date">Show games for:</label>
      <input
        type="date"
        value={date}
        id="date"
        onChange={handleChange}
        pattern="\d{4}-\d{2}-\d{2}" // learned from lesson: 4 digit number / 2 digit number / 2 digit number
      />
      {data.allGames.map(game => {
        return (
          <div key={game.id} className="game_lineup">
            <h3 className="for_spacing">
              {game.home_team.full_name}:{game.home_team_score}
            </h3>
            <h3 className="for_spacing">
              {game.visitor_team.full_name}:{game.visitor_team_score}
            </h3>
            <h4>{game.status}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Games;
