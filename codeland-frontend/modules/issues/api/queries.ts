import { gql } from "@apollo/client";

export const ISSUES_FIND_BY_CRITERIA_QUERY = gql`
  query FindIssuesByCriteria(
    $page: Int
    $limit: Int
    $orderBy: EIssueCriteriaSort
    $title: String
    $status: EIssueStatus
    $assignedToId: Int
    $priority: EIssuePriority
  ) {
    issueFindByCriteria(
      input: {
        page: $page
        limit: $limit
        orderBy: $orderBy
        filters: {
          title: $title
          status: $status
          assignedToId: $assignedToId
          priority: $priority
        }
      }
    ) {
      data {
        id
        title
        status
        assignedToId
        priority
        updatedAt
        createdAt
        user {
          id
        }
      }
      total
    }
  }
`;
