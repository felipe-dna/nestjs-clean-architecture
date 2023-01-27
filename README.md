```
Presentation ➔ Use Cases ➔ Core ➔ Data
```

# 1: Core

## 1.1: core/base
Aqui ficam todas as classes de abstração e interfaces de modelo.

## 1.2: core/domain

### 1.2.1: core/domain/entities
Todas as entidades, podem ser chamados de schemas também. 
PS: colocar sempre organizado por pasta

### 1.2.2: core/domain/mappers
...

## 1.3: core/repositories
Nos arquivos de repository em conjunto com uma base de entidades possui uma 
lista de métodos abstratos que devem ser implementados na camada `Data` posteriormente.


# 2: Data

Cada repositório pode retornar dados de uma fonte de dados diferente.

```
src
    - data
        - mock
        - cache-memory
        - remote
```

- As fontes de dados remotas podem ser bancos de dados relacionais ou não relacionais, 
  desde que sejam conectados remotamente.
- Os mocks ajudam a realizar testes unitários, ou dar aquela ajudinha pra quando ainda
  não temos uma implementação completa, mas não queremos deixar os client parados.
- No cache-memory, os dados serão perdidas todas as vezes que o projeto for compilado, 
  mas se manterá presente em tempo de execução.


# 3: Shared

## 3.1: shared/dtos
...


# 4: Usecases/services
- isola responsabilidades, fazendo um serviço dedicado a uma única ação
- facilita a manutenção e entendimento do serviço
- poculta a responsabilidade da camada de presentations. Esse ponto é 
  importante pois se quisermos mudar de framework futuramente, conseguimos 
  levar a execução completa dessa ação, sem ter retrabalhos.
- Omite acesso direto da fonte de dados ao controller.