const graphql = require("graphql");
const Result = require("../models/result");
const LastFetch = require("../models/lastFetch");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const ResultType = new GraphQLObjectType({
  name: "Result",
  fields: () => ({
    id: { type: GraphQLID },
    round: { type: GraphQLInt },
    fastestLapTime: { type: GraphQLString },
    fastestLapDriver: { type: GraphQLString },
    fastestLapDriverNum: { type: GraphQLString },
    first: { type: GraphQLString },
    second: { type: GraphQLString },
    third: { type: GraphQLString }
  })
});

const LastFetchType = new GraphQLObjectType({
  name: "LastFetch",
  fields: () => ({
    id: { type: GraphQLID },
    lastFetch: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    results: {
      type: new GraphQLList(ResultType),
      resolve(parent, args) {
        return Result.find({}, null, { sort: { round: 1 } });
      }
    },
    lastFetch: {
      type: LastFetchType,
      resolve(parent, args) {
        return LastFetch.findById("5b76d0954af1c531a849039e");
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addResult: {
      type: ResultType,
      args: {
        round: { type: new GraphQLNonNull(GraphQLInt) },
        fastestLapTime: { type: new GraphQLNonNull(GraphQLString) },
        fastestLapDriver: { type: new GraphQLNonNull(GraphQLString) },
        fastestLapDriverNum: { type: new GraphQLNonNull(GraphQLString) },
        first: { type: new GraphQLNonNull(GraphQLString) },
        second: { type: new GraphQLNonNull(GraphQLString) },
        third: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let result = new Result({
          round: args.round,
          fastestLapTime: args.fastestLapTime,
          fastestLapDriver: args.fastestLapDriver,
          fastestLapDriverNum: args.fastestLapDriverNum,
          first: args.first,
          second: args.second,
          third: args.third
        });
        return result.save();
      }
    },
    addLastFetch: {
      type: LastFetchType,
      args: { lastFetch: { type: GraphQLString } },
      resolve(parent, args) {
        let fetch = new LastFetch({
          lastFetch: args.lastFetch
        });
        return fetch.save();
      }
    },
    updateLastFetch: {
      type: LastFetchType,
      args: {
        id: { type: GraphQLID },
        lastFetch: { type: GraphQLString }
      },
      resolve(parent, args) {
        return LastFetch.findByIdAndUpdate(args.id, {
          lastFetch: args.lastFetch
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
