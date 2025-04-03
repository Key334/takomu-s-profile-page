let allPosts = [];

fetch('posts/index.json')
  .then(res => res.json())
  .then(posts => {
    allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayPosts(allPosts); // 一覧を表示
  })
  .catch(err => {
    document.getElementById('blog-list').innerText = '記事一覧の読み込みに失敗しました。';
    console.error('読み込みエラー:', err);
  });

function displayPosts(posts) {
  const listContainer = document.getElementById('blog-list');
  listContainer.innerHTML = ''; // 一旦クリア

  posts.forEach(post => {
    const tags = post.tags ? post.tags.join(', ') : '';
    const item = document.createElement('div');
    item.classList.add('blog-item');
    item.innerHTML = `
      <h2><a href="blog.html?post=${post.filename}">${post.title}</a></h2>
      <small>${post.date} | タグ: ${tags}</small>
      <p>${post.summary}</p>
      <hr>
    `;
    listContainer.appendChild(item);
  });
}

// 🔍 検索処理
document.getElementById('search-box').addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = allPosts.filter(post => {
    return (
      post.title.toLowerCase().includes(keyword) ||
      post.summary.toLowerCase().includes(keyword) ||
      post.tags.join(',').toLowerCase().includes(keyword) ||
      post.date.includes(keyword) ||
      post.date.slice(5).includes(keyword) // ← "04-01" でもヒット
    );
  });
  displayPosts(filtered);
});