document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.buttonsL').classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const body = document.body;

    
    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); 

            
            body.classList.add("fade-out");

        
            setTimeout(() => {
                
                window.location.href = link.getAttribute("href");
            }, 600); 
        });
    });
});

document.querySelector('.scroll-to-top').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
