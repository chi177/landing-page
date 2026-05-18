// Shared include loader and page behavior helpers

async function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  for (const element of includes) {
    const url = element.getAttribute('data-include');
    try {
      const response = await fetch(url);
      if (response.ok) {
        element.innerHTML = await response.text();
      } else {
        console.warn('Include not found:', url);
      }
    } catch (error) {
      console.warn('Failed to load include:', url, error);
    }
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('nav .nav-link');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadIncludes();
  setActiveNavLink();
});

document.addEventListener('click', function (e) {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href === '#' || href === '#!') return;
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
