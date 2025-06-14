export class IssueAssignToUserIdDto {
  constructor(
    public issueId: string,
    public userId: number,
  ) {}
}
