## Plano de integração do HeroHighlight

O projeto já suporta a estrutura necessária:
- React + TypeScript com Vite
- Tailwind CSS configurado em `tailwind.config.ts` e `src/index.css`
- shadcn/ui configurado em `components.json`
- Alias `@/` apontando para `src/`
- Caminho padrão de componentes UI: `src/components/ui`, que corresponde ao import `@/components/ui/...`

## O que será feito

1. Instalar a dependência necessária
   - Adicionar `framer-motion` ao projeto.

2. Criar o componente UI
   - Criar `src/components/ui/hero-highlight.tsx`.
   - Adaptar o código fornecido para funcionar corretamente neste projeto Vite/React.
   - Manter o uso de `cn` de `@/lib/utils`.
   - Usar `motion`, `useMotionValue` e `useMotionTemplate` do `framer-motion`.
   - Remover a diretiva `"use client"`, pois ela é específica de Next.js e não é necessária neste app.

3. Corrigir o JSX do componente fornecido
   - O trecho enviado veio com partes de marcação omitidas/quebradas.
   - Vou reconstruir a estrutura visual do `HeroHighlight` com:
     - container relativo com overflow oculto;
     - fundo com padrão pontilhado;
     - efeito radial acompanhando o mouse;
     - wrapper central para `children`;
     - componente `Highlight` com destaque visual animado.

4. Adicionar um demo opcional no lugar correto
   - Criar um componente de demonstração em `src/components/app/HeroHighlightDemo.tsx` ou usar diretamente onde fizer sentido.
   - Como você pediu integração de componente existente, vou manter o app sem mudança visual ampla, a menos que seja desejado aplicar o HeroHighlight na tela inicial.
   - Se aplicado na home, será apenas no hero principal de `src/pages/Index.tsx`, preservando o conteúdo atual do app.

5. Validar a integração
   - Rodar verificação de TypeScript/build para confirmar que imports e tipos estão corretos.

## Observações técnicas

- Não será necessário criar `/components/ui` na raiz, porque neste projeto o padrão shadcn está configurado como `src/components/ui` via alias `@/components/ui`.
- O componente não exige imagens, assets externos, contexto global ou provider adicional.
- O componente aceita apenas:
  - `children`
  - `className`
  - `containerClassName`
- Nenhum ícone ou imagem Unsplash é necessário para este componente específico.

## Resultado esperado

Ao aprovar, o projeto terá o componente `HeroHighlight` disponível em:

```text
src/components/ui/hero-highlight.tsx
```

E ele poderá ser usado assim:

```tsx
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
```