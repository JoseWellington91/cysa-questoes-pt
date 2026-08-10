# Guia de Publicação no GitHub Pages

## Passo a passo

### 1. Criar o repositório no GitHub

Crie um repositório (pode ser público ou privado) no GitHub. Se quiser que o site fique na URL raiz (`https://seu-usuario.github.io`), nomeie o repositório como `seu-usuario.github.io`. Caso contrário, o site ficará em `https://seu-usuario.github.io/nome-do-repo`.

### 2. Enviar o código

```bash
git init
git add .
git commit -m "CySA+ Questões - deploy no GitHub Pages"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

### 3. Habilitar o GitHub Pages

1. Vá em **Settings** > **Pages** no repositório
2. Em **Source**, selecione **GitHub Actions**
3. O workflow `.github/workflows/deploy.yml` fará o build e deploy automaticamente

### 4. Acessar o site

Após o workflow concluir (verifique na aba **Actions**), acesse:

```
https://SEU_USUARIO.github.io/SEU_REPO/
```

## Build manual (alternativa)

Se preferir fazer o build localmente e enviar os arquivos estáticos:

```bash
pnpm install
pnpm run build
```

Os arquivos estarão em `dist/public/`. Copie o conteúdo dessa pasta para a branch `gh-pages` ou use o método de sua preferência.

## Notas

- O projeto usa `base: "./"` no Vite, então os caminhos dos assets são relativos e funcionam em qualquer subpath.
- O arquivo `404.html` no diretório `public` faz o redirect SPA para que rotas client-side funcionem no GitHub Pages.
- O roteamento usa wouter, que é compatível com GitHub Pages.
