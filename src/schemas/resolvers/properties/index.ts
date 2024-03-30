import { Cities, Clients, Neighborhoods, Photos, Properties, Videos } from "@/database/models";
import { ResolverAuthentication, publicRouteResolver } from "@/services/auth";

const propertiesResolver = {
  name: 'Properties Resolver',
  Query: {
    findProperty: async (
      _: any, 
      attrs: any, 
      ctx: any,
      info: any
    ) => publicRouteResolver(ctx, async () => {
      const { id, domain } = attrs;

      const excludes = ['City', 'Neighborhood', 'Photos', 'Videos'];

      const requestedFields = Object.keys(info.fieldNodes[0].selectionSet.selections.reduce((acc, curr) => {
        if (!excludes.includes(curr.name.value)) acc[curr.name.value] = true;
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
          publish_property_website: 1,
          id: id
        },
        attributes: requestedFields,
        include: [{
          model: Cities,
          required: false
        }, {
          model: Neighborhoods,
          required: false
        }, {
          model: Photos,
          required: false
        }, {
          model: Videos,
          required: false
        }]
      })

      return result;
    }) as unknown as ResolverAuthentication
  }
}

export { propertiesResolver };
