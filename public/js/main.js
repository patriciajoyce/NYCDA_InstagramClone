(function() {

    const GET = (url) => {
        return new Promise((resolve, reject) => {
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
    } //GET


    const POST = (url, data) => {
        return new Promise((resolve, reject) => {
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
    } //POST


    const PUT = (url, data) => {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open('PUT', url);
            http.setRequestHeader('Content-Type', 'application/json');
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
    } // PUT


    const DELETE = (url, data) => {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open('DELETE', url);
            http.setRequestHeader('Content-Type', 'application/json');

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
    } // DELETE


    //REGISTER USER
    const signUpusername = document.querySelector('.js-signUpUserName');
    const signUpemail = document.querySelector('.js-signUpEmail');
    const signUppassword = document.querySelector('.js-signUpPassword');
    const signUpSubmit = document.querySelector('.js-signUpSubmit')
    if (signUpSubmit !== null) {
        signUpSubmit.addEventListener('click', (e) => {
            e.preventDefault();

            const username = signUpusername.value;
            const email = signUpemail.value;
            const password = signUppassword.value;

            POST('/auth/signup', {
                username,
                email,
                password,
            }).then((data) => {
                console.log(data)
                if (data.success) {
                    window.location.href = '/profile.html'
                }
            });
        });
    }
    //__END REGISTER USER

    //LOGIN USER
    const loginUserName = document.querySelector('.js-loginUserName');
    const loginPassword = document.querySelector('.js-loginPassword');
    const loginSubmit = document.querySelector('.js-loginSubmit')
    if (loginSubmit !== null) {
        loginSubmit.addEventListener('click', (e) => {

            e.preventDefault();
            const username = loginUserName.value;
            const password = loginPassword.value;

            POST('/loginAuth/login', {
                    username,
                    password
                })
                .then((data) => {
                    console.log('data from auth/login login.js', data)
                    localStorage.setItem('user_id', data.id);
                    localStorage.setItem('username', data.username);
                    if (data.success) {
                        window.location.href = '/home.html'
                    }
                })

        })
    }
    //___END LOGIN


   if (location.pathname === '/home.html') {

   //RENDER HOMEPAGE
     // const homePage = () => {
       const userId = localStorage.getItem('user_id')
       console.log(' this is uid on homepage :',userId);

       GET('/api/' + userId + '/following')
         .then((posts) => {
           console.log('return from get req')
           console.log('this is data :',posts)
           renderFeed(posts);
         });

       function renderFeed(posts) {
         const container = document.querySelector('.js-main');
         container.innerHTML = ""

         for (const post of posts.user) {
           const card = document.createElement('div');
           card.classList.add('ui', 'card')
           card.innerHTML = `
    <div class="content">
       <div class="right floated meta"></div>
       <img class="ui avatar image" src="${post.ProfilePic}"> ${post.Username}
     </div>
     <div class="image">
       <img src="${post.Image}">
     </div>
     <div class="content">
       <div class="description">
       ${post.Chronicle}
       </div>
       </br>
       <span class="right floated">
         <i class="heart red outline icon js-heart-${post.FeedId}"></i>
       </span>
     </div>
           `;

           container.appendChild(card);
         } // for in loop
   }  // render


   //__END HOMEPAGE RENDER
   } // home.html



   if (location.pathname === 'profile.html') {

     localStorage.getItem('user_id')
     console.log(' this is uid on homepage :',userId);

       GET('/api/user/' + userId)
         .then((posts) => {
           console.log('return from get req')
           console.log(posts)
           renderFeed(posts);
         });


       function renderFeed(data) {
         const container = document.querySelector('.js-main');
         container.innerHTML = "";

         for (const post of data.user) {
           const card = document.createElement('div');
           card.classList.add('ui', 'card');
           card.innerHTML = `
    <div class="image">
       <img src="/images/avatar2/large/kristy.png">
       <h2>Username</h2>
       </div>
     <div class="content">
       <a class="header">FirstName LastName</a>
       <div class="meta">
         <span class="date">Joined May 2017</span>
       </div>
       <div class="description">
         Kristy is an art director living in New York.
       </div>
     </div>
   <div class="extra content">
     <a>
       <i class="user icon"></i>
       22 Friends
     </a>
     <button class="ui button">
         Follow
     </button>
   </div>
           `;
         }  // for of



       } // render



   }  // profile.html


    //LOG USER OUT
    const logoutBtn = document.querySelector('.js-logout');
    if (logoutBtn !== null) {
        logoutBtn.addEventListener('click', (e) => {
            console.log('clicked logout!');
            logout();
        })
    }


    const logout = () => {
        GET('/loginAuth/logout')
            .then((data) => {
                console.log('logout data :', data);
                localStorage.setItem('user_id', null);
                window.location.href = '/'
            })
    };
    ///___END LOG OUT
})();
