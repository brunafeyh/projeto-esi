# Sistema de Gestão de Restaurante Carinho

## Descrição

Este projeto visa desenvolver um sistema de gestão para restaurantes, abrangendo funcionalidades como controle de estoque, gestão de pedidos, e registro de pontos de fidelidade. O objetivo é automatizar processos operacionais, melhorar a eficiência e fornecer relatórios detalhados para a administração.

## Índice

1. [Objetivo do Sistema](#objetivo-do-sistema)
2. [Objetivo Específico](#objetivo-específico)
3. [Escopo](#escopo)
4. [Problemas](#problemas)
5. [Lista de Usuários](#lista-de-usuários)
6. [Visão do Sistema](#visão-do-sistema)
7. [Necessidades e Pedidos](#necessidades-e-pedidos)
8. [Requisitos Funcionais](#requisitos-funcionais)
9. [Requisitos Não Funcionais](#requisitos-não-funcionais)
10. [Requisitos Inversos](#requisitos-inversos)
11. [Restrições / Obrigações Externas e de Projeto](#restrições--obrigações-externas-e-de-projeto)
12. [Configuração de Software](#configuração-de-software)
13. [Como Contribuir](#como-contribuir)
14. [Licença](#licença)

## Objetivo do Sistema

O sistema de gestão de restaurante tem como objetivo automatizar e otimizar processos operacionais, incluindo o controle de estoque, gestão de pedidos, e o registro de pontos de fidelidade dos clientes. O sistema visa proporcionar uma gestão mais eficiente e uma experiência aprimorada para os clientes e administradores.

## Objetivo Específico

- Automatizar o processo de compra de produtos com base nas quantidades em estoque e nas necessidades de vendas.
- Melhorar o processo de matrícula de alunos na universidade.
- Fornecer relatórios detalhados sobre as vendas e o desempenho dos produtos.

## Escopo

O sistema será integrado com outros sistemas da empresa para uma gestão completa e eficiente. O diagrama de contexto e a descrição detalhada do escopo serão fornecidos na documentação técnica.

## Problemas

| Problema                         | Quem Afeta          | Impacto                               | Solução                                                 |
|----------------------------------|----------------------|---------------------------------------|---------------------------------------------------------|
| Controle manual de estoque        | Administração        | Erros e falta de eficiência            | Automatizar o controle de estoque                      |
| Processo de matrícula manual      | Administração e Alunos | Tempo e propensão a erros              | Automatizar o processo de matrícula                    |
| Falta de relatórios detalhados    | Administração        | Dificuldade na tomada de decisões       | Implementar relatórios detalhados sobre vendas e lucros |

## Lista de Usuários

| Tipo de Usuário | Descrição                                                      |
|-----------------|------------------------------------------------------------------|
| Administrador   | Gerencia o sistema, visualiza relatórios e gerencia o estoque.  |
| Atendente       | Registra pedidos e gerencia o consumo dos clientes.            |
| Cliente         | Realiza pedidos e acumula pontos de fidelidade.                |

## Visão do Sistema

O sistema será utilizado para gerenciar o estoque, registrar pedidos e acompanhar o consumo dos clientes. Os principais processos incluem:

- Cadastro e gerenciamento de clientes e pedidos.
- Controle e atualização do estoque de ingredientes.
- Geração de relatórios sobre vendas e pontos de fidelidade.

## Necessidades e Pedidos

### NEC: Lista de Necessidades e Justificativas

- **NECx:** Melhorar e Automatizar o Controle de Estoque da Empresa
  - **SR1:** Automatizar o processo de compra de produtos, considerando as quantidades em estoque existentes e as necessidades para garantir vendas rentáveis.

- **NECx:** Automatizar e Melhorar o Processo de Matrícula dos Alunos na Universidade
  - **SR1:** Automatizar o processo de matrícula, considerando os critérios de [critérios específicos].

## Requisitos Funcionais

- [RF001] O sistema deve permitir a autenticação dos usuários via login.
- [RF002] O sistema deve manter o cadastro de clientes.
- [RF003] O sistema deve registrar o consumo do cliente.
- [RF004] O sistema deve contabilizar os pontos de fidelidade do cliente baseado em seu consumo.
- [RF005] O sistema deve possibilitar que o atendente registre o pedido do cliente.
- [RF006] O sistema deve possibilitar a visualização dos pedidos dos clientes.
- [RF007] O sistema deve possibilitar a exibição dos pratos em formato de cardápio.
- [RF008] O sistema deve indicar quais pratos estão disponíveis e quais estão indisponíveis.
- [RF009] O sistema deve informar o valor dos pratos em reais e em pontos de fidelidade.
- [RF010] O sistema deve manter os cadastros dos pratos oferecidos pelo restaurante.
- [RF011] O sistema deve manter os registros dos ingredientes dos pratos oferecidos pelo restaurante.
- [RF012] O sistema deve possibilitar a adição de ingredientes ao estoque do restaurante.
- [RF013] O sistema deve possibilitar a retirada de ingredientes do estoque do restaurante.
- [RF015] O sistema deve fornecer ao administrador a estatística dos produtos mais vendidos por dia.
- [RF016] O sistema deve fornecer ao administrador informação sobre os lucros das vendas por dia.

## Requisitos Não Funcionais

- [RNF01] O sistema deve ser desenvolvido com uma interface gráfica implementada com o framework React e a linguagem de programação TypeScript.
- [RNF02] O sistema deve ser desenvolvido através de uma API REST com o framework Spring Boot e a linguagem de programação Java.
- [RNF03] O sistema deve ser implementado como sistema Web.

## Requisitos Inversos

- [RI01] O sistema não deve permitir que um usuário que não seja administrador tenha acesso às estatísticas de vendas e lucros do restaurante.
- [RI02] O sistema não deve permitir que seja cadastrado um usuário com CPF repetido.
- [RI03] O sistema não deve permitir que o usuário insira um CPF inválido.
- [RI04] O sistema não deve permitir que o cliente compre um produto com pontos de fidelidade insuficientes.

## Restrições / Obrigações Externas e de Projeto

### 9.1 Restrições Técnicas

- Configuração de rede e servidores devem ser compatíveis com os requisitos de performance do sistema.

### 9.2 Restrições de Negócio

- O sistema deve atender aos critérios de qualidade definidos pela empresa, e a aquisição de informações deve seguir as diretrizes estabelecidas.

## Configuração de Software

### 10.1 Tecnologias de Desenvolvimento

- **Frontend:** React, TypeScript
- **Backend:** Spring Boot, Java
