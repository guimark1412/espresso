# ☕ Espresso — Casa de Café & Forno

> **🧪 Projeto de Teste & Benchmark para Agentes de IA Autônomos (Google DeepMind Gemini Flash 3.8 & Argon)**  
> *Landing page artesanal, sensorial e editorial desenvolvida e lapidada 100% via pair programming com IA no ambiente Antigravity.*

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://espresso-artesanal.vercel.app)
[![Powered by Gemini](https://img.shields.io/badge/AI%20Benchmark-Gemini%20Flash%203.8-orange?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![Engine Argon](https://img.shields.io/badge/Agent%20Harness-Argon%20Antigravity-4285F4?style=for-the-badge)](https://deepmind.google)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)]()

---

## 🌐 Demonstração Online

- **Domínio Principal:** [https://espresso-artesanal.vercel.app](https://espresso-artesanal.vercel.app)
- **Domínio Alternativo (Manaus):** [https://espresso-manaus.vercel.app](https://espresso-manaus.vercel.app)
- **Repositório GitHub:** [https://github.com/guimark1412/espresso](https://github.com/guimark1412/espresso)

---

## 🧪 Propósito: Testbed & Benchmark de Agentes de IA

Este projeto foi construído primariamente como um **laboratório de teste e benchmark para agentes de inteligência artificial autônomos**, explorando os limites de criação, refatoração e resolução de problemas em tempo real com o modelo **Gemini Flash 3.8** e a suíte **Argon** (Google DeepMind Antigravity).

O objetivo central foi testar a autonomia e precisão técnica do agente em cenários complexos de engenharia frontend:

1. **🎨 Direção de Arte & Anti-Slop Visual:** Criação de layout editorial exclusivo para café artesanal, evitando clichês de templates e priorizando tipografia suíça com `clamp()` dinâmico e paleta quente de linho (`#FAF7F2`) e café.
2. **📱 Engenharia de Física Tátil (Mobile UX):** Diagnóstico e resolução de conflitos sutis entre rolagem virtual via JavaScript e gestos nativos de 120Hz no iPhone (iOS Safari / WebKit), estabilizando carrosséis com trava estrita de eixo (`touch-action: pan-x`).
3. **⚡ Otimização de Performance & Core Web Vitals:** Prevenção de travamentos e conflitos de aceleração gráfica da GPU ao inverter bruscamente a direção do scroll do mouse (remoção de `scroll-behavior: smooth` redundante e isolamento de camadas de compositing).
4. **🌊 Liquid Glass & Shaders SVG:** Simulação óptica de refração e luz especular em tempo real para botões, pílulas e gaveta de navegação mobile com `backdrop-filter`.
5. **🤝 Pair Programming Iterativo:** Capacidade do agente de processar capturas de tela do usuário, diagnosticar causas-raiz e implementar correções cirúrgicas em minutos.
6. **🚀 Pipeline de Deploy & Versionamento:** Gerenciamento autônomo de Git, criação de repositório via API, versionamento semântico de commits e deploy de borda global na Vercel.

---

## 📖 O Conceito: Espresso Casa de Café & Forno

O **Espresso** representa o conceito de uma casa de café e forno artesanal instalada em um casarão histórico restaurado em Manaus. 

- **Caldas e Doces de Tacho:** Doce de leite e bases preparados na própria cozinha da casa, sem xaropes industriais.
- **Torra Fresca Semanal:** Grãos especiais de pequenos produtores brasileiros torrados em lotes curtos.
- **Salão & Jardim Interno:** Ambiente acolhedor sem necessidade de reservas ("é só chegar e sentar").
- **Carro-chefe:** O autêntico **Café Bombom** servido em taça de vidro com leite condensado de tacho, espresso duplo e cumaru.

---

## ✨ Arquitetura UX & Microinterações

### 1. 🎯 Física de Toque Mobile Estabilizada (iPhone / Android)
- **Trava Estrita no Eixo Horizontal (`touch-action: pan-x; overscroll-behavior-x: contain`):** O carrossel de pilares sensoriais desliza suavemente da esquerda para a direita, sem oscilações verticais ou flutuação indevida.
- **Scroll Snap Preciso:** Cartões com `scroll-snap-type: x mandatory` centralizam dinamicamente com inércia natural.
- **Prevenção Cirúrgica no Lenis:** Detecção via `node.closest()` que cede o controle de toque ao motor nativo do navegador em elementos com rolagem horizontal.

### 2. 🖱️ Rolagem Suave sem Engasgos (Anti-Jitter Scroll Engine)
- **Interpolação Pura (Lerp 0.085):** O Lenis opera com cálculo contínuo baseado em frames (`raf`), permitindo reverter bruscamente a rotação da roda do mouse sem solavancos ou perda de sincronia.
- **Isolamento de Estilos Inline:** Liberação imediata de camadas de GPU (`transform` e `transition`) após animações de entrada (`IntersectionObserver`), garantindo 60/120 FPS contínuos durante scrolls rápidos.

### 3. 🌊 Liquid Glass & Gaveta Mobile
- **Gaveta de Navegação:** Vidro escuro profundo (`rgba(20, 13, 10, 0.98)`), desfoque óptico `backdrop-filter: blur(28px)` e sombras multicamadas.
- **Barra Flutuante Inteligente:** Efeito pílula inferior que monitora a visibilidade do Hero e do Rodapé, recolhendo-se automaticamente para não sobrepor botões interativos.

### 4. 📜 Cardápio com Abas & Acessibilidade WAI-ARIA
- Navegação fluida entre categorias (`Assinatura`, `Espressos`, `Coados na Mesa`, `Forno & Confeitaria`, `Ritual & Origens`) com suporte completo a atalhos de teclado.

### 5. ⏰ Status em Tempo Real
- Verificação dinâmica com base no fuso horário de Manaus (GMT-4), indicando em tempo real se o salão está **Aberto Agora**, **Fechado** ou o horário da próxima abertura.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** `<main>`, `<section>`, `<article>`, `<header>`, `<nav>`, atributos WAI-ARIA.
- **CSS3 Moderno:**
  - CSS Grid & Flexbox
  - Tipografia Fluida com `clamp()`
  - Variáveis de Cor HSL e Custom Properties
  - `backdrop-filter` e efeitos de refração óptica
- **JavaScript Vanilla:** Zero dependências de frameworks volumosos (carregamento ultra-rápido).
- **Bibliotecas Leves:**
  - [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Virtual Scroll com interpolação contínua)
  - [Vanilla-Tilt](https://micku7zu.github.io/vanilla-tilt.js/) (Microinterações 3D sutis no Desktop)
- **Hospedagem & Deploy:** [Vercel](https://vercel.com) com CDN global e compressão Brotli.

---

## 🤖 Créditos do Benchmark de IA

- **Pair Programming & Testes:** [guimark1412](https://github.com/guimark1412)
- **Modelo de IA:** Gemini Flash 3.8 (Google DeepMind)
- **Harness & Ferramentas:** Argon (Antigravity Agent Platform)

---

## 💻 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/guimark1412/espresso.git
   cd espresso
   ```

2. Abra o arquivo `index.html` no seu navegador ou utilize um servidor estático local:
   ```bash
   # Com Python
   python -m http.server 8000

   # Com Node (npx)
   npx serve .
   ```

3. Acesse `http://localhost:8000`.
