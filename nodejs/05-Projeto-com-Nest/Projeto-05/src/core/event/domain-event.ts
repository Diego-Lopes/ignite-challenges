import { UniqueEntityID } from '../entities/unique-entity-id'
/**
 * Basicamente uma interface que as classes vão estender
 */
export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
