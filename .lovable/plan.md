## Diagnóstico

O chat da Sofia funciona no ambiente de preview, mas pode falhar no app publicado por causa de uma diferença de domínio/origem. O código atual da função `legal-chat` tem uma lista fixa de URLs permitidas. Se o domínio publicado acessado pelo usuário não estiver exatamente nessa lista, a função retorna erro e o front mostra a mensagem genérica de instabilidade.

Também identifiquei um problema separado no console: um loop de atualização em `useLocalProgress.ts`. Ele não parece ser a causa direta do erro do chatbot, mas pode afetar estabilidade/performance da página e vale corrigir junto.

## Plano de correção

1. Ajustar a função do chatbot `legal-chat`
   - Manter o uso da IA nativa do Lovable já configurada.
   - Tornar a validação de origem mais robusta para aceitar corretamente:
     - preview do projeto;
     - domínio publicado `bem-casado-consciente.lovable.app`;
     - domínio atual do projeto em `lovableproject.com`;
     - eventuais variações seguras do próprio projeto.
   - Manter as proteções já adicionadas: CORS, validação de mensagens, limite de uso e tratamento seguro de erros.
   - Melhorar a mensagem técnica retornada ao front quando o backend recusar uma origem, sem expor detalhes sensíveis ao usuário final.

2. Ajustar o front do chatbot apenas no tratamento de erro
   - Preservar toda a interface e personalidade da Sofia.
   - Quando a função retornar erro conhecido, continuar mostrando uma mensagem amigável, mas registrar melhor o erro no console para facilitar diagnóstico futuro.
   - Não alterar sugestões, layout, prompt, nem fluxo conversacional.

3. Corrigir o loop detectado em `useLocalProgress.ts`
   - Evitar que o próprio hook dispare e reaja ao mesmo evento continuamente.
   - Manter o progresso local funcionando normalmente.
   - Essa correção reduz ruído no console e evita instabilidade geral após publicar.

4. Validar depois da implementação
   - Fazer checagem de tipos/build.
   - Testar a função `legal-chat` diretamente com uma mensagem simples como `oi`.
   - Verificar se a resposta da Sofia mantém o formato da primeira interação e o contexto jurídico do app Antes do Sim.

## Resultado esperado

Após a correção, o chatbot deve responder normalmente no app publicado e no preview, sem depender de serviço externo configurado manualmente, mantendo exatamente o comportamento da Sofia já definido.