# Mapa de Carreira — Sarah Lima · Instituto Proa

Site estático que apresenta o mapa de carreira em formato de currículo online.
A página principal é o `index.html`, mas os dados exibidos na tela são carregados a partir do arquivo `assets/data/carreira.json`.

A ideia do projeto é separar estrutura, dados e apresentação:

- `index.html` — estrutura da página (esqueleto HTML com IDs).
- `assets/data/carreira.json` — textos, contatos, habilidades, idiomas, roadmap e link do currículo.
- `assets/js/carreira-json.js` — lê o JSON e monta o conteúdo na página.
- `assets/images/profile.jpg` — foto de perfil.
- `assets/css/` — arquivos de estilo usados pelo layout (bootstrap.css, bootstrap-2.css … bootstrap-6.css). Escolha o tema que preferir alterando a linha `<link id="theme-style">` no `index.html`.

---

## Como atualizar os dados

Para alterar as informações do mapa de carreira, edite o arquivo:

```
assets/data/carreira.json
```

Os principais campos são:

| Campo | Descrição |
|---|---|
| `seo` | Título, descrição, autor e URL canônica da página. |
| `profile` | Nome, resumo, foto, texto alternativo e link do currículo. |
| `contacts` | Lista de contatos (e-mail, LinkedIn, GitHub etc.). |
| `careerSteps` | Etapas do mapa de carreira, com período, descrição, soft skills e roadmap. |
| `skillGroups` | Grupos de habilidades com nível de conhecimento (0-100). |
| `otherSkills` | Outras competências exibidas como badges. |
| `languages` | Idiomas e níveis. |

Depois de editar o JSON, confirme se o arquivo continua válido. Atenção especial para:

- usar aspas duplas em textos e nomes de campos;
- separar itens com vírgula;
- evitar vírgula sobrando no último item de uma lista ou objeto;
- manter os caminhos corretos para arquivos, como imagens e currículo.

---

## Currículo em PDF

Anexe o curriculum vitae em português ao projeto na pasta:

```
assets/docs/curriculo.pdf
```

Depois, confirme que o campo `cvUrl` em `assets/data/carreira.json` está assim:

```json
"cvUrl": "assets/docs/curriculo.pdf"
```

O botão **Baixar o meu CV** aparece automaticamente quando o `cvUrl` está preenchido.
Antes de publicar, teste o botão e confirme que o arquivo abre corretamente.

---

## Como testar localmente

Como o site carrega os dados com `fetch`, abrir o `index.html` diretamente no navegador pode não funcionar em alguns casos. O ideal é testar usando um servidor local.

Se você tiver Python instalado, rode na raiz do repositório:

```bash
python -m http.server 8000
```

Depois acesse:

```
http://localhost:8000
```

Também é possível usar a extensão **Live Server** no VS Code.

Antes de considerar o site pronto, teste:

- [ ] Nome, resumo, habilidades, idiomas e mapa de carreira aparecem corretamente.
- [ ] A foto de perfil carrega.
- [ ] O currículo em PDF abre.
- [ ] Todos os links de contato funcionam.
- [ ] Não há erros no console do navegador.
- [ ] A página funciona bem no celular e no computador.

---

## Como publicar no GitHub Pages

1. Envie o repositório para o GitHub.
2. No GitHub, abra o repositório.
3. Vá em **Settings**.
4. No menu lateral, clique em **Pages**.
5. Em *Build and deployment*, selecione:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` ou `master`
   - **Folder:** `/ (root)`
6. Clique em **Save**.

Após alguns minutos, o GitHub Pages gerará uma URL parecida com:

```
https://seu-usuario.github.io/nome-do-repositorio/
```

Quando a página estiver publicada, atualize o campo `canonicalUrl` em `assets/data/carreira.json`:

```json
"canonicalUrl": "https://seu-usuario.github.io/nome-do-repositorio/"
```

---

## Checklist antes de entregar

- [ ] Atualizar todos os dados em `assets/data/carreira.json`.
- [ ] Substituir a foto em `assets/images/profile.jpg`, se necessário.
- [ ] Anexar o curriculum vitae em `assets/docs/curriculo.pdf`.
- [ ] Atualizar o campo `cvUrl` com o caminho correto do PDF.
- [ ] Testar todos os links.
- [ ] Testar o site localmente com servidor.
- [ ] Publicar no GitHub Pages.
- [ ] Abrir a URL publicada e testar tudo novamente.
- [ ] Atualizar `canonicalUrl` com a URL do GitHub Pages.

---

## Estrutura do projeto

```
mapa-carreira/
├── index.html
├── favicon.ico
├── README.md
└── assets/
    ├── css/
    │   ├── bootstrap.css
    │   ├── bootstrap-2.css
    │   ├── bootstrap-3.css
    │   ├── bootstrap-4.css
    │   ├── bootstrap-5.css
    │   └── bootstrap-6.css   ← tema ativo por padrão
    ├── data/
    │   └── carreira.json     ← EDITE AQUI
    ├── docs/
    │   └── curriculo.pdf     ← adicione seu CV aqui
    ├── images/
    │   └── profile.jpg
    └── js/
        └── carreira-json.js
```
