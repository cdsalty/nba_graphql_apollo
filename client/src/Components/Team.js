import { gql, useQuery } from "@apollo/client";
import { link } from "react-router-dom";
import "./teams.css";

const Team = props => {
  console.log(props);
  const TEAM_QUERY = gql`
    query TeamQuery($id: Int!) {
      teamQuery(id: $id)
    }
  `;

  return <div></div>;
};

export default Team;

/*

const TEAM_QUERY = gql`
    query TeamQuery($id: Int!) {  <--- this Query will return a teamQuery as outlined below
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
*/
