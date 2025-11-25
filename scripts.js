// scripts.js
(function(){
  var yearEl = document.querySelector('.site-footer .wrap p');
  if(yearEl) yearEl.textContent = '© 2015–2025 Mufeeda Carpets. All Rights Reserved.';

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = this.getAttribute('href');
      if(href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });
})();
