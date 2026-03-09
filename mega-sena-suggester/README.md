# Mega Palpites

**Plataforma frontend para geração, seleção manual, histórico e simulação de sorteios da Mega-Sena, construída em React + TypeScript como evolução de um exercício acadêmico para um projeto de portfólio.**

---

## Visão geral

O **Mega Palpites** é uma aplicação frontend que permite ao usuário:

- gerar palpites automáticos com 6 dezenas aleatórias;
- montar apostas manualmente em uma cartela inspirada no volante da Mega-Sena;
- salvar e persistir palpites no navegador;
- consultar, editar e excluir palpites no histórico;
- executar um sorteio visual e comparar o resultado com os palpites já salvos.

### Problema que o projeto resolve

O projeto resolve um problema comum em exercícios introdutórios: transformar uma ideia funcional, porém simples, em uma experiência mais próxima de um produto real. Em vez de apenas exibir números aleatórios, a aplicação organiza um fluxo completo de uso:

1. descoberta do projeto na home;
2. geração ou criação manual do palpite;
3. armazenamento local do histórico;
4. revisão e manutenção dos jogos salvos;
5. simulação do sorteio e validação do resultado.

### Origem do projeto

Este projeto nasceu a partir de uma atividade da faculdade com foco em:

- React;
- TypeScript;
- React Router;
- React Context;
- `useEffect`;
- CSS-in-JS.

### Evolução para portfólio

A proposta foi expandida para sair do formato de “exercício isolado” e ganhar características de produto de portfólio:

- identidade visual mais forte;
- layout escuro com cards e hierarquia visual;
- fluxo de navegação entre páginas;
- persistência local de dados;
- melhor separação entre páginas, componentes e tipos;
- backlog com visão de evolução futura.

---

## Demo / status

### Status atual

**Em desenvolvimento ativo**, com base funcional já implementada para navegação, geração de palpites, histórico persistido e sorteio visual.

### O que já está funcionando

- página inicial com apresentação do projeto;
- header fixo com navegação entre rotas;
- geração automática de palpites com 6 números únicos;
- cartela manual com 60 dezenas em grade `6 x 10`;
- salvamento de palpites no contexto global;
- persistência dos palpites no `localStorage`;
- página de histórico com cards de palpites;
- edição de dezenas diretamente no histórico;
- exclusão de palpites;
- sorteio visual com animação e persistência do histórico de sorteios no `localStorage`;
- comparação do sorteio com os palpites salvos.

## Funcionalidades

### Funcionalidades implementadas

#### Navegação e estrutura

- roteamento com `react-router-dom`;
- páginas separadas para `Home`, `Palpite`, `Histórico` e `Sorteio`;
- header fixo com indicação visual da rota ativa.

#### Geração de palpites

- criação automática de jogos com 6 números únicos entre 1 e 60;
- ordenação crescente dos números gerados;
- salvamento imediato do palpite gerado;
- exibição do último palpite automático na própria página de palpites.

#### Seleção manual

- cartela visual com números de `01` a `60`;
- organização em 6 linhas e 10 colunas;
- limite de 6 dezenas por palpite;
- clique para selecionar e desmarcar;
- botão de salvar habilitado apenas quando há 6 dezenas selecionadas;
- ordenação crescente ao salvar.

#### Histórico

- listagem dos palpites salvos em cards;
- distinção visual entre palpites manuais e automáticos;
- exibição da data de criação;
- edição dos números do palpite;
- exclusão do palpite;
- persistência entre recarregamentos de página.

#### Sorteio

- simulação visual com 60 bolas em movimento;
- sorteio sequencial de 6 dezenas;
- persistência do histórico de sorteios no navegador;
- comparação entre sorteio e palpites existentes;
- mensagem final indicando se houve ou não um palpite vencedor.

### Funcionalidades planejadas / backlog

