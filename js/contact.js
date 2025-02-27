window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;

    var parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach(function (layer, index) {
        var speed = (index + 1) * 0.5; 
        layer.style.transform = 'translateY(' + (scrollPosition * speed) + 'px)';
    });
});
