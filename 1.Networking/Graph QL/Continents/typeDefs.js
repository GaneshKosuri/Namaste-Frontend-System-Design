export const typeDefs = `#graphql
    type Language {
        name: String!
        code: String!
        native: String!
        rtl: Boolean!
        countryCodes: [String]!
    }

    type Country {
        name: String!
        code: String!
        currency: String!
        native: String!
        phone: String!
        continentId: String!
        languages: [Language]
    }

    type Continent {
        id: ID!
        name: String!
        code: String!
        countries: [Country]
    }

    type Query {
        continents: [Continent]
        languages: [Language]
        countries: [Country]
    }

`