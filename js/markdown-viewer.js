// URLパラメータから `post` を取得（例：hello）
const urlParams = new URLSearchParams(window.location.search);
const post = urlParams.get("post");

if (post) {
  fetch(`posts/${post}.md`)
    .then(res => {
      if (!res.ok) throw new Error("記事が見つかりません");
      return res.text();
    })
    .then(md => {
      const html = marked.parse(md);
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      document.getElementById("content").innerHTML = `<p style="color:red;">${err.message}</p>`;
      console.error(err);
    });
} else {
  document.getElementById("content").innerHTML = "<p style='color:red;'>記事が指定されていません。</p>";
}

// Front Matter を除去する関数
function stripFrontMatter(markdown) {
  const frontMatterPattern = /^---[\s\S]*?---\s*/;
  return markdown.replace(frontMatterPattern, '');
}
