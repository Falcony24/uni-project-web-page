const express = require('express');
const router = express.Router();
const joi = require('joi');
const fs = require('fs');

const requireAuth = (req, res, next) => {
    if(req.session.userID) {
        next();
    }
    else {
        res.redirect('/');
    }
}

router.get('/',  (req, res) => {
    res.render('signup', {pageTitle: 'Rejestracja'})
})

router.post('/', async (req, res) => {
    let schema = joi.object({
        sUsername: joi.string()
            .alphanum()
            .min(6)
            .max(32)
            .required(),

        // sEmail: joi.string()
        //     .email()
        //     .required(),

        sPassword: joi.string()
            .pattern(RegExp('^[a-zA-Z0-9!@#$%^&*?)(+=._-]{6,32}$'))
    });

    let username = req.body.usernameUp;
    // let email = req.body.email;
    let pass = req.body.passwordUp;

    if(username === '' || pass === '') return

    try {
        let value = schema.validateAsync({ sUsername: username, sPassword: pass})
        let newId = await getLastUserId('database/users.json') + 1
        let newUser = {
            id: newId,
            username: username,
            password: pass
        }

        addUser('database/users.json', newUser)
        req.session.userID = newId;
        res.redirect('/profile');
    }
    catch (err){}
})

function getLastUserId(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject('Błąd odczytu pliku: ' + err);
            }

            try {
                const users = JSON.parse(data);

                if (users.length === 0) {
                    return resolve(0); // Jeśli brak użytkowników, zwróć 0
                }

                resolve(users[users.length - 1].id);
            } catch (err) {
                reject('Błąd parsowania JSON: ' + err);
            }
        });
    });
}

function addUser(filePath, newUser) {
    // Odczytaj plik JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Błąd odczytu pliku:', err);
            return;
        }

        try {
            console.log(newUser);
            // Parsowanie zawartości pliku JSON
            const users = JSON.parse(data);

            // Dodanie nowego użytkownika do tablicy
            users.push(newUser);

            // Konwersja tablicy z powrotem do formatu JSON
            const updatedData = JSON.stringify(users, null, 2);

            // Zapisanie zaktualizowanej zawartości do pliku
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error('Błąd zapisu pliku:', err);
                    return;
                }

                console.log('Nowy użytkownik został dodany.');
            });
        } catch (err) {
            console.error('Błąd parsowania JSON:', err);
        }
    });
}

module.exports = router;