// Animation des éléments au scroll (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les cartes et les tuiles
  document.querySelectorAll('.card, .tile, .card-image').forEach(el => {
    observer.observe(el);
  });

  // Système de "like" pour les équipes
  document.querySelectorAll('.tile').forEach(tile => {
    const h3 = tile.querySelector('h3');
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.innerHTML = '❤️ 0';
    likeBtn.setAttribute('aria-label', 'Aimer cette équipe');

    likeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const count = parseInt(likeBtn.innerHTML.split(' ')[1]) || 0;
      likeBtn.innerHTML = `❤️ ${count + 1}`;
      likeBtn.classList.add('liked');
      
      // Sauvegarder en localStorage
      const teamName = h3.textContent;
      const likes = JSON.parse(localStorage.getItem('teamLikes') || '{}');
      likes[teamName] = (likes[teamName] || 0) + 1;
      localStorage.setItem('teamLikes', JSON.stringify(likes));
    });

    tile.appendChild(likeBtn);
  });

  // Charger les likes depuis localStorage
  const teamLikes = JSON.parse(localStorage.getItem('teamLikes') || '{}');
  document.querySelectorAll('.tile').forEach(tile => {
    const h3 = tile.querySelector('h3');
    const teamName = h3.textContent;
    const likeBtn = tile.querySelector('.like-btn');
    if (teamLikes[teamName]) {
      likeBtn.innerHTML = `❤️ ${teamLikes[teamName]}`;
    }
  });
});