- destacar acertos parciais por quantidade de dezenas coincidentes;
- painel mais detalhado de conferência entre palpites e sorteios;
- filtros e ordenação no histórico;
- reset visual dos dados direto pela interface;
- melhorias de microinteração, loading e feedbacks;
- testes de componentes e regras de negócio;
- deploy e documentação de ambiente publicada.

---

## Fluxo do usuário

O fluxo principal atual do sistema é:

**Home → Palpite → Histórico → Sorteio**

### Exemplo de jornada

1. O usuário entra na **Home** e entende rapidamente a proposta do projeto.
2. Na página **Palpite**, ele pode:
   - gerar um palpite automático; ou
   - escolher manualmente 6 dezenas na cartela.
3. Cada jogo salvo passa a aparecer em **Histórico**.
4. Em **Histórico**, o usuário pode revisar, editar ou excluir palpites.
5. Na página **Sorteio**, ele executa um sorteio visual e verifica se algum palpite acertou os 6 números.

---

## Requisitos do exercício

### Base da atividade original

Pelo contexto e pela implementação atual, os requisitos centrais do exercício foram contemplados:

| Requisito original  | Status | Observação                                                                         |
| ------------------- | ------ | ---------------------------------------------------------------------------------- |
| Página inicial      | ✅     | Implementada em [src/pages/HomePage.tsx](src/pages/HomePage.tsx)                   |
| Página de palpite   | ✅     | Implementada em [src/pages/PalpitePage.tsx](src/pages/PalpitePage.tsx)             |
| Página de histórico | ✅     | Implementada em [src/pages/HistoricoPage.tsx](src/pages/HistoricoPage.tsx)         |
| React Router        | ✅     | Configurado em [src/App.tsx](src/App.tsx) e [src/main.tsx](src/main.tsx)           |
| React Context       | ✅     | Implementado em [src/context/PalpitesContext.tsx](src/context/PalpitesContext.tsx) |
| `useEffect`         | ✅     | Utilizado no contexto e no componente de sorteio                                   |
| CSS-in-JS           | ✅     | Estilos inline em páginas e componentes                                            |

### Expansão da proposta original

Além da base acadêmica, o projeto foi ampliado com:

- persistência de dados no navegador;
- edição e exclusão de palpites;
- visual mais próximo de dashboard;
- simulação de sorteio com animação;
- tipagem centralizada do domínio com `Palpite`.

---

## Stack utilizada

### Frontend

- **React 19**
- **React DOM 19**
- **React Router DOM 7**

### Linguagem

- **TypeScript**

### Bibliotecas

- **uuid** para geração de identificadores únicos dos palpites.

### Ferramentas

- **Vite** para ambiente de desenvolvimento e build;
- **ESLint** para lint do projeto;
- **TypeScript Compiler (`tsc`)** no processo de build.

### Organização do projeto

- páginas em [src/pages](src/pages)
- componentes em [src/components](src/components)
- contexto global em [src/context](src/context)
- tipo principal do domínio em [src/types](src/types)

### Por que essa stack faz sentido aqui

Essa stack é coerente com o projeto porque:

- React facilita a componentização da interface;
- TypeScript ajuda a modelar o estado dos palpites com mais segurança;
- React Router organiza o fluxo entre páginas;
- Context API é suficiente para um estado global enxuto e compartilhado;
- Vite oferece rapidez no desenvolvimento local;
- CSS-in-JS simplifica a construção de uma UI visualmente personalizada sem adicionar bibliotecas extras.

---

## Arquitetura e estrutura

### Estrutura de pastas

```text
mega-sena-suggester/
├── index.html
├── package.json
├── vite.config.ts
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── components/
    │   ├── Ball.tsx
    │   ├── Cartela.tsx
    │   ├── Header.tsx
    │   ├── PalpiteCard.tsx
    │   └── Roleta.tsx
    ├── context/
    │   └── PalpitesContext.tsx
    ├── pages/
    │   ├── HistoricoPage.tsx
    │   ├── HomePage.tsx
    │   ├── PalpitePage.tsx
    │   └── SorteioPage.tsx
    └── types/
        └── Palpite.ts
```

