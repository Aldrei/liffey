import { Clients, Properties } from "@/database/models";

const propertiesResolver = {
  name: 'Properties Resolver',
  Query: {
    findProperty: async (
      _: any,
      { domain, id },
      ctx,
      info
    ) => {
      try {
        const requestedFields = Object.keys(info.fieldNodes[0].selectionSet.selections.reduce((acc, curr) => {
          acc[curr.name.value] = true;
          return acc;
        }, {}))

        const clientResult = await Clients.findOne({
          where: {
            domain: domain
          },
          attributes: ['id', 'domain'],
        })

        if (!clientResult) throw Error(`You don't have permission.`);

        const result = await Properties.findOne({
          where: {
            client_id: clientResult.id,
            id: id
          },
          attributes: requestedFields
        })

        return result
      } catch (error) {
        console.log(error);
        return error
      }
    }
  }
}

export { propertiesResolver };
