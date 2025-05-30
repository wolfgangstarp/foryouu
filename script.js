window.addEventListener('DOMContentLoaded', function() {
  // Section switching with fullscreen, no scroll
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  // Only pink, ungu (purple), and blue
  const themes = ['theme-pink', 'theme-ungu', 'theme-blue'];
  let currentTheme = 0;

  function showSection(sectionId) {
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showSection(btn.getAttribute('data-section'));
      if (window.innerWidth <= 600) navLinks.classList.remove('open');
    });
  });

  // Responsive Hamburger
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  hamburgerBtn?.addEventListener('click', function(e) {
    navLinks.classList.toggle('open');
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 600) {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        e.target !== hamburgerBtn
      ) {
        navLinks.classList.remove('open');
      }
    }
  });

  // Theme switcher
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.className = themes[currentTheme];
  });

  // Set default active
  navBtns[0].classList.add('active');
  sections.forEach((s, i) => i === 0 ? s.classList.add('active') : s.classList.remove('active'));
  document.body.className = themes[0];
  if (window.innerWidth <= 600) navLinks.classList.remove('open');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // GALLERY - ALBUM MODAL
  const albums = [
    {
      title: "Kariem - Catya",
      photos: [
        "./asset/1.jpeg",
        "./asset/2.jpeg",
        "./asset/3.jpeg"
      ]
    },
    {
      title: "Kariem - Catya",
      photos: [
        "./asset/4.jpeg",
        "./asset/5.jpeg",
        "./asset/6.jpeg"
      ]
    },
    {
      title: "Kariem - Catya",
      photos: [
        "./asset/7.jpeg",
        "./asset/8.jpeg",
        "./asset/9.jpeg"
      ]
    },
    {
      title: "Kariem - Catya",
      photos: [
        "./asset/10.jpeg",
        "./asset/11.jpeg",
        "./asset/12.jpeg"
      ]
    },
    {
      title: "Kariem - Catya",
      photos: [
        "./asset/13.jpeg",
        "./asset/14.jpeg",
        "./asset/15.jpeg"
      ]
    },
    {
      title: "Kariem - Catya",
      photos: [
        "./asset/15.jpeg",
        "./asset/16.jpeg",
        "./asset/17.jpeg"
      ]
    }
  ];

  const albumFrames = document.querySelectorAll('.album-frame');
  const albumModal = document.getElementById('albumModal');
  const modalTitle = albumModal.querySelector('.modal-title');
  const modalPhotos = albumModal.querySelector('.modal-photos');
  const closeModalBtn = albumModal.querySelector('.close-modal');

  albumFrames.forEach(frame => {
    frame.addEventListener('click', () => {
      const idx = parseInt(frame.getAttribute('data-album'), 10);
      const album = albums[idx];
      modalTitle.textContent = album.title;
      modalPhotos.innerHTML = "";
      album.photos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = album.title;
        modalPhotos.appendChild(img);
      });
      albumModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    });
  });

  function closeAlbumModal() {
    albumModal.classList.remove('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  closeModalBtn.addEventListener('click', closeAlbumModal);
  albumModal.addEventListener('click', (e) => {
    if (e.target === albumModal) {
      closeAlbumModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && albumModal.classList.contains('active')) {
      closeAlbumModal();
    }
  });

  // MUSIC MODAL & AUDIO PLAYER (playlist modal ONLY for selecting song)
  const musicBtn = document.getElementById('musicToggle');
  const musicModal = document.getElementById('musicModal');
  const closeMusicBtn = document.querySelector('.close-music');
  const audioPlayer = document.getElementById('audioPlayer');
  const musicTracks = document.querySelectorAll('.music-track');

  // Open playlist modal
  musicBtn.onclick = () => {
    musicModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  // Close playlist modal (audioPlayer tetap jalan)
  closeMusicBtn.onclick = () => {
    musicModal.classList.remove('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };
  musicModal.addEventListener('click', (e) => {
    if (e.target === musicModal) {
      musicModal.classList.remove('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && musicModal.classList.contains('active')) {
      musicModal.classList.remove('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  });

  // Pilih lagu: play & highlight tombol
  musicTracks.forEach(btn => {
    btn.onclick = () => {
      const src = btn.getAttribute('data-src');
      if (audioPlayer.src !== location.origin + '/' + src.replace(/^\.?\//, '')) {
        audioPlayer.src = src;
      }
      audioPlayer.play();
      musicTracks.forEach(b => b.classList.remove('playing'));
      btn.classList.add('playing');
    };
  });

  // Love button functionality
  const loveBtn = document.getElementById('loveBtn');
  const loveIcon = document.getElementById('loveIcon');
  const loveRange = document.getElementById('loveRange');

  if (loveBtn && loveRange) {
    loveBtn.addEventListener('click', function () {
      loveBtn.classList.toggle('active');
      loveBtn.classList.add('animated');
      setTimeout(() => loveBtn.classList.remove('animated'), 300);

      let val = parseInt(loveRange.value, 10);
      if (loveBtn.classList.contains('active')) {
        loveRange.value = Math.min(val + 10, 100);
        loveIcon.textContent = "💖";
      } else {
        loveRange.value = Math.max(val - 10, 0);
        loveIcon.textContent = "❤";
      }
    });
  }
});

document.querySelector('.explore-btn').onclick = function() {
  window.open('https://t.me/catyazn', '_blank');
};