### Principais arquivos

| Arquivo                                                            | Papel no projeto                                                       |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [src/main.tsx](src/main.tsx)                                       | ponto de entrada, configuração do `BrowserRouter` e do provider global |
| [src/App.tsx](src/App.tsx)                                         | composição principal da aplicação e definição das rotas                |
| [src/context/PalpitesContext.tsx](src/context/PalpitesContext.tsx) | estado global dos palpites e persistência em `localStorage`            |
| [src/types/Palpite.ts](src/types/Palpite.ts)                       | tipo principal do domínio dos palpites                                 |
| [src/components/Header.tsx](src/components/Header.tsx)             | navegação principal da aplicação                                       |
| [src/components/Cartela.tsx](src/components/Cartela.tsx)           | seleção manual das dezenas                                             |
| [src/components/PalpiteCard.tsx](src/components/PalpiteCard.tsx)   | card visual do histórico com ações de edição/exclusão                  |
| [src/components/Roleta.tsx](src/components/Roleta.tsx)             | sorteio visual e histórico de sorteios                                 |

### Papel de cada página

#### [src/pages/HomePage.tsx](src/pages/HomePage.tsx)

- apresenta o projeto;
- explica rapidamente a proposta;
- direciona o usuário para geração de palpites e histórico.

#### [src/pages/PalpitePage.tsx](src/pages/PalpitePage.tsx)

- reúne o gerador automático e a cartela manual;
- exibe o último palpite automático gerado;
- integra o fluxo de criação de palpites ao contexto global.

#### [src/pages/HistoricoPage.tsx](src/pages/HistoricoPage.tsx)

- lista todos os palpites salvos;
- mostra totais resumidos de palpites;
- permite edição e exclusão;
- apresenta estado vazio quando não há dados.

#### [src/pages/SorteioPage.tsx](src/pages/SorteioPage.tsx)

- encapsula a experiência de sorteio;
- exibe o componente de roleta com visual mais estruturado;
- funciona como página de simulação e conferência.

### Contexto global / gerenciamento de estado

O projeto usa a **Context API** com o `PalpitesContext` para compartilhar o histórico de palpites entre páginas.

#### Estado disponível no contexto

- `palpites`
- `adicionarPalpite()`
- `editarPalpite()`
- `excluirPalpite()`

#### Persistência

Os palpites são persistidos no navegador pela chave:

- `palpitesMegaSena`

Já o histórico de sorteios é persistido separadamente em:

- `historicoSorteios`

### Separação entre lógica e apresentação

Existe uma separação funcional razoável para a escala atual do projeto:

- páginas cuidam da composição do fluxo;
- componentes concentram interações específicas e UI;
- o contexto concentra o estado compartilhado;
- o tipo `Palpite` evita tipagens soltas distribuídas pelo projeto.

Essa separação ainda pode evoluir para utilitários e hooks customizados no futuro, mas o projeto já demonstra uma base organizada para a proposta atual.

---

## Regras de negócio

### 1. Geração de palpites automáticos

**Implementado** em [src/pages/PalpitePage.tsx](src/pages/PalpitePage.tsx).

Regras atuais:

- gerar exatamente 6 números;
- cada número deve estar entre `1` e `60`;
- números não podem se repetir;
- o resultado final é ordenado em ordem crescente;
- o palpite recebe `id`, `tipo` igual a `automatico` e `data` em ISO string;
- ao gerar, o jogo já é salvo no contexto e no `localStorage`.

### 2. Seleção manual

**Implementado** em [src/components/Cartela.tsx](src/components/Cartela.tsx).

Regras atuais:

