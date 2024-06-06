import { Entity } from '../entities/entity'
import { DomainEvent } from '../event/domain-event'
import { DomainEvents } from '../event/domain-events'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  // dispara ele apartir das classes que herdão.
  protected addDomainEvent(domainEvent: DomainEvent): void {
    // este função vai pre disparar os eventos.
    this._domainEvents.push(domainEvent)

    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
