export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
};

export enum EIssueCriteriaSort {
  Priority = 'PRIORITY',
  UpdatedAt = 'UPDATED_AT'
}

export enum EIssuePriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum EIssueStatus {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export type Issue = {
  __typename?: 'Issue';
  assignedToId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  priority: EIssuePriority;
  status: EIssueStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserGqlType;
};

export type IssueAssignUserIdInput = {
  issueId: Scalars['String']['input'];
};

export type IssueCriteriaInput = {
  filters?: InputMaybe<IssueFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EIssueCriteriaSort>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type IssueCriteriaResult = {
  __typename?: 'IssueCriteriaResult';
  data: Array<Issue>;
  total: Scalars['Int']['output'];
};

export type IssueFiltersInput = {
  assignedToId?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<EIssuePriority>;
  status?: InputMaybe<EIssueStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignIssueToMe: Scalars['Boolean']['output'];
  login: AuthResponse;
};


export type MutationAssignIssueToMeArgs = {
  data: IssueAssignUserIdInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<UserModel>;
  getUserById: UserModel;
  helloProtegido: Scalars['String']['output'];
  issueFindByCriteria: IssueCriteriaResult;
};


export type QueryGetUserByIdArgs = {
  input: Scalars['Float']['input'];
};


export type QueryIssueFindByCriteriaArgs = {
  input?: InputMaybe<IssueCriteriaInput>;
};

export type UserGqlType = {
  __typename?: 'UserGqlType';
  id: Scalars['ID']['output'];
  issues: Array<Issue>;
};

export type UserModel = {
  __typename?: 'UserModel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'UserModel', username: string, name: string }> };
