## Plano de ajuste

Vou fazer apenas o ajuste pontual no chatbot da Sofia para que a primeira resposta deixe de aparecer como um único bloco e passe a ser exibida em três blocos/balões separados.

## O que será alterado

1. Ajustar o contrato de resposta do chat
   - Permitir que a função `legal-chat` retorne, na primeira interação, a resposta dividida em partes.
   - Manter a compatibilidade com respostas normais em mensagens seguintes.

2. Separar a primeira resposta em 3 blocos
   - Bloco 1:
     ```text
     Oi, eu sou a Sofia! Antes de começar, dois avisos rápidos:
     ```
   - Bloco 2:
     ```text
     ⚠️ Minhas respostas são educativas e não substituem a orientação de um advogado.

     🔒 Seus dados são tratados com sigilo e em conformidade com a LGPD.
     ```
   - Bloco 3:
     ```text
     [Pergunta específica da Sofia relacionada ao que a pessoa enviou]
     ```

3. Ajustar a interface do chat
   - Quando a resposta vier dividida, renderizar cada parte como uma mensagem/balão separado da Sofia.
   - Preservar o comportamento atual das sugestões, campo de texto, loading e mensagens seguintes.

4. Preservar tudo que já existe
   - Nome Sofia.
   - Tom acolhedor e educativo.
   - Uso da IA nativa do Lovable.
   - Foco em aspectos jurídicos do casamento no Brasil.
   - Recusa gentil para temas fora do escopo.
   - Sugestão de módulos, simulador, checklist e glossário quando relevante.
   - Nenhuma alteração em outras partes do app.

## Detalhes técnicos

- Em `supabase/functions/legal-chat/index.ts`, ajustarei o retorno para incluir uma lista de partes da resposta quando for a primeira mensagem do usuário.
- Em `src/components/app/FloatingAiChat.tsx`, ajustarei a leitura do retorno para aceitar `answerParts` e inserir cada parte como um balão separado.
- Caso a função retorne apenas `answer`, o frontend continuará funcionando como hoje.