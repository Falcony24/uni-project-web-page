// $("#accountBox").on('click', () => {
//     let window = $('#window');
//     window.css('display', 'none');
// });

$(document).ready(() => {
    $('.content').on('click', function() {
        let title = $(this).find('.title').text();
        if(title !== '') window.location = '/content?title=' + title;
    });

    $('#save').on('click', () => {
        let queryString = (new URL(location.href)).searchParams.get('title');
        if (queryString) {
            let fav = JSON.parse(localStorage.getItem('favorites')) || [];

            if (!fav.includes(queryString)) {
                fav.push(queryString);
                localStorage.setItem('favorites', JSON.stringify(fav));
            }
        }
    });
});