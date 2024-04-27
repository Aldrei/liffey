import { IVideo } from "@/database/models";
import { getVideoUrl } from "@/helpers";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedVideo extends IVideo {
  url: string
}

export const transformVideo = (source: IVideo): ITransformedVideo => {
  try {
    const data = <ITransformedVideo>deepCloneObj(source)

    data.url = getVideoUrl(data.src)

    return data
  } catch (error) {
    console.error(`transformVideo: ${error}`);
    return null
  }
}
