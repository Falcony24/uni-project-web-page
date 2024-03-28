$(document).ready(() => {
    $('#signup').click(() => {
        let username = $('#username').val();
        let email = $('#email').val();
        let pass = $('#password').val();
        let passSec = $('#passwordSec').val();

        let errorUsername = '';
        let errorEmail = '';
        let errorPass = '';
        let errorPassSec = '';
        let flag = true;

        if(username.length == 0){
            errorUsername += 'Pole nie może być puste.'
            flag = false;
        }
        else{
            if(username.length < 6 || username.length > 32){
                errorUsername += '<span>Długość nazwy użytkownika musi być nie mniejsza niż 6 i nie większa niż 32 znaki.</span>';
                flag = false;
            }

            if(username.match(/[!@#$%^&*)(+=._-]/)){
                errorUsername += '<span>Nazwa użytkownika nie może zawierać znaków specjalnych.</span>';
                flag = false;
            }
        }

        if(email.length == 0){
            errorEmail += 'Pole nie może być puste.'
            flag = false;
        }
        else{
            if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                errorEmail += '<span>Niewłaściwy adres email.</span>';
                flag = false;
            }
        }

        if(pass.length == 0){
            errorPass += 'Pole nie może być puste.'
            flag = false;
        }
        else{
            if(pass.length < 6 || pass.length > 32){
                errorPass += '<span>Długość hasła musi być nie mniejsza niż 6 i nie większa niż 32 znaki.</span>';
                flag = false;
            }

            if(!pass.match(/[!@#$%^&*)(+=._-]/)){
                errorPass += '<span>Hasło musi zawierać znak specjalny.</span>';
                flag = false;
            }

            if(!pass.match(/[0-9]/)){
                errorPass += '<span>Hasło musi zawierać cyfrę</span>';
                flag = false;
            }
        }

        if(passSec != pass){
            errorPassSec += 'Podane hasła nie są takie same.';
            flag = false;
        }

        $('#errorUsername').html(errorUsername);
        $('#errorEmail').html(errorEmail);
        $('#errorPass').html(errorPass);
        $('#errorPassSec').html(errorPassSec);

        if(!flag){
            $('form').submit(function(e) {
                e.preventDefault(e);
            })
        }
    })
})

