import { gql } from "@apollo/client";

export const getAllUsersQuery = gql`
  query GetAllUsers {
    getAllUsers {
      username
      name
    }
  }
`;
