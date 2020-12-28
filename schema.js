const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");
const moment = require("moment");

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

// each game has it's own id; the id is not the id of the team(s)
const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
    home_team_score: { type: GraphQLInt },
    visitor_team_score: { type: GraphQLInt },
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
    // get all teams
    teams: {
      type: new GraphQLList(TeamType), // expect an array of TeamType objects
      async resolve(parents, args) {
        try {
          const response = await axios.get(
            "https://www.balldontlie.io/api/v1/teams"
          );
          const { data } = await response;
          console.log(data.data);
          return data.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    // get Specific Team (give an id and it should return specific information about that team)
    team: {
      type: TeamType,
      // make use of ARGS in order to get specific info
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parents, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/teams/${args.id}`
          );
          const { data } = await response;
          // console.log(data.data);
          return data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    // GAME(s) info (refer back to GameType from above)
    allGames: {
      type: new GraphQLList(GameType),
      // ARGS is the way you want to specifically define the type/way you make the search in qraphIql
      args: { date: { type: GraphQLString } },
      async resolve(parents, args) {
        try {
          const res = await axios.get(
            `https://www.balldontlie.io/api/v1/games/?start_date=${args.date}&end_date=${args.date}`
          );
          const { data } = await res;
          return data.data;
        } catch (err) {
          console.error(err);
        }
      }
    },
    teamGames: {
      type: new GraphQLList(GameType),
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/games?teams_ids[]=${
              args.id
            }&start_date=${moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD")}&end_date=${moment()
              .add(7, "days")
              .format("YYYY-MM-DD")}`
          );
          const data = await response;
          return data.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

/*
Team Query:
{
  team(id: 16) {
    city
    name
    id
  }
}

FOR ALLGAMES: ON A SPECIFIC DAY 
{
  allGames(date: "2020-12-25") {
    date
    home_team {
      id
      name
      city
    }
    home_team_score
    visitor_team {
      id
      name
      city
    }
    visitor_team_score
  }
}

{
  teamGames(id: 5) {
    home_team_score
    visitor_team_score
    home_team {
      city
      name
    }
    visitor_team {
      city
      name
    }
  }
}
cmd + "spacebar": inside graphIql, this will show you all the types you can search... 
*/
