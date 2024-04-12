import { vi } from 'vitest'
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line 

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }

  // está class representa o objeto de cada ação eventos
  // e aqui posso receber todas as informações que achar necessarios
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain event', () => {
  it('should be able to dispatch and listen to events', () => {
    /**
     * Como saber se foi chamado ou não um evento,
     * podemos usar spy da lib de tests
     */
    const callbackSpy = vi.fn()

    // subscribe cadastrado
    // ouvindo o evento de resposta criada
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // criando um evento, customAggregate dentro de create dispara um evento.
    // por isso que vamos criar um apartir dele.
    // estou criando uma resposta porém sem cadastrar no banco.
    const aggregate = CustomAggregate.create()

    // espero que na lista de domain events tenha um evento dentro.
    // Estou assegurando que o evento foi criado porém não foi disparado.
    expect(aggregate.domainEvents).toHaveLength(1)

    // está na lista de eventos mas não disparou, agora vamos disparar.
    // estou salvando a resposta no banco de dados e assim disparando o evento.
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // espero que callbackSpy tenha sido chamada.
    // o subscriber ouve o evento e faz o que precisa ser feito com dado
    expect(callbackSpy).toHaveBeenCalled()

    // espero que lista de domain events esteja zerada.
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
