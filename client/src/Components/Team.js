import { gql, useQuery } from "@apollo/client";
import { link } from "react-router-dom";
import "./teams.css";

// need props to pass down the params for the :id in the url
const Team = props => {
  const TEAM_QUERY = gql`
    query TeamQuery($id: Int!) {
      team(id: $id) {
        full_name
        conference
        division
      }
    }
  `;
  let id = props.match.params.id; // will be set to the ":id" inside the url
  id = parseInt(id);

  const { loading, error, data } = useQuery(TEAM_QUERY, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);
  const { full_name, division, conference } = data.team;
  console.log("logging from  Team.js" + full_name);
  console.log(data);
  return (
    <div>
      <h1>The "Team" Component</h1>
    </div>
  );
};

export default Team;

/*

const TEAM_QUERY = gql`
    query TeamQuery($id: Int!) {  <--- this Query will return a teamQuery as outlined below; I tell it what I want it to return from the this specific query
      // Everything below is what I EXPECT BACK
      teamQuery(id: $id)
    }
  `

Team Schema from backend to reference
const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLInt },
    city: { type: GraphQLString },
    conference: { type: GraphQLString },
    division: { type: GraphQLString },
    full_name: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});
Datat Query for team:
{
  team(id: 6) {
    id
    name
    full_name
    conference
    division
  }
}

Example of data returned:
{
  "data": {
    "team": {
      "id": 6,
      "name": "Cavaliers",
      "full_name": "Cleveland Cavaliers",
      "conference": "East",
      "division": "Central"
    }
  }
}


__________

Props:
Props returns
  > history
  > location 
  > match
      > isExact
      > params
          > id: "5"         <--------------- Need to access this param in order to access the url
                      \------> you do this by: let id = props.match.params.id; 
      > path
      > url
  


      HURDLE: The id returns a string and my id requires an INT:
        --> To overcome; id = parseInt(id);
      Now, once you log props, you will have an object for history, location, match, etc

      localhost:3000/teams/4   

- Taking in an 'id'. The id is a varialble which are equal to the props beinbg brought in... 
  The goal of the this component, the $20 dollar question... How do you update the 'team id' in the url to get that specific team's info?
  console.log(props)
  you get back history, location, match
  inside match, you get the id information
    -> props.match.params.id
*/
