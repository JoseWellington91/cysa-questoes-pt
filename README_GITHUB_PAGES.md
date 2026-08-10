# Guia de Publicação no GitHub Pages

## Visão geral

O projeto está configurado para que o build estático saia na pasta `docs/` na raiz do repositório. Isso permite usar o GitHub Pages no modo **"Deploy from branch"**, sem precisar do GitHub Actions.

## Passo a passo

### 1. Fazer o build

```bash
pnpm install
NODE_ENV=production pnpm run build
```

Os arquivos estáticos serão gerados na pasta `docs/`.

### 2. Enviar para o GitHub

```bash
git add docs/
git commit -m "Build estático para GitHub Pages"
git push origin main
```

> A pasta `docs/` **não** está no `.gitignore`, então ela será enviada para o repositório.

### 3. Habilitar o GitHub Pages

1. Vá em **Settings > Pages** no repositório
2. Em **Source**, selecione **Deploy from branch**
3. Selecione a branch **`main`** e a pasta **`/docs`**
4. Clique em **Save**

### 4. Acessar o site

Após alguns minutos, acesse:

```
https://SEU_USUARIO.github.io/SEU_REPO/
```

## Estrutura do build

```
docs/
  index.html      ← página principal (com caminhos relativos ./assets/...)
  404.html        ← redirect SPA para rotas client-side
  assets/
    index-*.css   ← estilos
    index-*.js    ← aplicação React
```

## Notas

- O `base: "./"` no Vite garante que todos os caminhos de assets sejam relativos, funcionando em qualquer subpath.
- O `404.html` faz o redirect SPA para que o roteamento client-side (wouter) funcione no GitHub Pages.
- Sempre rode `NODE_ENV=production pnpm run build` antes de enviar para garantir que scripts de debug não sejam incluídos.
