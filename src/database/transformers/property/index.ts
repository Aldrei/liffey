import ENV from '@/config';
import { ICity, IClient, INeighborhood, IOwner, IPhoto, IProperty, IVideo } from "@/database/models";
import { hasValueDecimal, isValidDate, removeHTML } from "@/helpers";
import { deepCloneObj } from "@/helpers/object";
import { transformCity } from '../city';
import { ITransformedEmployee, transformEmployee } from '../employee';
import { transformNeighborhood } from '../neighborhood';
import { transformOwner } from '../owner';
import { transformPhoto } from '../photo';
import { transformVideo } from '../video';

interface TSubData<T> {
  data: T
}

export interface ITransformedProperties extends IProperty {
  site_url: string
  valuePub: string
  desc: string
  title: string
  hasExclusivity: boolean
  city: TSubData<ICity>
  neighborhood: TSubData<INeighborhood>
  owner: TSubData<IOwner>
  broker: TSubData<ITransformedEmployee>
  agent: TSubData<ITransformedEmployee>
  photo: TSubData<IPhoto>
  video: TSubData<IVideo>
}

export const transformProperty = (source: IProperty, client: IClient): ITransformedProperties => {
  const property = <ITransformedProperties>deepCloneObj(source)

  // Price
  if (property.value) property.valuePub = property.value.toFixed(2).replace('.', ',');

  // Description
  const descArray: string[] = [];

  if (property.type) descArray.push(property.type);
  if (property.bedrooms) descArray.push(`${property.bedrooms} quarto(s)`)
  if (property.garage) descArray.push(`${property.garage} carro(s)`)

  property.desc = descArray.join(', ');

  // Short title
  const title: string[] = [];

  if (property.type) title.push(property.type);
  if (property.bedrooms) title.push(`${property.bedrooms} quarto(s)`);

  property.title = title.join(', ');

  // Description
  property.general_description = removeHTML(property.general_description);

  // Check dates
  property.rent_start_period = isValidDate(property.rent_start_period);
  property.rent_end_period = isValidDate(property.rent_end_period);
  property.agency_date = isValidDate(property.agency_date);
  property.sale_date = isValidDate(property.sale_date);
  property.exclusivity_start_period = isValidDate(property.exclusivity_start_period);
  property.exclusivity_end_period = isValidDate(property.exclusivity_end_period);

  // Exclusivity
  property.hasExclusivity = property.exclusivity && isValidDate(property.exclusivity_end_period) ? true : false

  // Values
  property.value = hasValueDecimal(property.value);
  property.condo_value = hasValueDecimal(property.condo_value);
  property.iptu_value = hasValueDecimal(property.iptu_value);

  // Areas
  property.total_area = hasValueDecimal(property.total_area);
  property.built_area = hasValueDecimal(property.built_area);
  property.front_area = hasValueDecimal(property.front_area);
  property.back_area = hasValueDecimal(property.back_area);
  property.right_area = hasValueDecimal(property.right_area);
  property.left_area = hasValueDecimal(property.left_area);

  // Site
  let propertyType = property.type ? property.type.toLowerCase().replace(/[^0-9a-z]+/ig, '-') : '';

  if (client.domain) {
    const protocol = client.ssl ? 'https://' : 'http://';
    const cityName = property?.City?.name

    if (ENV.REACT_APP_DOMAINS.indexOf(client.domain)) property.site_url = protocol + client.domain + '/site/property/' + property.code;
    else property.site_url = protocol + client.domain + '/property/' + property.code + '/' + propertyType + '/' + cityName;
    
  } else {
    property.site_url = null;
  }

  // Relationships/includes
  property.city = {
    data: transformCity(property?.City)
  }
  delete property.City

  property.neighborhood = {
    data: transformNeighborhood(property?.Neighborhood)
  }
  delete property.Neighborhood

  property.owner = {
    data: transformOwner(property?.Owner)
  }
  delete property.Owner

  property.broker = {
    data: transformEmployee(property?.Broker)
  }
  delete property.Broker

  property.agent = {
    data: transformEmployee(property?.Agent)
  }
  delete property.Agent

  property.photo = {
    data: transformPhoto(property?.Photo?.[0])
  }
  delete property.Photo

  property.video = {
    data: transformVideo(property?.Video?.[0])
  }
  delete property.Video

  return property;
}
