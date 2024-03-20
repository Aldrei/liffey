import { Properties } from "@/database/models";

const propertiesResolver = {
  name: 'Properties Resolver',
  Query: {
    findProperty: async (
      _: any,
      { id },
      _ctx,
      info
    ) => {
      try {
        const requestedFields = Object.keys(info.fieldNodes[0].selectionSet.selections.reduce((acc, curr) => {
          acc[curr.name.value] = true;
          return acc;
        }, {}))

        const result = await Properties.findOne({
          where: {
            id: id
          },
          attributes: requestedFields
        })

        return result
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export { propertiesResolver };
