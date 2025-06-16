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
import {
  EIssueCriteriaSort,
  EIssueStatus,
} from "@/modules/gql/generated/graphql";
import dayjs from "dayjs";
import { useState } from "react";
import { useAssignIssueToMe } from "../hooks/useAssignIssueToMe";
import { useFindIssuesByCriteria } from "../hooks/useFindIssuesByCriteria";

const enum EOpenClose {
  OPEN = EIssueStatus.Open,
  CLOSE = EIssueStatus.Closed,
}

export const IssuesTable = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<EIssueCriteriaSort>(
    EIssueCriteriaSort.UpdatedAt
  );
  const [openClose, setOpenClose] = useState<EOpenClose>();
  const { issues, total, refetch } = useFindIssuesByCriteria(
    page,
    orderBy,
    undefined,
    openClose as unknown as EIssueStatus
  );
  const { assign } = useAssignIssueToMe();

  const setOpenCloseFilter = () => {
    switch (openClose) {
      case undefined:
        setOpenClose(EOpenClose.OPEN);
        break;
      case EOpenClose.OPEN:
        setOpenClose(EOpenClose.CLOSE);
        break;
      default:
        setOpenClose(undefined);
    }
  };

  const assignToMe = (id: string) => {
    assign(id);
    refetch();
    window.location.reload();
  };

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
          <TableHead>Title</TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => setOpenCloseFilter()}
          >
            Status 🔎
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => setOrderBy(EIssueCriteriaSort.Priority)}
          >
            Priority ▼
          </TableHead>
          <TableHead>User Id</TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => setOrderBy(EIssueCriteriaSort.UpdatedAt)}
          >
            Updated At ▼
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="font-medium truncate max-w-72">
              {issue.title}
            </TableCell>
            <TableCell>{issue.status}</TableCell>
            <TableCell>{issue.priority}</TableCell>
            <TableCell>{issue.assignedToId}</TableCell>
            <TableCell>{dayjs(issue.updatedAt).toString()}</TableCell>
            <TableCell>
              <Button
                variant="secondary"
                onClick={() => assignToMe(issue.id ?? "")}
              >
                Assign to me
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