- a cartela mostra os números de `01` a `60`;
- o layout segue uma grade `6 x 10`;
- o usuário pode selecionar no máximo 6 dezenas;
- clicar em uma dezena já selecionada remove essa dezena;
- o botão de salvar fica desabilitado enquanto não houver exatamente 6 números;
- ao salvar, os números são ordenados e persistidos como palpite manual.

### 3. Histórico de palpites

**Implementado** em [src/pages/HistoricoPage.tsx](src/pages/HistoricoPage.tsx) e [src/components/PalpiteCard.tsx](src/components/PalpiteCard.tsx).

Regras atuais:

- todos os palpites salvos aparecem no histórico;
- o card exibe tipo do palpite, índice visual, data e dezenas;
- palpites são persistidos e reaparecem após atualizar a página;
- o histórico mostra contadores de total, manuais e automáticos.

### 4. Edição de palpite

**Implementado**.

Regras atuais:

- a edição acontece diretamente no card do histórico;
- os 6 números são alterados por inputs circulares;
- a validação bloqueia números repetidos;
- a validação bloqueia números fora do intervalo `1–60`;
- após salvar, o contexto é atualizado e a persistência é mantida.

### 5. Exclusão de palpite

**Implementado**.

Regras atuais:

- o usuário pode remover um palpite do histórico;
- a remoção atualiza estado global e `localStorage`.

### 6. Sorteio visual

**Implementado** em [src/components/Roleta.tsx](src/components/Roleta.tsx).

Regras atuais:

- 60 bolas são posicionadas dentro de uma área circular;
- as bolas se movem enquanto o sorteio está em andamento;
- 6 bolas são sorteadas sequencialmente;
- o resultado é comparado com os palpites salvos;
- o sistema considera vencedor apenas o palpite que contém exatamente as 6 dezenas sorteadas;
- o histórico de sorteios é salvo no navegador.

### 7. O que ainda não está implementado nessa regra de negócio

Itens ainda não implementados, mas coerentes com a direção do projeto:

- conferência de acertos parciais;
- ranking de proximidade entre palpites e sorteio;
- múltiplos modos de jogo;
- limpeza de histórico via interface.

---

## UI e experiência

O projeto segue uma direção visual de **dashboard premium**, com:

- fundo preto predominante;
- painéis com transparência leve;
- bordas suaves e sombras profundas;
- paleta com `#E36302`, `#028867` e `#3412E5`;
- tipografia com visual moderno;
- forte uso de cards e espaçamento generoso;
- interface construída para parecer mais produto de portfólio do que atividade inicial.

### Escolha por CSS-in-JS

O projeto usa **CSS-in-JS com estilos inline** porque isso estava alinhado com a proposta da atividade e também permitiu:

- controlar rapidamente a evolução visual das páginas;
- manter o estilo próximo da lógica de cada componente;
- evitar dependência extra de biblioteca de estilização;
- iterar no layout sem reestruturar o projeto com CSS externo.

### Como a interface foi pensada

A interface foi trabalhada com foco em:

- destaque visual para as ações principais;
- leitura clara da hierarquia entre páginas;
- maior sensação de produto finalizado;
- reforço da identidade da Mega-Sena sem copiar a cartela oficial literalmente;
- equilíbrio entre visual chamativo e legibilidade.

---

## Aprendizados

### O que foi aprendido em React

- composição de páginas com componentes reutilizáveis;
- renderização condicional para estados vazios, edição e resultados;
- organização de fluxo entre páginas usando rotas;
- uso de estado local para interações específicas.

### O que foi aprendido em TypeScript

- modelagem de um domínio simples com o tipo `Palpite`;
- tipagem explícita de props, estado e funções;
- uso de `Partial<Palpite>` para edição de dados;
- ganho de segurança ao compartilhar estado entre componentes.

### O que foi aprendido sobre Context API

- centralização de estado compartilhado;
- criação de provider para encapsular comportamento global;
- atualização de listas imutáveis com `map`, `filter` e concatenação;
- persistência sincronizada com `localStorage`.

