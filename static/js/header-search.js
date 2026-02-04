const searchInput = document.getElementById('siteSearch')
const resultsBox = document.getElementById('searchResults')

if (searchInput) {
  fetch('/index.json')
    .then(res => res.json())
    .then(posts => {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase()
        if (!q) {
          resultsBox.innerHTML = ''
          return
        }

        const matches = posts.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.summary?.toLowerCase().includes(q)
        )

        resultsBox.innerHTML = matches
          .slice(0, 6)
          .map(p => `<a href="${p.url}">${p.title}</a>`)
          .join('')
      })
    })
}
