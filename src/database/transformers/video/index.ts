import { IVideo } from "@/database/models";
import { getImageUrl } from "@/helpers";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedVideo extends IVideo {
  url: string
}

export const transformVideo = (source: IVideo): ITransformedVideo => {
  try {
    const data = <ITransformedVideo>deepCloneObj(source)

    data.url = getImageUrl(data.src)

    return data
  } catch (error) {
    console.error(`transformVideo ${error}`);
  }
}
