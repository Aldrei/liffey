const propertyTypeDef = `#graphql
  ##
  # Types
  ##
  type City {
    id: Int
    client_id: Int
    state_id: Int!
    name: String!
    created_at: Date
    updated_at: Date
  }

  type Neighborhood {
    id: Int
    client_id: Int
    city_id: Int
    name: String!
    created_at: Date
    updated_at: Date
  }

  type Photo {
    id: Int
    property_id: Int!
    type: String
    src: String!
    thumb: String
    main_media: String
    caption: String
    order: Int
    rotate: Int
    created_at: Date
    updated_at: Date
  }

  type Video {
    id: Int!
    property_id: Int!
    src: String!
    caption: String
    order: Int
    created_at: Date
    updated_at: Date
  }

  type Property {
    id: ID!
    client_id: Int!
    city_id: Int
    neighborhood_id: Int
    owner_id: Int
    agent_id: Int
    broker_id: Int
    code: Int
    code_type: Int
    code_pretty: String
    property_name: String
    registration: String
    lot: String
    block: String
    development: Boolean!
    sign: Boolean!
    has_photo: Boolean!
    exclusivity: Boolean!
    exclusivity_start_period: Date
    exclusivity_end_period: Date
    purpose: String
    category: String
    type: String
    status: String
    rent_start_period: Date
    rent_end_period: Date
    bedrooms: String
    garage: String
    laundry: Boolean
    roof: String
    ceiling: String
    floor: String
    openings: String
    alarm: Boolean
    electronic_gate: Boolean
    artesian_well: Boolean
    electric_fence: Boolean
    video_camera: Boolean
    sunrise: String
    general_description: String
    agency_date: Date
    sale_date: Date
    condo_name: String
    condo_building: String
    condo_floor: String
    condo_total_floors: String
    condo_unit: String
    condo_elevator: Boolean
    total_area: Float
    built_area: Float
    front_area: Float
    back_area: Float
    right_area: Float
    left_area: Float
    value: Float
    commission_condition_value: String
    commission_percentage_value: Float
    broker_percentage_value: Float
    agency_percentage_value: Float
    condo_value: Float
    paid_iptu_value: String
    iptu_value: Float
    paid_inss_value: String
    inss_value: Float
    cub_index_value: Float
    regularization_something_value: String
    regularization_something_description: String
    agent_condition: String
    installment_condition: String
    outstanding_balance_condition: String
    deadline_condition: String
    readjustment_condition: String
    fgts_condition: Boolean
    donation_condition: Boolean
    financing_condition: Boolean
    consortium_letter_condition: Boolean
    exchange_part_condition: Boolean
    situation_condition: String
    condition_observation: String
    state_location: String
    city_location_id: String
    neighborhood_location_id: String
    location_street: String
    location_number: String
    location_zip_code: String
    nearby_locations: String
    latitude: String
    longitude: String
    zoom: Boolean
    publish_property_website: Boolean
    publish_value_website: Boolean
    property_highlight_website: Boolean
    website_access: String
    publish_map_website: Boolean
    video_url: String
    last_transaction_id: String
    created_at: Date
    updated_at: Date
    # Nested data
    City: City
    Neighborhood: Neighborhood
    Photos: [Photo]
    Videos: [Video]
  }

  ##
  # Queries
  ##
  type Query {
    findProperty(id: ID!, domain: String): Property
  }
`

export default propertyTypeDef
