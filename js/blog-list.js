fetch('posts/index.json')
  .then(res => res.json())
  .then(posts => {
    const listContainer = document.getElementById('blog-list');

    posts.sort((a, b) => new Date(b.date) - new Date(a.date)); // 新しい順

    posts.forEach(post => {
      const item = document.createElement('div');
      item.innerHTML = `
        <h2><a href="blog.html?post=${post.filename}">${post.title}</a></h2>
        <small>${post.date} | タグ: ${post.tags.join(', ')}</small>
        <p>${post.summary}</p>
        <hr>
      `;
      listContainer.appendChild(item);
    });
  });
