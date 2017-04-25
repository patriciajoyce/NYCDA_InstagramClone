const templateName = document.querySelector('body').getAttribute('data-template-name');

         if (templateName === 'home') {
             GET('/api/info')
                 .then((data) => {
                     if (!data.success) {
                         window.location.href = '/login.html';
                     }

                     const title = document.querySelector('.js-title');
                     if (title !== null) {
                         title.innerHTML = data.message;
                     }
                 })
                 .catch((e) => {
                     alert(e);
                 });
         }
         else if (templateName === 'login') {
             // handle stuff with js-login here
             document.querySelector('.js-login').addEventListener('click', (e) => {

                 POST('/auth/login', {
                     email: 'ozz54321@gmail.com',
                     password: 'pass1',
                 });

             });
    }