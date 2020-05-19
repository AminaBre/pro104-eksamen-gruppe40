// Navigation Bar
$(document).ready(function() {
    $(".hamburger").click(function(){
        $(".wrapper").toggleClass("collapse");
    });
});

// Pil
$(document).ready(function(){

    $(window).scroll(function() {
        if($(this).scrollTop() > 40) {
            $('#arrowBtn').fadeIn();
        } else {
            $('#arrowBtn').fadeOut();
        }
    });

    $('#arrowBtn').click(function(){
        $('html, body').animate({scrollTop : 0}, 300);
    });
});