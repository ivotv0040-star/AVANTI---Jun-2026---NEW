# CLAUDE.md — AVAN.TI

Instruções permanentes para trabalhar neste projeto.

## Stack utilizada

- **Vite** ^5.4.19 (bundler/dev server) com `@vitejs/plugin-react-swc` ^3.11.0
- **React** ^18.3.1 + **React DOM** ^18.3.1
- **TypeScript** ^5.8.3
- **React Router DOM** ^6.30.1 (roteamento client-side, definido em `src/App.tsx`)
- **shadcn-ui** (componentes em `src/components/ui`, baseados em **Radix UI**)
- **Tailwind CSS** ^3.4.17 (+ `tailwindcss-animate`, `@tailwindcss/typography`)
- **TanStack Query** (`@tanstack/react-query`) ^5.83.0
- **React Hook Form** ^7.61.1 + **Zod** ^3.25.76 (formulários e validação)
- **next-themes** (dark/light mode), **sonner** (toasts), **recharts** (gráficos), `date-fns`, `embla-carousel-react`, `@11labs/react`
- **ESLint** ^9.32.0 + `typescript-eslint` ^8.38.0

Projeto é uma **SPA 100% frontend** — não há backend próprio no repositório (sem API, ORM ou config de banco de dados).

## Estrutura principal

```
src/
├── App.tsx              # providers globais (Query, Theme, Language, Sidebar, Tooltip) e definição de rotas
├── main.tsx             # entry point
├── pages/                # uma página por rota
├── components/
│   ├── dashboard/        # componentes específicos do dashboard
│   └── ui/               # componentes shadcn-ui (button, dialog, card, table, etc.)
├── contexts/             # LanguageContext, SearchContext, SidebarContext
├── hooks/                # use-mobile, use-toast
├── lib/utils.ts          # helpers (ex: cn())
└── assets/               # imagens estáticas
```

Configs relevantes na raiz: `vite.config.ts` (dev server na porta 8080), `tailwind.config.ts`, `components.json` (config do shadcn, alias `@/`), `tsconfig*.json`, `eslint.config.js`.

## Comandos

- `npm run dev` — servidor de desenvolvimento (porta 8080)
- `npm run build` — build de produção
- `npm run build:dev` — build em modo development
- `npm run lint` — roda ESLint
- `npm run preview` — serve o build gerado

## Regras de trabalho

1. **Preservar funcionalidades existentes.** Nunca remover ou quebrar comportamento já implementado ao fazer uma alteração, a menos que seja explicitamente solicitado.

2. **Reutilizar antes de criar.** Antes de criar um novo componente, hook ou util, verificar se já existe algo equivalente em `src/components/ui`, `src/components/dashboard`, `src/hooks` ou `src/lib`. Priorizar reutilização/composição sobre duplicação.

3. **Não instalar novas dependências sem autorização.** Qualquer pacote novo em `package.json` (dependencies ou devDependencies) precisa ser explicitamente aprovado antes de ser adicionado.

4. **Não remover ou substituir bibliotecas existentes sem autorização.** Trocar uma lib por outra (ex: trocar Zod por Yup, trocar recharts por outra lib de gráficos) exige aprovação explícita antes.

5. **Analisar o código existente antes de alterar.** Ler os arquivos relevantes (componente, página, contexto) e entender padrões já usados no projeto antes de propor ou aplicar mudanças.

6. **Manter TypeScript e organização de componentes.** Tipar corretamente (evitar `any`), seguir a separação já existente entre `pages/`, `components/ui/`, `components/dashboard/`, `contexts/`, `hooks/` e `lib/`, e manter convenções de nomenclatura já usadas no projeto.

7. **Verificar após alterações de código.** Depois de editar código, checar erros de tipagem/lint e rodar `npm run lint` e/ou `npm run build` quando fizer sentido para a mudança feita.

8. **Explicar antes de mudanças grandes.** Para alterações que afetem múltiplos arquivos ou estrutura do projeto, explicar o plano e listar os arquivos que serão modificados antes de executar.