### O que foi aprendido sobre rotas

- criação de fluxo real entre páginas;
- separação de responsabilidades por rota;
- navegação contextual pelo header;
- melhor experiência de uso em comparação com uma interface de página única desorganizada.

### O que foi aprendido sobre modelagem de estado

- distinção entre estado global e estado local;
- quando usar contexto e quando manter estado dentro de uma página/componente;
- persistência seletiva de dados realmente importantes;
- impacto de decisões de modelagem na escalabilidade do projeto.

### O que foi aprendido sobre componentização

- extração de responsabilidades para componentes como `Cartela`, `PalpiteCard`, `Ball` e `Roleta`;
- reaproveitamento visual com componentes menores;
- melhoria da legibilidade do código com divisão por domínio funcional.

### O que foi aprendido ao transformar um exercício simples em um projeto mais robusto

- um projeto de portfólio precisa de contexto, intenção e experiência de uso, não apenas funcionalidade;
- UI e arquitetura influenciam diretamente na percepção de qualidade;
- persistência, navegação, organização e documentação fazem parte do valor do projeto;
- evoluir um exercício é um ótimo treino de refatoração incremental e tomada de decisão técnica.

---

## Desafios encontrados

### 1. Evoluir a modelagem do estado

Um dos desafios foi sair de uma estrutura simples de “gerar números” para um domínio com:

- histórico;
- tipos de palpite;
- data de criação;
- edição e exclusão.

**Como foi resolvido:**

- criação do tipo `Palpite`;
- expansão do `PalpitesContext`;
- adoção de operações mais claras para adicionar, editar e excluir.

### 2. Persistência dos dados

Inicialmente, o histórico de palpites não sobrevivia ao refresh da página.

**Como foi resolvido:**

- sincronização do contexto com `localStorage`;
- carregamento inicial seguro com tratamento de JSON inválido.

### 3. Organização de UI com cara de portfólio

O projeto saiu de uma base visual simples e precisou ganhar hierarquia, identidade e consistência.

**Como foi resolvido:**

- padronização da paleta;
- componentes visuais reutilizáveis;
- header moderno;
- painéis escuros com profundidade;
- cartela e histórico mais elaborados.

### 4. Edição de palpites no histórico

Editar diretamente no card exigiu controle local de estado, validação e atualização global.

**Como foi resolvido:**

- controle de `palpiteEditando`;
- `numerosEditados` temporário;
- validação antes de persistir no contexto.

### 5. Performance percebida

A sensação de lentidão cresceu com o aumento da interface e com o componente de sorteio.

**Como foi tratada até agora:**

- remoção do `StrictMode` em desenvolvimento;
- memoização do componente `Ball`;
- uso de `useMemo` e `useCallback` em pontos críticos da cartela;
- redução de recriações desnecessárias.

**Observação:**
o componente de sorteio ainda é um ponto natural para futuras otimizações, por causa da animação contínua das bolas.

---

## Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm disponível no ambiente

### Instalação

```bash
npm install
```

### Como rodar localmente

```bash
npm run dev
```

### Scripts disponíveis

| Script          | Comando           | Finalidade                                   |
| --------------- | ----------------- | -------------------------------------------- |
| Desenvolvimento | `npm run dev`     | inicia o servidor local do Vite              |
| Build           | `npm run build`   | gera build de produção com TypeScript + Vite |
| Lint            | `npm run lint`    | executa verificação com ESLint               |
| Preview         | `npm run preview` | sobe a prévia da build gerada                |

### Como acessar no navegador

Após rodar `npm run dev`, o Vite exibirá a URL local no terminal, normalmente algo como:

```text
http://localhost:5173
```

---

## Como usar

### 1. Página inicial

- abra a aplicação;
- leia a apresentação do projeto;
- use os botões para ir para a área de palpites ou histórico.

