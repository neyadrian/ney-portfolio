# Portfólio — atualização

## O que mudou

**1. Modo claro/escuro**
Novo `ThemeContext` (`src/context/ThemeContext.jsx`) controla um atributo `data-theme` na tag `<html>`, com as cores de cada tema centralizadas em `src/styles/theme.css`. Um botão de sol/lua no header alterna entre eles e a escolha fica salva (`localStorage`). Um pequeno script no `index.html` aplica o tema salvo antes da primeira renderização, pra não piscar a cor errada ao carregar a página.

**2. Inglês/Português, inglês como padrão**
Novo `LanguageContext` (`src/context/LanguageContext.jsx`) + `src/i18n/translations.js` com todos os textos da interface nos dois idiomas. Botão "EN / PT" no header alterna e também fica salvo. Todo o conteúdo visível (nav, hero, skills, projetos, footer) agora vem desse arquivo — pra adicionar/editar texto, é só mexer em `translations.js`.

**3. Removidos "+2 anos estudando" e "+3 projetos"**
Os dois cards flutuantes saíram do Hero. No lugar, um pequeno cartão estilo terminal (`git log --oneline -1`) mostrando o commit mais recente — reforça a identidade "dev" da página sem números soltos.

**4. Tecnologias atualizadas**
A seção Skills agora reflete o que aparece nos seus repositórios: Java, Spring Boot, C, MySQL, PostgreSQL, Hibernate/JPA, Maven, Docker, Git, GitHub, Postman. Removi Figma e Photoshop (ligados ao projeto IDMI, que não está mais na lista atual).

**5. Projetos**
CommitCard entra como card em destaque (maior, com badge "Featured/Destaque" e link direto pro site em produção). Os outros seis projetos vêm dos repositórios que você passou, com descrição extraída de cada README:

| Projeto | Repositório |
|---|---|
| Commit Card *(destaque)* | commitcard.com.br |
| Sistema Bancário | `projeto-banc-rio` |
| Sistema de GPS | `sistema-gps` |
| Sistema de Assentos de Cinema | `sistema-cinema` |
| Sistema de Gestão de RH | `gestao-rh` |
| LogiTrack | `Logi-Track` |
| Sistema de Consulta de Produtos | `sistema-supermercado` |

O To-Do List e o projeto IDMI saíram da lista, já que você não os incluiu nos links enviados.

## Estrutura de arquivos

```
index.html
src/
├── App.jsx                    # novo — junta os providers e as seções
├── main.jsx                   # novo — importa os CSS modulares
├── i18n/
│   └── translations.js        # novo — todos os textos EN/PT
├── context/
│   ├── ThemeContext.jsx       # novo
│   └── LanguageContext.jsx    # novo
├── components/
│   ├── Header.jsx             # atualizado — toggles de tema/idioma
│   ├── Hero.jsx                # atualizado — sem stats, com card terminal
│   ├── Skills.jsx              # atualizado — novas tecnologias
│   ├── Projects.jsx            # atualizado — CommitCard + novos repos
│   ├── Footer.jsx              # atualizado — textos traduzidos
│   └── Cursor.jsx              # sem alterações
└── styles/
    ├── theme.css                # novo — variáveis de cor (claro/escuro)
    ├── base.css                  # novo — reset, cursor, botões, seções
    ├── header.css                 # atualizado
    ├── hero.css                    # atualizado
    ├── skills.css                  # atualizado
    ├── projects.css                # novo — antes estava dentro do global.css
    └── footer.css                  # novo — antes estava dentro do global.css
```

## Um ponto de atenção

Os arquivos `header.css`, `hero.css` e `skills.css` que você tinha enviado usavam nomes de variável (`--font-mono`, `--surface`, `--text-muted`, `--accent-dim`, `--transition`) que não existiam no `global.css` — ou seja, esses estilos provavelmente não estavam sendo aplicados direito. Eu unifiquei tudo em cima de um único sistema de variáveis (`theme.css`), então esse problema não existe mais.

Não tinha `App.jsx` nem `main.jsx` entre os arquivos que você me mandou — criei os dois do zero seguindo a estrutura padrão do Vite. Se você já tinha versões próprias desses arquivos com alguma lógica adicional, vale conferir antes de substituir.
