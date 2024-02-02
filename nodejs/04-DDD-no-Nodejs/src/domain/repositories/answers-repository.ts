import { Answer } from "../entites/answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}