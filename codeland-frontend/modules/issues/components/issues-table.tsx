"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EIssueCriteriaSort } from "@/modules/gql/generated/graphql";
import dayjs from "dayjs";
import { useState } from "react";
import { useFindIssuesByCriteria } from "../hooks/useFindIssuesByCriteria";

export const IssuesTable = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<EIssueCriteriaSort>(
    EIssueCriteriaSort.UpdatedAt
  );
  const { issues, total, error, loading } = useFindIssuesByCriteria(
    page,
    orderBy
  );
  return (
    <Table>
      <TableCaption>
        <Button
          className="mr-3"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous Page
        </Button>
        <Button
          className="mr-3"
          disabled={page * 10 >= (total ?? 0)}
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </Button>
        Total: {total}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead onClick={() => setOrderBy(EIssueCriteriaSort.Priority)}>
            Priority ▼
          </TableHead>
          <TableHead>User Id</TableHead>
          <TableHead onClick={() => setOrderBy(EIssueCriteriaSort.UpdatedAt)}>
            Updated At ▼
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="font-medium">{issue.title}</TableCell>
            <TableCell>{issue.status}</TableCell>
            <TableCell>{issue.priority}</TableCell>
            <TableCell>{issue.assignedToId}</TableCell>
            <TableCell>{dayjs(issue.updatedAt).toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
