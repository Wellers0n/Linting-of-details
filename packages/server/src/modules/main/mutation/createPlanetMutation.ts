import Planet from "../../../model/planets";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import idx from 'idx';

export default mutationWithClientMutationId({
  name: "createPlanetMutation",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    // img: {
    //   type: new GraphQLNonNull(GraphQLString)
    // }
  },
  mutateAndGetPayload: async (args, context, options) => {
    const img = idx(options, (_:any) => _.rootValue.request.files);
    // const files = idx(options, _ => _.rootValue.request.files);
    console.log(img)
    // const idUser = ctx.user.id;
    // const planet = await Planet.findOne({ name });
    
    // if (idUser) return { error: "user null" };

    // if (!planet) {
    //   await Planet.create({ name, description, img, idUser });
    //   return {
    //     success: "Insert planet with success"
    //   };
    // }

    // return {
    //   error: "Planet exist"
    // };
  },
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
