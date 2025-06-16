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
import dayjs from "dayjs";
import { useFindIssuesByCriteria } from "../hooks/useFindIssuesByCriteria";

export const IssuesTable = () => {
  const { issues, total, error, loading } = useFindIssuesByCriteria(1);
  return (
    <Table>
      <TableCaption>
        <Button className="mr-3">Previous Page</Button>
        <Button>Next Page</Button>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>User Id</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow>
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
