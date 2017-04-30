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


//RENDER HOMPAGE
  const homePage = () => {
    const userId = localStorage.getItem('user_id')
    console.log(userId);
    GET('/api/' + userId + '/following')
      .then((posts) => {
        renderFeed(posts);
      });

    const renderFeed = (posts) => {



    }


  }

//PROFILE PAGE
  const profile = () => {
    const userId = localStorage.getItem('user_id')
		GET('/api/user/' + userId)
			.then((posts) => {
				renderFeed(posts);
			});
  }

//__END HOMEPAGE RENDER


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
