// 表示したい記事のファイル名（クエリパラメータで切り替え可能に）
const urlParams = new URLSearchParams(window.location.search);
const post = urlParams.get("post") || "hello"; // デフォルトは hello.md

fetch(`posts/${post}.md`)
  .then(res => res.text())
  .then(md => {
    const html = marked.parse(md);
    document.getElementById("content").innerHTML = html;
  });
