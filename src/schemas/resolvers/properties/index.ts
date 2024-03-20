import { Properties } from "@/database/models";

const propertiesResolver = {
  Query: {
    findProperty: async (
      _: any,
      { id, fields }
    ) => {
      try {
        const result = await Properties.findOne({
          where: {
            id: id
          },
          attributes: fields
        })

        return result
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export { propertiesResolver };
