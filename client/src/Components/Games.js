import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";
import moment from "moment"; // for dates
import "./games.css";

const Games = () => {
  // allGames will take in a date and the format will have to be just as so...
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
        visitor_team_score
        status
        id
      }
    }
  `;

  // HOOKS
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  // to prevent error on reset and refresh back to the current day's date
  useEffect(() => {
    if (!date) {
      setDate(moment().format("YYYY-MM-DD"));
    }
    // only to run when the date changes
  }, [date]);

  // the useQuery hook is used to populate data to the component // STANDARD...
  const { loading, error, data } = useQuery(ALL_GAMES_QUERY, {
    variables: { date }
  });
  if (loading) return <p>Loading Your Game Info</p>;
  if (error) console.log(error);
  // console.log(data.allGames);

  // Listeners
  const handleChange = e => {
    setDate(e.target.value);
  };

  return (
    <div>
      <div className="games_header">
        <label htmlFor="date" className="label_name">
          NBA Games for:{" "}
        </label>
        <input
          type="date"
          value={date}
          id="date"
          onChange={handleChange}
          pattern="\d{4}-\d{2}-\d{2}" // learned from lesson: 4 digit number / 2 digit number / 2 digit number
        />
      </div>
      {data.allGames.map(game => {
        {
          if (game.status.includes("PM")) {
            return (
              <div key={game.id} className="game_lineup">
                <h3 className="for_spacing">{game.home_team.full_name}</h3>
                <h3 className="for_spacing"> @ </h3>
                <h3 className="for_spacing">{game.visitor_team.full_name}</h3>
                <h4>* {game.status} </h4>
              </div>
            );
          }

          return (
            <div key={game.id} className="game_lineup">
              <h3 className="for_spacing">
                {game.home_team.full_name} : {game.home_team_score} pts
              </h3>
              <h3 className="for_spacing"> @ </h3>
              <h3 className="for_spacing">
                {game.visitor_team.full_name} : {game.visitor_team_score} pts
              </h3>
              <h4>{game.status}</h4>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Games;
