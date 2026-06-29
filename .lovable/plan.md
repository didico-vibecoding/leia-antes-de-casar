Objetivo: deixar a logo "Escola de Ciências Jurídicas e Sociais / Direito" no hero da home estática, removendo o efeito de flutuação (animate-float) dela.

Escopo:
- Ajustar `src/pages/Index.tsx` removendo a classe `animate-float` da imagem da logo no hero.
- Manter todas as outras classes da logo: tamanhos responsivos, `object-contain`, acessibilidade `motion-reduce:animate-none` (opcional, já que sem animação fica redundante, mas pode permanecer sem efeito prático).
- Preservar layout, cores, botões, subtítulo e demais elementos do hero exatamente como estão.

Não será alterado:
- Nenhuma outra animação ou transição do app (modais, menus, accordions, skeletons etc.).
- Nenhuma outra página, componente, cor ou texto.

Validação:
- Verificar visualmente no preview mobile e desktop que a logo não flutua mais.
- Confirmar que o build não quebra.