### 2. Página de palpites

Você pode seguir por dois caminhos:

#### Geração automática

- clique em **Nova sugestão**;
- o sistema gera 6 números aleatórios únicos;
- o palpite é salvo automaticamente.

#### Seleção manual

- clique nas dezenas da cartela;
- selecione exatamente 6 números;
- use **Salvar seleção manual** para registrar o jogo.

### 3. Página de histórico

- visualize todos os palpites já criados;
- edite as dezenas quando necessário;
- exclua jogos que não deseja manter;
- acompanhe total, automáticos e manuais.

### 4. Página de sorteio

- inicie o sorteio visual;
- aguarde a revelação das 6 dezenas;
- consulte o histórico dos sorteios já realizados;
- veja se algum palpite acertou os 6 números.

---

## Roadmap / backlog

### Prioridade alta

- melhorar a comparação entre sorteio e palpites com destaque de acertos;
- adicionar feedback visual mais claro para vitória e derrota;
- refinar a performance do sorteio visual;
- melhorar acessibilidade básica de navegação e contraste;
- disponibilizar uma ação visual para limpar dados salvos no navegador.

### Prioridade média

- adicionar filtros por tipo na página de histórico;
- ordenar palpites por data;
- melhorar a responsividade fina da cartela em telas menores;
- refinar microinterações de hover e foco;
- tornar a conferência do sorteio mais analítica.

### Prioridade baixa

- adicionar modo tema alternativo;
- incluir estatísticas adicionais de uso;
- explorar exportação local de histórico;
- criar página de ajuda ou onboarding;
- adicionar animações mais ricas para apresentação inicial.

---

## Product backlog

| Épico               | Feature             | Tarefa                                           | Prioridade | Status       |
| ------------------- | ------------------- | ------------------------------------------------ | ---------- | ------------ |
| Geração de palpites | Sugestão automática | Gerar 6 dezenas únicas e salvar automaticamente  | Alta       | ✅ Concluído |
| Geração de palpites | Seleção manual      | Permitir marcar até 6 dezenas na cartela         | Alta       | ✅ Concluído |
| Geração de palpites | Persistência        | Salvar palpites no navegador                     | Alta       | ✅ Concluído |
| Histórico           | Visualização        | Listar palpites em cards com tipo e data         | Alta       | ✅ Concluído |
| Histórico           | Manutenção          | Editar palpite salvo                             | Alta       | ✅ Concluído |
| Histórico           | Manutenção          | Excluir palpite salvo                            | Alta       | ✅ Concluído |
| Sorteio             | Simulação           | Animar roleta e sortear 6 dezenas                | Alta       | ✅ Concluído |
| Sorteio             | Conferência         | Verificar se houve palpite vencedor              | Alta       | ✅ Concluído |
| Sorteio             | Resultado avançado  | Destacar acertos parciais                        | Alta       | ⏳ Backlog   |
| Histórico           | Filtros             | Filtrar por manual/automático                    | Média      | ⏳ Backlog   |
| Qualidade           | Testes              | Cobrir regras principais com testes              | Média      | ⏳ Backlog   |
| Produto             | Deploy              | Publicar aplicação online                        | Média      | ⏳ Backlog   |
| UX                  | Acessibilidade      | Melhorar foco, semântica e navegação por teclado | Média      | ⏳ Backlog   |
| Produto             | Gestão de dados     | Criar reset visual dos dados salvos              | Baixa      | ⏳ Backlog   |

---

## User stories

