/* blog/blog.js - simple blog renderer
 - Exposes renderList(container) and renderPost(container, slug)
 - Relies on window.blogPosts from blog/data.js
*/
(function(){
  function q(sel, ctx=document){ return ctx.querySelector(sel); }
  function qa(sel, ctx=document){ return Array.from((ctx||document).querySelectorAll(sel)); }

  function formatDate(dateStr){
    if(!dateStr) return '';
    const d = new Date(dateStr);
    if(isNaN(d)) return dateStr;
    return d.toLocaleDateString('fa-IR');
  }

  // Basic client-side state used for filtering and pagination
  const state = {
    search: '',
    tag: null,
    category: null,
    currentPage: 1,
    perPage: 6
  };

  function getFilteredPosts(){
    let posts = (window.blogPosts || []).slice();
    // apply search
    if(state.search && state.search.trim()){
      const q = state.search.trim().toLowerCase();
      posts = posts.filter(p => (p.title||'').toLowerCase().includes(q) || (p.excerpt||'').toLowerCase().includes(q) || (p.content||'').toLowerCase().includes(q));
    }
    // apply tag
    if(state.tag){ posts = posts.filter(p => Array.isArray(p.tags) && p.tags.indexOf(state.tag) !== -1); }
    // apply category
    if(state.category){ posts = posts.filter(p => Array.isArray(p.categories) && p.categories.indexOf(state.category) !== -1); }
    // sort by date desc
    posts.sort((a,b)=> new Date(b.date)-new Date(a.date));
    return posts;
  }

  function getUniqueTags(){
    const set = new Set();
    (window.blogPosts||[]).forEach(p=>{(p.tags||[]).forEach(t=>{ if(t) set.add(t); });});
    return Array.from(set);
  }

  function getUniqueCategories(){
    const set = new Set();
    (window.blogPosts||[]).forEach(p=>{(p.categories||[]).forEach(c=>{ if(c) set.add(c); });});
    return Array.from(set);
  }

  function renderFiltersUI(filtersContainer){
    filtersContainer.innerHTML = '';
    const cats = getUniqueCategories();
    const tags = getUniqueTags();
    if(cats.length){
      const catLabel = document.createElement('div'); catLabel.style.margin='0 8px 8px 0'; catLabel.style.opacity='0.9'; catLabel.textContent='دسته‌ها:';
      filtersContainer.appendChild(catLabel);
      cats.forEach(c=>{
        const chip = document.createElement('button'); chip.className='chip'; chip.textContent = c;
        if(state.category === c) chip.classList.add('active');
        chip.addEventListener('click', ()=>{ state.category = (state.category === c ? null : c); state.currentPage=1; renderList(document.getElementById('blog-list')); });
        filtersContainer.appendChild(chip);
      });
    }
    if(tags.length){
      const tagLabel = document.createElement('div'); tagLabel.style.margin='0 8px 8px 8px'; tagLabel.style.opacity='0.9'; tagLabel.textContent='برچسب‌ها:';
      filtersContainer.appendChild(tagLabel);
      tags.forEach(t=>{
        const chip = document.createElement('button'); chip.className='chip'; chip.textContent = t;
        if(state.tag === t) chip.classList.add('active');
        chip.addEventListener('click', ()=>{ state.tag = (state.tag === t ? null : t); state.currentPage=1; renderList(document.getElementById('blog-list')); });
        filtersContainer.appendChild(chip);
      });
    }
  }

  function renderPagination(container, totalCount){
    container.innerHTML = '';
    const totalPages = Math.max(1, Math.ceil(totalCount / state.perPage));
    for(let i=1;i<=totalPages;i++){
      const btn = document.createElement('button'); btn.className = 'page-btn'; btn.textContent = i;
      if(i === state.currentPage) btn.classList.add('active');
      btn.addEventListener('click', ()=>{ state.currentPage = i; renderList(document.getElementById('blog-list')); });
      container.appendChild(btn);
    }
  }

  function renderList(container){
    const all = getFilteredPosts();
    const posts = all.slice((state.currentPage-1)*state.perPage, state.currentPage*state.perPage);
    container.innerHTML = '';
    const header = document.createElement('div'); header.className='blog-list-header'; header.innerHTML = `<h1>بلاگ</h1><p>آخرین مطالب و یادداشت‌ها</p>`;
    container.appendChild(header);

    const grid = document.createElement('div'); grid.className = 'blog-grid';
    posts.forEach(p=>{
      const card = document.createElement('article'); card.className = 'blog-card';
      const link = document.createElement('a'); link.href = `post.html?slug=${encodeURIComponent(p.slug)}`; link.className='blog-card-link';
      let tagHtml = '';
      if(Array.isArray(p.tags) && p.tags.length){
        tagHtml = '<div class="tags">'+ (p.tags.map(t=>`<span class="chip">${t}</span>`).join('')) +'</div>';
      }
      const excerpt = (p.excerpt) ? p.excerpt : '';
      // Build the media and body using DOM elements so we can attach onerror handlers for images
      const mediaDiv = document.createElement('div'); mediaDiv.className = 'card-media';
      const img = document.createElement('img');
      img.alt = p.title || '';
      img.src = p.featuredImage || '';
      // fallback to a simple SVG placeholder in case the image fails to load
      img.onerror = function(){ this.onerror = null; this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="320"><rect width="100%" height="100%" fill="#121212"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="20">No image</text></svg>'; };
      mediaDiv.appendChild(img);
      const bodyDiv = document.createElement('div'); bodyDiv.className = 'card-body';
      const h3 = document.createElement('h3'); h3.innerText = p.title || '';
      const metaP = document.createElement('p'); metaP.className = 'meta'; metaP.innerText = `${formatDate(p.date)} • ${excerpt}`;
      bodyDiv.appendChild(h3); bodyDiv.appendChild(metaP);
      if(tagHtml){
        const tagWrapper = document.createElement('div'); tagWrapper.className = 'tags';
        tagWrapper.innerHTML = tagHtml; // tags are safe here; they are generated by our code
        bodyDiv.appendChild(tagWrapper);
      }
      link.appendChild(mediaDiv);
      link.appendChild(bodyDiv);
      card.appendChild(link);
      grid.appendChild(card);
      // Attach click handlers to tag chips inside this card (if any)
      const chipButtons = card.querySelectorAll('.chip');
      chipButtons.forEach(cb=>{
        cb.addEventListener('click', (ev)=>{
          ev.preventDefault(); ev.stopPropagation();
          const t = cb.textContent;
          state.tag = (state.tag === t ? null : t);
          state.currentPage = 1;
          renderList(document.getElementById('blog-list'));
        });
      });
    });
    container.appendChild(grid);
    if(all.length === 0){
      const empty = document.createElement('div'); empty.className='blog-empty'; empty.innerHTML = '<p>هیچ مطلبی برای نمایش پیدا نشد.</p>';
      container.appendChild(empty);
    }

    // Render filters UI and Pagination
    const filtersContainer = document.getElementById('blog-filters');
    if(filtersContainer) renderFiltersUI(filtersContainer);
    const paging = document.getElementById('blog-pagination');
    if(paging) renderPagination(paging, all.length);
    updateQueryParams();
  }

  function updateQueryParams(){
    const params = new URLSearchParams();
    if(state.tag) params.set('tag', state.tag);
    if(state.category) params.set('category', state.category);
    if(state.search) params.set('search', state.search);
    if(state.currentPage && state.currentPage>1) params.set('page', String(state.currentPage));
    const url = window.location.pathname + (params.toString()?('?'+params.toString()):'');
    history.replaceState({}, '', url);
  }

  function findPostBySlug(slug){
    const posts = window.blogPosts || [];
    return posts.find(p=>p.slug === slug || String(p.id)===String(slug));
  }

  function sanitizeHTML(html){
    const template = document.createElement('template');
    template.innerHTML = html;
    // Remove script tags and event-handler attributes
    template.content.querySelectorAll('script').forEach(n=>n.remove());
    template.content.querySelectorAll('*').forEach(el=>{
      for(const attr of Array.from(el.attributes)){
        if(attr.name.startsWith('on')) el.removeAttribute(attr.name);
        if(attr.name === 'href' && String(attr.value).toLowerCase().startsWith('javascript:')) el.removeAttribute('href');
      }
    });
    return template.innerHTML;
  }

  function renderPost(container, slugOrId){
    const post = findPostBySlug(slugOrId);
    if(!post){ container.innerHTML = '<div class="blog-not-found">پستی با این آدرس یافت نشد.</div>'; return; }
    container.innerHTML = '';
    const header = document.createElement('div'); header.className='blog-post-header';
    header.innerHTML = `<h1>${post.title}</h1>${post.subtitle?`<div class="subtitle">${post.subtitle}</div>`:''}<div class="meta">${formatDate(post.date)}</div>`;
    container.appendChild(header);
    // categories & tags display
    if((post.categories && post.categories.length) || (post.tags && post.tags.length)){
      const metaWrap = document.createElement('div'); metaWrap.className = 'post-meta-chips';
      (post.categories||[]).forEach(c=>{
        const cbtn = document.createElement('span'); cbtn.className='chip'; cbtn.textContent=c; cbtn.addEventListener('click', ()=>{ window.location.href = `index.html?category=${encodeURIComponent(c)}`; }); metaWrap.appendChild(cbtn);
      });
      (post.tags||[]).forEach(t=>{
        const tbtn = document.createElement('span'); tbtn.className='chip'; tbtn.textContent=t; tbtn.addEventListener('click', ()=>{ window.location.href = `index.html?tag=${encodeURIComponent(t)}`; }); metaWrap.appendChild(tbtn);
      });
      container.appendChild(metaWrap);
    }
    if(post.featuredImage){
      const fm = document.createElement('div'); fm.className = 'blog-featured';
      const img = document.createElement('img'); img.src = post.featuredImage; img.alt = post.title || '';
      img.onerror = function(){ this.onerror = null; this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="360"><rect width="100%" height="100%" fill="#121212"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="24">No image</text></svg>'; };
      fm.appendChild(img);
      container.appendChild(fm);
    }
    const content = document.createElement('div'); content.className='blog-post-content';
    // WARNING: using innerHTML — assume content already sanitized by the author (Word HTML is messy)
    // sanitize the HTML content before inserting
    content.innerHTML = sanitizeHTML(post.content || '');
    // Add event delegation for audio or video in content if needed (click to play)
    container.appendChild(content);

    // Back link intentionally removed to avoid duplicate navigation controls - navigation via site header
  }

  // expose methods
  // Expose methods and small helpers to modify state externally
  window.Blog = { renderList, renderPost, findPostBySlug, state, getFilteredPosts };
})();
