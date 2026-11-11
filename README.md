# ☕ Espresso — Casa de Café & Forno

> **Landing page artesanal, sensorial e editorial desenvolvida em colaboração com Gemini Flash 3.8 e Argon (Google DeepMind Antigravity).**

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://espresso-artesanal.vercel.app)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%20Flash%203.8-orange?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![Engine Argon](https://img.shields.io/badge/Engine-Argon%20Antigravity-4285F4?style=for-the-badge)](https://deepmind.google)

---

## 🌐 Demonstração Online

- **Domínio Principal:** [https://espresso-artesanal.vercel.app](https://espresso-artesanal.vercel.app)
- **Domínio Alternativo:** [https://espresso-manaus.vercel.app](https://espresso-manaus.vercel.app)
- **Repositório GitHub:** [https://github.com/guimark1412/espresso](https://github.com/guimark1412/espresso)

---

## 📖 Sobre o Projeto

O **Espresso** é um conceito arquitetônico e sensorial de cafeteria e casa de forno instalada em um casarão histórico restaurado em Manaus. 

Esta landing page foi construída do zero, combinando o minimalismo editorial europeu com o calor da cultura do café artesanal brasileiro. Todo o design foi refinado iterativamente para oferecer uma experiência visual refinada no desktop e uma usabilidade tátil perfeita em smartphones (iOS e Android).

---

## ✨ Principais Funcionalidades & Arquitetura UX

### 1. 🎯 Física de Toque Mobile Estabilizada (iPhone / iOS ProMotion)
- **Trava Estrita no Eixo Horizontal (`touch-action: pan-x`):** O carrossel de pilares sensoriais desliza exclusivamente da esquerda para a direita, sem oscilações diagonais ou flutuação 3D ao toque.
- **Scroll Snap Preciso:** Cartões com `scroll-snap-type: x mandatory` centralizam dinamicamente com inércia natural de 120Hz.
- **Isolamento de Gestos:** O motor virtual Lenis detecta via `node.closest` a interação em áreas horizontais e cede o controle imediato ao WebKit nativo.

### 2. 🌊 Liquid Glass & Microinterações
- **Gaveta de Navegação Mobile:** Efeito de vidro escuro profundo (`rgba(20, 13, 10, 0.98)`), desfoque óptico `backdrop-filter: blur(28px)` e transições suaves.
- **Barra Inferior Flutuante Inteligente:** Exibe status operacional e atalho para o cardápio, ocultando-se suavemente ao alcançar o rodapé ou quando o Hero já apresenta botões de ação.
- **3D Tilt & Glare Suave no Desktop:** Inclinação e luz especular calculadas em tempo real sob o cursor em dispositivos com mouse fino.

### 3. 📜 Cardápio da Casa & Split Fotográfico
- Abas comutáveis sem recarregamento (`Assinatura`, `Espressos`, `Coados na Mesa`, `Forno & Confeitaria`, `Ritual & Origens`).
- Transições de fade e física de swipe por gestos móveis.
- Exibição de cafés especiais com notas sensoriais, método de extração e ingredientes frescos da casa.

### 4. 🏛️ Página Editorial "Sobre a Casa" (`sobre.html`)
- Página completa detalhando a restauração do casarão histórico em Manaus, a seleção dos pequenos produtores brasileiros e os métodos de torra da casa.

### 5. ⏰ Status Operacional em Tempo Real
- Cálculo automático baseado no fuso horário local de Manaus (GMT-4), indicando se a casa está **Aberta Agora**, **Fechada** ou o horário da próxima abertura.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível com tags semânticas, atributos WAI-ARIA para abas e gaveta móvel.
- **CSS3 Moderno:**
  - CSS Grid & Flexbox
  - Tipografia Fluida com `clamp()`
  - Variáveis de Cor HSL e Cores Personalizadas (`--bg-surface`, `--accent-caramel`, `--ink-primary`)
  - `backdrop-filter` e efeitos de refração óptica de vidro
- **JavaScript Vanilla:** Zero dependências de frameworks pesados, garantindo carregamento instantâneo e pontuação máxima no Core Web Vitals (LCP < 1.2s).
- **Bibliotecas Leves:**
  - [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Virtual Scroll)
  - [Vanilla-Tilt](https://micku7zu.github.io/vanilla-tilt.js/) (Desktop 3D Micro-interactions)
- **Hospedagem & Deploy:** [Vercel](https://vercel.com) com borda global e compressão Brotli.

---

## 🤖 Créditos de Desenvolvimento

- **Conceito & Pair Programming:** [guimark1412](https://github.com/guimark1412)
- **Modelo de IA:** Gemini Flash 3.8 (Google DeepMind)
- **Ambiente de Agente:** Argon (Antigravity)

---

## 💻 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/guimark1412/espresso.git
   cd espresso
   ```

2. Abra o arquivo `index.html` diretamente no seu navegador, ou utilize qualquer servidor estático local:
   ```bash
   # Com Python
   python -m http.server 8000

   # Com Node (npx)
   npx serve .
   ```

3. Acesse `http://localhost:8000` ou a porta indicada pelo seu terminal.
