import { gql, useQuery } from "@apollo/client";
import { PAGE_LIMIT } from "../constants";

export const EMPLOYEES_QUERY = gql`
  query Employees($page: Int!, $limit: Int!) {
    employees(page: $page, limit: $limit) {
      items {
        id
        name
        age
        className
        subjects
        attendance
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export function useEmployees(page) {
  const { data, loading, error } = useQuery(EMPLOYEES_QUERY, {
    variables: { page, limit: PAGE_LIMIT },
    fetchPolicy: "cache-and-network"
  });

  return {
    loading,
    error,
    employees: data?.employees.items || [],
    meta: data?.employees
  };
}
