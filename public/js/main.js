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
        const userId = localStorage.getItem('user_id')
        console.log(' this is uid on homepage :', userId);

        GET('/api/' + userId + '/following')
            .then((posts) => {
                console.log('return from get req')
                console.log('this is data :', posts)
                renderFeed(posts);
            });

        function renderFeed(posts) {
            const container = document.querySelector('.js-main');
            container.innerHTML = ""

            for (const post of posts.user) {
                const card = document.createElement('div');
                card.classList.add('ui', 'centered', 'card')
                card.innerHTML = `
                          <div class="content">
                            <div class="right floated meta">14h</div>
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

                            <i class="comment icon"></i>
                            3 comments
                          </div>
                          <div class="extra content">
                            <div class="ui large transparent left icon input">
                              <i class="heart outline icon"></i>
                              <input type="text" placeholder="Add Comment...">
                            </div>
                          </div>


        `;

                container.appendChild(card);
            } // for in loop
        } // render


        //__END HOMEPAGE RENDER
    } // home.html



 //RENDER PROFILE

if (location.pathname === '/profile.html') {

const userId = localStorage.getItem('user_id')
console.log(' this is uid on profile page :',userId);

   GET('/api/user/' + userId)
    .then((posts) => {
      console.log('return from uid get req');
      console.log('data from get/user/uid: ',posts);
      renderFeed(posts);
    });


  function renderFeed(data) {
    const user = data.user;
    const container = document.querySelector('.js-main');
    container.innerHTML = "";

    for (const post of user) {
      const card = document.createElement('div');
      card.classList.add('ui','centered', 'card');
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
</div>
      `;

      container.appendChild(card);
    }  // for of

  } // render

}  // profile.html



    //LOG USER OUT
    const logoutBtn = document.querySelector('#js-logout');
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
