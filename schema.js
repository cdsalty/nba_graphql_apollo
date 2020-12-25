const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

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

// make data do something... tell app what endpoints to use...
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // fields are the querys you want. (example: if you want to know the scrore, date, etc... or if you want to click a team for more info)
  fields: {
    teams: {
      type: new GraphQLList(TeamType), // expect an array of TeamType objects
      async resolve(parents, args) {
        try {
          const response = await axios.get(
            "https://www.balldontlie.io/api/v1/teams"
          );
          const { data } = await response;
          // console.log(data.data);
          return data.data;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
