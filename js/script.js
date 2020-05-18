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