let posts = []
let fuse

fetch('/search-index/index.json')
  .then(res => res.json())
  .then(data => {
    posts = data
    fuse = new Fuse(posts, {
      keys: ['title', 'content'],
      threshold: 0.35
    })
  })

document.addEventListener('input', e => {
  if (e.target.id !== 'searchBox') return

  const query = e.target.value
  const results = query ? fuse.search(query).map(r => r.item) : []

  const list = results.map(post =>
    `<li><a href="${post.url}">${post.title}</a></li>`
  ).join('')

  document.getElementById('searchResults').innerHTML = list
})
