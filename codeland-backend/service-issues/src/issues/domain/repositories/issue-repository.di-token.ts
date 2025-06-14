import { Inject } from '@nestjs/common';

export const DITokenIIssueRepository = Symbol('IIssuesRepository');

export const InjectIIssueRepository = () => Inject(DITokenIIssueRepository);
