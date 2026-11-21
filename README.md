# 🌿 RevitaCap Pro - Landing Page de Alta Conversão para Tratamento Capilar

Landing page profissional, responsiva e com cores vivas e dinâmicas, desenvolvida especialmente para produtos e infoprodutos de **tratamento, recuperação e fortalecimento capilar**.

---

## 📌 Localização do Projeto
```
C:\Projetos\CAPILAR\
├── index.html        # Estrutura completa da landing page
├── css/
│   └── styles.css    # Estilizações customizadas, gradientes e animações
├── js/
│   └── main.js       # Interatividade (Slider, Quiz, Modal Checkout, Timer, Toasts)
├── assets/           # Pasta para imagens e mídias locais adicionais
└── README.md         # Documentação e guia de uso
```

---

## 💎 Destaques do Projeto

### 1. Planos de Preço em Destaque
- **Plano Básico: R$ 19,00** (Pagamento Único)
  - Guia Prático Anti-Queda 21 Dias
  - Cronograma Capilar Básico (Hidratação, Nutrição, Reconstrução)
  - 12 Alimentos Fortalecedores dos Folículos
  - Acesso por 6 Meses
  - Garantia de 30 Dias
- **Plano Completo: R$ 37,00** (O Mais Vendido • 81% OFF • Acesso Vitalício)
  - Tudo do Plano Básico
  - Protocolo Noturno de Reativação Folicular
  - Fórmulas de Tônicos Caseiros de Alta Potência
  - Massagem Craniana Japonesa Anti-DHT
  - Bônus 1: Guia Detox Capilar Anticaspa & Antioleosidade
  - Bônus 2: Cardápio Nutricional Turbo Bloqueador de DHT
  - Bônus 3: Grupo VIP no WhatsApp com Dicas Semanais
  - Suporte Prioritário VIP 7 Dias/Semana

### 2. Identidade Visual com Cores Vivas
- **Paleta Bio-Nutri & Vitalidade**:
  - `Esmeralda & Menta`: `#059669`, `#10B981`, `#34D399` (simbolizando saúde, regeneração e natureza)
  - `Coral & Sunset Rose`: `#FF385C`, `#F43F5E`, `#FB7185` (chamada para ação, urgência e estética)
  - `Ciano Elétrico`: `#06B6D4` (toque tecnológico de ciência capilar)
  - `Ouro / Âmbar`: `#F59E0B`, `#FBBF24` (selos de qualidade, estrelas e garantias)
  - `Dark Obsidian Contrast`: `#090D16`, `#111827` (fundo com contraste para valorizar os elementos luminosos)

### 3. Funcionalidades Interativas Implementadas
- **Contador Regressivo de Urgência**: Cronômetro de 14:59 minutos sincronizado com `sessionStorage`.
- **Comparador Antes / Depois Interativo**: Controle deslizante com suporte a mouse e touch em celulares.
- **Teste Capilar Express (Quiz)**: Diagnóstico interativo em 3 etapas que direciona o cliente para o plano ideal.
- **Modal de Checkout Simulado**:
  - Aba PIX com código copia-e-cola e QR code ilustrativo.
  - Aba Cartão de Crédito.
  - Tela de confirmação instantânea.
- **Prova Social Dinâmica (Toasts)**: Notificações flutuantes de compradores recentes para gerar validação social.
- **FAQ Accordion**: 6 dúvidas frequentes explicadas com animações suaves.
- **Barra Fixa Inferior (Sticky Bar)**: Surge ao rolar a página para garantir clique rápido em dispositivos móveis.

---

## 🚀 Como Visualizar a Página

1. Abra o Windows Explorer e acesse a pasta `C:\Projetos\CAPILAR`.
2. Dê um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador padrão (Google Chrome, Edge, Firefox, Brave).
3. Ou, caso utilize o terminal:
```powershell
Start-Process "C:\Projetos\CAPILAR\index.html"
```

---

## 💳 Como Conectar aos Gateways Reais

Para ligar os botões de compra ao seu checkout real (Kiwify, Hotmart, Eduzz, Kirvano, Mercado Pago, Braip, Stripe):
1. Abra `index.html`.
2. Localize os botões com o atributo `data-buy-plan` ou altere a função `openCheckout(planName, price)` no arquivo `js/main.js` para redirecionar diretamente para o seu link de afiliado/produtor:
```javascript
// Exemplo no js/main.js:
function openCheckout(planName, price) {
  if (planName === 'Plano Básico') {
    window.location.href = 'https://kiwify.com.br/link-do-seu-checkout-19';
  } else {
    window.location.href = 'https://kiwify.com.br/link-do-seu-checkout-37';
  }
}
```

---

Desenvolvido para máxima taxa de conversão e responsividade total em celulares, tablets e desktops!
