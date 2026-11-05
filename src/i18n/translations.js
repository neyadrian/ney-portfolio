const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Back-End Developer",
      titleLine: "Building the logic behind",
      titleHighlight: "innovation.",
      desc: "Back-end developer working with Java and Spring Boot. Software Engineering student at IFCE.",
      ctaLinkedin: "LinkedIn",
      ctaWhatsapp: "WhatsApp",
      scroll: "SCROLL",
    },
    about: {
      label: "About me",
      title: "Who I am",
      titleDim: "beyond the stack",
      name: "Ney Adrian",
      role: "Back-End Developer · Software Engineering",
      slides: [
        {
          kicker: "Back-End Developer · IFCE",
          title: "Ney Adrian",
          body: "I am a Software Engineering student at IFCE and a back-end developer. I like turning messy problems into clear APIs and architectures that other people can actually maintain.",
        },
        {
          kicker: "How I work",
          title: "Curious, practical, shipping",
          body: "I learn by building: banking sims, GPS graphs, HR systems, and products that went live like Commit Card. I care about clean structure, SQL done right, and code that still makes sense months later.",
        },
        {
          kicker: "What I am exploring",
          title: "Better workflows",
          body: "I am drawn to new tools — including language-model automations — when they save time and raise quality. If you want to talk back-end, products or that mix, let's connect.",
        },
      ],
    },
    skills: {
      label: "Technologies",
      title: "What I",
      titleDim: "work with",
      items: {
        java: {
          title: "Java",
          desc: "Object-oriented language I use to build solid, scalable back-end systems.",
        },
        spring: {
          title: "Spring Boot",
          desc: "Framework I use to ship REST APIs, security and production-ready services.",
        },
        mysql: {
          title: "MySQL",
          desc: "Relational database I use for structured data and transactional workloads.",
        },
        postgres: {
          title: "PostgreSQL",
          desc: "Advanced SQL database I use when I need reliability and richer queries.",
        },
        docker: {
          title: "Docker",
          desc: "I containerize apps so they run the same way locally and in production.",
        },
        nodejs: {
          title: "Node.js",
          desc: "I use Node.js for APIs, tooling and JavaScript services around the Java stack.",
        },
      },
    },
    contributions: {
      label: "GitHub",
      title: "A year of",
      titleDim: "commits",
      unit: "contribution",
      unitPlural: "contributions",
    },
    projects: {
      label: "Portfolio",
      title: "Recent",
      titleDim: "projects",
      featured: "Featured",
      visitSite: "Visit site",
      viewGithub: "View on GitHub",
      items: {
        commitcard: {
          title: "Commit Card",
          desc: "Turns a GitHub profile into a shareable portfolio and PDF resume. GitHub OAuth login, featured projects, certificates and awards, and one-click resume export — built solo, live in production at commitcard.com.br.",
        },
        banco: {
          title: "Banking System",
          desc: "Desktop banking simulator in Java: deposits, withdrawals, PIX transfers, detailed statements and loan simulation. Built with MVC architecture and SOLID principles (SRP, OCP, LSP).",
        },
        gps: {
          title: "GPS System",
          desc: "Terminal navigation app in C that uses graphs and Dijkstra's algorithm to find the shortest route between cities, with file persistence and automatic logging.",
        },
        cinema: {
          title: "Cinema Seating System",
          desc: "Java app for managing a cinema's seating chart with a 10x10 matrix, seat reservation and occupied-seat validation.",
        },
        rh: {
          title: "HR Management System",
          desc: "Java employee management system using inheritance, polymorphism, enums and collections to calculate manager and salesperson pay.",
        },
        logitrack: {
          title: "LogiTrack",
          desc: "Java fleet management system applying the Singleton and Strategy design patterns and the SOLID SRP and DIP principles.",
        },
        supermercado: {
          title: "Product Lookup System",
          desc: "Java client-server app for product price lookups over TCP and UDP sockets, with a central catalog and multi-threaded connections.",
        },
        geladao: {
          title: "Geladão Bebidas Inventory",
          desc: "Inventory management system for Geladão Bebidas.",
        },
      },
    },
    footer: {
      builtBy: "Built by Ney Adrian",
      tagline: "Developed with dedication and focus on results.",
    },
    themeToggle: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    langToggle: "Switch language",
  },

  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      badge: "Desenvolvedor Back-End",
      titleLine: "Construindo a lógica por trás da",
      titleHighlight: "inovação.",
      desc: "Desenvolvedor Back-End com Java e Spring Boot. Estudante de Engenharia de Software pelo IFCE.",
      ctaLinkedin: "LinkedIn",
      ctaWhatsapp: "WhatsApp",
      scroll: "ROLAR",
    },
    about: {
      label: "Sobre mim",
      title: "Quem eu sou",
      titleDim: "fora do stack",
      name: "Ney Adrian",
      role: "Desenvolvedor Back-End · Engenharia de Software",
      slides: [
        {
          kicker: "Desenvolvedor Back-End · IFCE",
          title: "Ney Adrian",
          body: "Sou estudante de Engenharia de Software no IFCE e desenvolvedor back-end. Gosto de transformar problemas bagunçados em APIs claras e arquiteturas que dá para manter de verdade.",
        },
        {
          kicker: "Como eu trabalho",
          title: "Curioso, prático, entregando",
          body: "Aprendo construindo: simuladores bancários, GPS com grafos, sistemas de RH e produtos no ar como o Commit Card. Ligo para estrutura limpa, SQL bem feito e código que ainda faz sentido daqui a meses.",
        },
        {
          kicker: "O que estou explorando",
          title: "Fluxos melhores",
          body: "Me interesso por ferramentas novas — inclusive automações com modelos de linguagem — quando elas poupam tempo e sobem a qualidade. Se quiser falar de back-end, produto ou essa mistura, vamos nos conectar.",
        },
      ],
    },
    skills: {
      label: "Tecnologias",
      title: "O que eu",
      titleDim: "uso",
      items: {
        java: {
          title: "Java",
          desc: "Linguagem orientada a objetos que uso para construir sistemas back-end solidos e escalaveis.",
        },
        spring: {
          title: "Spring Boot",
          desc: "Framework que uso para entregar APIs REST, seguranca e servicos prontos para producao.",
        },
        mysql: {
          title: "MySQL",
          desc: "Banco relacional que uso para dados estruturados e cargas transacionais.",
        },
        postgres: {
          title: "PostgreSQL",
          desc: "Banco SQL avancado que uso quando preciso de confiabilidade e consultas mais ricas.",
        },
        docker: {
          title: "Docker",
          desc: "Empacoto aplicacoes em containers para rodarem igual no local e em producao.",
        },
        nodejs: {
          title: "Node.js",
          desc: "Uso Node.js para APIs, ferramentas e serviços em JavaScript ao redor do stack Java.",
        },
      },
    },
    contributions: {
      label: "GitHub",
      title: "Um ano de",
      titleDim: "commits",
      unit: "contribuição",
      unitPlural: "contribuições",
    },
    projects: {
      label: "Portfólio",
      title: "Projetos",
      titleDim: "recentes",
      featured: "Destaque",
      visitSite: "Acessar site",
      viewGithub: "Ver no GitHub",
      items: {
        commitcard: {
          title: "Commit Card",
          desc: "Transforma o perfil do GitHub em um portfólio compartilhável e currículo em PDF. Login via OAuth do GitHub, projetos em destaque, certificados e prêmios, e exportação de currículo com um clique — construído sozinho, no ar em produção em commitcard.com.br.",
        },
        banco: {
          title: "Sistema Bancário",
          desc: "Simulador bancário desktop em Java: depósitos, saques, transferências via PIX, extrato detalhado e simulação de empréstimos. Construído com arquitetura MVC e princípios SOLID (SRP, OCP, LSP).",
        },
        gps: {
          title: "Sistema de GPS",
          desc: "Sistema de navegação via terminal em C que usa grafos e o algoritmo de Dijkstra para calcular a rota mais curta entre cidades, com persistência em arquivo e logs automáticos.",
        },
        cinema: {
          title: "Sistema de Assentos de Cinema",
          desc: "Aplicação em Java para gerenciar o mapa de assentos de uma sala de cinema com matriz 10x10, reserva de poltronas e validação de assentos ocupados.",
        },
        rh: {
          title: "Sistema de Gestão de RH",
          desc: "Sistema de gestão de funcionários em Java usando herança, polimorfismo, enums e collections para calcular o salário de gerentes e vendedores.",
        },
        logitrack: {
          title: "LogiTrack",
          desc: "Sistema de gerenciamento de frota em Java aplicando os padrões de projeto Singleton e Strategy, além dos princípios SOLID SRP e DIP.",
        },
        supermercado: {
          title: "Sistema de Consulta de Produtos",
          desc: "Aplicação cliente-servidor em Java para consulta de preços via sockets TCP e UDP, com catálogo central e conexões multi-thread.",
        },
        geladao: {
          title: "Estoque Geladão Bebidas",
          desc: "Sistema de gerenciamento de estoque para o Geladão Bebidas.",
        },
      },
    },
    footer: {
      builtBy: "Desenvolvido por Ney Adrian",
      tagline: "Desenvolvido com dedicação e foco em resultados.",
    },
    themeToggle: {
      toLight: "Mudar para modo claro",
      toDark: "Mudar para modo escuro",
    },
    langToggle: "Mudar idioma",
  },
};

export default translations;
