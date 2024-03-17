import { Entity } from './entity'
/**
 * Toda entidade aggregate extende de entidade Entity
 */
export abstract class AggregateRoot<Props> extends Entity<Props> { }
