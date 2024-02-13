# DDD (Domain-driven Design)

Design dirigido à domínio

### Domínio

- Domain Experts (Quem contem o domínio do assunto)
  - Conversa
- Linguagem ubíqua

- Usuário
  - Cliente
  - Fornecedor
  - Atendente
  - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades (tudo que factivel, tudo que vai manter na aplicação...)
- Casos de uso

______
# Fundamentos de Clean Architecture

### Refatorando as pastas
Em domnain podemos ter subdomínios são quase setores do problema que estamos resolvendo, no caso se estivermos desenvolendo um monolítio separamos por módulos, caso seja pensado para micro-serviços podemos usar subdomínios do método DDD.

##### O primeiro subdomínio é forum
estamos desenvolvendo um serviço para perguntas e respostas então é justo ter esse subdomínio fórum.