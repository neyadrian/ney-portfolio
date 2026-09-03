const translations = {
  en: {
    nav: {
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
      ctaProjects: "View Projects",
      ctaLinkedin: "LinkedIn",
      scroll: "SCROLL",
      terminalLabel: "latest commits",
      terminalCmd: "git log --oneline -2",
      terminalOutput1: "feat: ship CommitCard to production 🚀",
      terminalOutput2: "feat: implement inventory for Geladão Bebidas 📦",
    },
    skills: {
      label: "Technologies",
      title: "What I",
      titleDim: "work with",
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
    },
    themeToggle: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    langToggle: "Switch language",
  },

  pt: {
    nav: {
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
      ctaProjects: "Ver Projetos",
      ctaLinkedin: "LinkedIn",
      scroll: "ROLAR",
      terminalLabel: "últimos commits",
      terminalCmd: "git log --oneline -2",
      terminalOutput1: "feat: publica o CommitCard em produção 🚀",
      terminalOutput2: "feat: implementa estoque do Geladão Bebidas 📦",
    },
    skills: {
      label: "Tecnologias",
      title: "O que eu",
      titleDim: "uso",
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
    },
    themeToggle: {
      toLight: "Mudar para modo claro",
      toDark: "Mudar para modo escuro",
    },
    langToggle: "Mudar idioma",
  },
};

export default translations;
