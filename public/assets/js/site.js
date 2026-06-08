const postsTarget = document.querySelector('[data-posts]');
const featuredTarget = document.querySelector('[data-featured-posts]');
const searchInput = document.querySelector('[data-search]');
const categorySelect = document.querySelector('[data-category]');

const postUrl = (post) => `/textos/${post.slug}`;

const tagMarkup = (tags = []) => tags.map((tag) => `<span class="tag">${tag}</span>`).join('');

const postCard = (post) => `
  <a class="post-card" href="${postUrl(post)}">
    <div>
      <div class="meta">${post.category} · ${new Date(post.date).getFullYear()}</div>
      <h3>${post.title}</h3>
      <p class="excerpt">${post.excerpt}</p>
    </div>
    <div class="tags">${tagMarkup(post.tags)}</div>
  </a>
`;

const postRow = (post) => `
  <a class="list-row" href="${postUrl(post)}">
    <div>
      <div class="meta">${post.category} · ${new Date(post.date).toLocaleDateString('pt-BR')}</div>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
    </div>
    <span class="tag">Ler texto</span>
  </a>
`;

function renderPosts(posts) {
  if (featuredTarget) {
    featuredTarget.innerHTML = posts.filter((post) => post.featured).slice(0, 3).map(postCard).join('');
  }

  if (!postsTarget) return;

  const query = searchInput?.value.trim().toLowerCase() || '';
  const category = categorySelect?.value || 'all';

  const filtered = posts.filter((post) => {
    const haystack = [post.title, post.excerpt, post.category, ...(post.tags || [])].join(' ').toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === 'all' || post.category === category;
    return matchesQuery && matchesCategory;
  });

  postsTarget.innerHTML = filtered.length
    ? filtered.map(postRow).join('')
    : '<div class="card"><p>Nenhum texto encontrado.</p></div>';
}

fetch('/data/posts.json')
  .then((response) => response.json())
  .then((posts) => {
    if (categorySelect) {
      const categories = [...new Set(posts.map((post) => post.category))].sort();
      categorySelect.innerHTML = '<option value="all">Todas as categorias</option>' + categories.map((category) => `<option value="${category}">${category}</option>`).join('');
    }

    renderPosts(posts);

    searchInput?.addEventListener('input', () => renderPosts(posts));
    categorySelect?.addEventListener('change', () => renderPosts(posts));
  })
  .catch(() => {
    if (postsTarget) postsTarget.innerHTML = '<div class="card"><p>Não foi possível carregar a biblioteca.</p></div>';
  });
