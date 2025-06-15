import { gql } from "@apollo/client";

export const getAllUsernames = gql`
  query GetAllUsers {
    getAllUsers {
      username
    }
  }
`;
