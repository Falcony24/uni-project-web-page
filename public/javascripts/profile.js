$(document).ready(() => {
    show()

    $('.delete').on('click', function () {
        let title = $(this).closest('tr').find('.titleTd').text();

        if(title){
            let fav = JSON.parse(localStorage.getItem('favorites')) || [];
            let movieIndex = fav.findIndex(movie => movie === title);
            if(movieIndex !== -1){
                fav.splice(movieIndex, 1);
                localStorage.setItem('favorites', JSON.stringify(fav));
                alert('Film został usunięty.');
                show()
            }
        }
    })
});

function show(){
    let main = $('#profileMovies');
    let fav = JSON.parse(localStorage.getItem('favorites')) || [];

    if (fav.length === 0) {
        main.html('<p>Brak zapisanych filmów</p>');
    } else {
        let table = '<table><thead><tr><th colSpan="2">Tytuł</th></tr></thead><tbody>';
        fav.forEach(function (f) {
            table += `<tr class="profileTr">
                        <td class="titleTd"><a href="/content?title=${f}">${f}</a></td>
                        <td><button class="delete">Usuń</button></td>
                      </tr>`;
        });
        table += '</tbody></table>';
        main.html(table);
    }
}