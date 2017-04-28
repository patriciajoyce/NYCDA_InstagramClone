(function() {
    console.log(login);
    const GET = (url = null) => {
        return new Promise((resolve, reject) => {
            if (url === null) {
                reject('URL not valid');
            }

            const http = new XMLHttpRequest();
            http.open('GET', url);

            http.onload = () => {
                try {
                    const jsonData = JSON.parse(http.responseText);
                    resolve(jsonData);
                } catch (e) {
                    reject(e);
                }
            } // onload

            http.send();
        });
    }


    const POST = (url = null, data = {}) => {
            return new Promise((resolve, reject) => {
                if (url === null) {
                    reject('URL not valid');
                }

                const http = new XMLHttpRequest();
                http.open('POST', url);

                http.setRequestHeader('Content-Type', 'application/json')



                http.onload = () => {
                    try {
                        const jsonData = JSON.parse(http.responseText);
                        resolve(jsonData);
                    } catch (e) {
                        reject(e);
                    }
                } // onload

                http.send(JSON.stringify(data));
            });
        }




       const submitSignUpBtn = document.querySelector('.js-signup');
    if (submitSignUpBtn !== null) {
        submitSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const username = document.querySelector('.js-name').value;
            const email = document.querySelector('.js-email').value;
            const password = document.querySelector('.js-pw').value;
            const age = document.querySelector('.js-age').value;

            POST('/auth/signup', {
                username,
                email,
                password,
            }).then((data) => {
                console.log(data)
                if (data.success) {
                    window.location.href = '/login.html'
                }
            });
        });
    }

    const loginSignUpBtn = document.querySelector('.js-login');
    if (loginSignUpBtn !== null) {
        loginSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const email = document.querySelector('.js-email').value;
            const password = document.querySelector('.js-pw').value;

            POST('/auth/login', {
                username,
                password,
            }).then((data) => {
                console.log(data)
                if (data.success) {
                    window.location.href = '/login.html'
                }
            });
        });
    }

})();
