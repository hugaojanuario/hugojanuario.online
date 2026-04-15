---
description: Como fazer o deploy do Portfolio do Hugo Januário
---

Este guia descreve como hospedar o portfólio de forma gratuita e automatizada.

### 1. GitHub Pages (Recomendado)
A forma mais simples de hospedar, já que o código está no GitHub.

1.  Crie um repositório no GitHub (ex: `hugo-portfolio`).
2.  Faça o push do código:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git remote add origin https://github.com/seu-usuario/hugo-portfolio.git
    git push -u origin main
    ```
3.  No GitHub, vá em **Settings > Pages**.
4.  Em **Build and deployment**, selecione **Deploy from a branch** e escolha a branch `main`.
5.  O site estará disponível em `https://seu-usuario.github.io/hugo-portfolio/`.

### 2. Vercel (Excelente Performance)
Ótimo para quem quer deploy instantâneo a cada push.

1.  Crie uma conta em [vercel.com](https://vercel.com).
2.  Conecte seu repositório do GitHub.
3.  A Vercel detectará automaticamente que é um site estático.
4.  Clique em **Deploy**.

### 3. Atualizando o Currículo
Sempre que atualizar o seu PDF (`Files/Curriculo-Hugo-Januario.pdf`), lembre-se de:
1.  Substituir o arquivo na pasta `Files/`.
2.  O comando `get resume` no terminal do site baixará automaticamente a nova versão.

### 4. Testes Locais
Antes de subir para produção, você pode testar localmente usando:
```bash
npx serve .
```
Ou qualquer servidor estático de sua preferência.
