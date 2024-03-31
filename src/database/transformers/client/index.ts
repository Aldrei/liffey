import { IClient } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

interface IWhoIsAuthResponse extends IClient {
  apiUrl: string
  baseUrl: string
  siteUrl: string
  logoThumb: string
  logoNormal: string
  iconThumb: string
  iconNormal: string
  faviconThumb: string
  faviconNormal: string
  watermarkThumb: string
  watermarkNormal: string
  siteStatus: string
  siteRedirect: boolean
  expiresData: {
    codeMessage: string
  }
}

export const transformClient = (client: IClient): IWhoIsAuthResponse => {
  const data = <IWhoIsAuthResponse>deepCloneObj(client)

  data.apiUrl = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}`;
  data.baseUrl = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/api/pub/${client.domain}`;

  if (client.ssl) data.siteUrl = `https://${client.domain}/`;
  else data.siteUrl = `http://${client.domain}/`;

  if (client.logo) {
    data.logoThumb = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/thumb/${client.logo}`;
    data.logoNormal = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/normal/${client.logo}`;
  } else {
    data.logoThumb = '';
    data.logoNormal = '';
  }

  if (client.icon) {
    data.iconThumb = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/thumb/${client.icon}`;
    data.iconNormal = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/normal/${client.icon}`;
    data.faviconThumb = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/thumb/${client.icon}`;
    data.faviconNormal = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/normal/${client.icon}`;
  } else {
    data.iconThumb = '';
    data.iconNormal = '';
    data.faviconThumb = '';
    data.faviconNormal = '';
  }

  if (client.watermark) {
    data.watermarkThumb = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/thumb/${client.watermark}`;
    data.watermarkNormal = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}/photos/normal/${client.watermark}`;
  } else {
    data.watermarkThumb = '';
    data.watermarkNormal = '';
  }

  data.expiresData = { codeMessage: 'assinatura_ativa' };
  data.siteStatus = 'no_ar';
  data.siteRedirect = false;

  return data
}
