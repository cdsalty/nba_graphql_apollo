const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const TeamType = new GraphQLObjectType({
  name: "Team", // name of the object getting returned
  // fields matches the data coming back from the api
  fields: () => ({
    id: { type: GraphQLInt },
    city: { type: GraphQLString },
    conference: { type: GraphQLString },
    division: { type: GraphQLString },
    full_name: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

// each game has it's own id; the id is not the id of the team(s)
const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GrpahQLInt },
    date: { type: GraphQLString },
    home_team_score: { type: GrpahQLInt },
    visitor_team_score: { type: GrpahQLInt },
    // the home_team data coming back is the same layout as "TeamType" object
    home_team: { type: TeamType },
    visitor_team: { type: TeamType },
    status: { type: GraphQLString }
  })
});