- Como **usuário**, eu quero **gerar um palpite automático**, para **testar rapidamente uma combinação sem escolher manualmente**.
- Como **usuário**, eu quero **escolher 6 números manualmente**, para **montar meu próprio jogo**.
- Como **usuário**, eu quero **salvar meus palpites**, para **consultá-los depois sem perder os dados ao atualizar a página**.
- Como **usuário**, eu quero **visualizar meu histórico de palpites**, para **acompanhar tudo o que já gerei ou selecionei**.
- Como **usuário**, eu quero **editar um palpite salvo**, para **corrigir dezenas sem precisar criar outro jogo do zero**.
- Como **usuário**, eu quero **excluir um palpite salvo**, para **manter meu histórico organizado**.
- Como **usuário**, eu quero **iniciar um sorteio visual**, para **comparar meus jogos com um resultado simulado**.
- Como **usuário**, eu quero **saber se acertei todos os números**, para **validar meus palpites no sorteio**.

---

## Critérios de aceite

### User story: gerar palpite automático

- dado que o usuário está na página de palpites,
- quando clicar em **Nova sugestão**,
- então o sistema deve gerar 6 números únicos entre 1 e 60;
- e deve ordenar os números em ordem crescente;
- e deve salvar o palpite no histórico.

### User story: escolher números manualmente

- dado que o usuário está na cartela manual,
- quando selecionar dezenas,
- então o sistema deve permitir no máximo 6 números;
- e deve permitir desmarcar uma dezena clicando novamente;
- e só deve permitir salvar quando houver exatamente 6 dezenas escolhidas.

### User story: visualizar histórico

- dado que existem palpites salvos,
- quando o usuário acessar a página de histórico,
- então deve visualizar todos os jogos cadastrados;
- e cada card deve exibir tipo, dezenas e data quando disponível.

### User story: editar palpite

- dado que existe um palpite salvo,
- quando o usuário entrar em modo de edição,
- então deve conseguir alterar as dezenas;
- e o sistema deve impedir números repetidos ou fora do intervalo 1–60;
- e após salvar, o histórico deve ser atualizado.

### User story: excluir palpite

- dado que existe um palpite salvo,
- quando o usuário clicar em excluir,
- então o item deve ser removido do histórico;
- e a persistência local deve refletir essa exclusão.

### User story: iniciar sorteio

- dado que o usuário está na página de sorteio,
- quando clicar em iniciar,
- então o sistema deve sortear 6 dezenas;
- e registrar o resultado no histórico de sorteios.

### User story: verificar se acertei

- dado que existem palpites salvos,
- quando o sorteio terminar,
- então o sistema deve verificar se algum palpite contém exatamente as 6 dezenas sorteadas;
- e deve exibir mensagem informando se houve palpite vencedor.

---

## Definition of Ready (DoR)

Uma tarefa deste projeto está pronta para desenvolvimento quando:

- o objetivo da funcionalidade está claro;
- o comportamento esperado foi definido;
- dependências e impacto no fluxo foram identificados;
- os arquivos afetados são conhecidos;
- o critério de aceite foi minimamente descrito;
- não há dúvida relevante sobre o escopo imediato.

---

## Definition of Done (DoD)

Uma funcionalidade pode ser considerada pronta neste projeto quando:

- o código foi implementado;
- a tipagem está coerente com TypeScript;
- não há erros de lint/TypeScript conhecidos no arquivo alterado;
- o comportamento foi validado manualmente;
- a UI está consistente com o restante da aplicação;
- a funcionalidade foi integrada ao contexto e às rotas quando necessário;
- a persistência foi considerada quando o fluxo exigir armazenamento local.

---

## Autor

Projeto desenvolvido como evolução de uma atividade acadêmica para um projeto de portfólio em frontend.

### Contato / portfólio

- GitHub: https://github.com/GianlucaAlves
- LinkedIn: https://www.linkedin.com/in/gianluca-alves
- Portfólio: https://portfolio-gamma-peach-gelajuwt1r.vercel.app
- E-mail: alves.gian@ymail.com

---

## Observação final

Este repositório mostra não só a implementação de funcionalidades em React + TypeScript, mas também o processo de transformação de uma atividade base em um projeto com mais preocupação de produto, UX, organização e documentação técnica.
