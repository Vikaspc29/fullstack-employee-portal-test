const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum SortOrder {
    ASC
    DESC
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    className: String!
    subjects: [String!]!
    attendance: Float!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    className: String!
    subjects: [String!]!
    attendance: Float!
  }

  input EmployeeFilter {
    name: String
    className: String
    minAttendance: Float
  }

  type EmployeePage {
    items: [Employee!]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  type UserInfo {
    userId: ID!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: UserInfo!
  }

  type Query {
    employees(
      page: Int = 1
      limit: Int = 10
      sortBy: String = "name"
      sortOrder: SortOrder = ASC
      filter: EmployeeFilter
    ): EmployeePage!

    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = { typeDefs };
