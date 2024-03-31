import { IClient } from "@/database/models";
import { GetCdnUrlType, getApiUrl, getBaseUrl, getCdnUrl } from "@/helpers/config";
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

  data.apiUrl = getApiUrl()
  data.baseUrl = getBaseUrl(client.domain as Pick<IClient, 'domain'>)

  if (client.ssl) data.siteUrl = `https://${client.domain}/`;
  else data.siteUrl = `http://${client.domain}/`;

  data.logoThumb = '';
  data.logoNormal = '';

  if (client.logo) {
    data.logoThumb = getCdnUrl(client.logo, GetCdnUrlType.THUMB_IMAGE)
    data.logoNormal = getCdnUrl(client.logo, GetCdnUrlType.NORMAL_IMAGE)
  }

  if (client.icon) {
    data.iconThumb = getCdnUrl(client.icon, GetCdnUrlType.THUMB_IMAGE)
    data.iconNormal = getCdnUrl(client.icon, GetCdnUrlType.NORMAL_IMAGE)
    data.faviconThumb = getCdnUrl(client.icon, GetCdnUrlType.THUMB_IMAGE)
    data.faviconNormal = getCdnUrl(client.icon, GetCdnUrlType.NORMAL_IMAGE)
  }

  if (client.favicon) {
    data.faviconThumb = getCdnUrl(client.favicon, GetCdnUrlType.THUMB_IMAGE)
    data.faviconNormal = getCdnUrl(client.favicon, GetCdnUrlType.NORMAL_IMAGE)
  }

  if (client.watermark) {
    data.watermarkThumb = getCdnUrl(client.watermark, GetCdnUrlType.THUMB_IMAGE)
    data.watermarkNormal = getCdnUrl(client.watermark, GetCdnUrlType.NORMAL_IMAGE)
  }

  data.expiresData = { codeMessage: 'assinatura_ativa' };
  data.siteStatus = 'no_ar';
  data.siteRedirect = false;

  return data
}
