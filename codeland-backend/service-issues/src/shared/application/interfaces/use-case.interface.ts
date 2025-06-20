import { CriteriaResult } from '@Shared/domain/interfaces/criteria-result.interface';

export interface IUseCase<TCommand, TResult> {
  execute(
    command: TCommand,
  ):
    | Promise<TResult | null>
    | Promise<CriteriaResult<TResult>>
    | Promise<TResult>;
}
