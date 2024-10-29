# Organizador de Tarefas

Este é um aplicativo de linha de comando simples para organizar e gerenciar metas pessoais, desenvolvido para praticar lógica de programação e manipulação de arquivos no Node.js. As próximas melhorias envolvem integração com a AWS, afim de rodar o aplicativo na nuvem.

## Funcionalidades
- **Cadastrar metas**: Adicione novas metas para acompanhar.
- **Listar metas**: Visualize suas metas e marque as concluídas.
- **Metas realizadas**: Veja as metas que já foram concluídas.
- **Metas abertas**: Verifique as metas ainda pendentes.
- **Deletar metas**: Remova metas da lista.
- **Persistência**: As metas são salvas em um arquivo JSON para garantir que não sejam perdidas entre sessões.

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/galenomichel/Organizador-de-Tarefas.git
   cd Organizador-de-Tarefas
2. Instale as dependências:
   ```bash
   npm install
3. Execute o aplicativo:
   ```bash
   node index.js

## Tecnologias utilizadas
- Node.js
- Inquirer para interface de prompts no terminal
- Manipulação de arquivos JSON com o módulo fs do Node.js

## Próximas melhorias
- Interface gráfica
- Hospedagem na AWS
- Integração com banco de dados
- Integração com AWS Lambda
