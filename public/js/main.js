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
          reject(e)
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
          window.location.href = '/'
        }
      })
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
        renderFeed(posts)
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

    // file upload / firebase code
    const validate = () => {
      throw new Error('This is a required arg');
    }; // validate

    const uploadFiles = (
      fileSelectImg = validate(),
      fileElemSel = validate(),
      onFileChanged = validate(),
      onClicked = validate()
    ) => {
      // select anchor tag and file input
      const fileSelect = document.querySelector(fileSelectImg);
      const fileElem = document.querySelector(fileElemSel);

      if (fileSelect === null || fileElem === null) {
        throw new Error('Required DOM elements not found by querySelector');
      }

      // click handler for fileElem
      fileSelect.addEventListener('click', (e) => {
        e.preventDefault();
        onClicked();
      });

      // change handler for fileSelect
      fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
    } // uploadFiles


    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCYSQN7lMggCWFsiwTW9AGtX79wHiiXi3E",
      authDomain: "insatclone.firebaseapp.com",
      databaseURL: "https://insatclone.firebaseio.com",
      projectId: "insatclone",
      storageBucket: "insatclone.appspot.com",
      messagingSenderId: "841829381507"
    };
    // Name of file storage ref "folder"
    const FILE_STORAGE_REF = 'images';

    // initialize firebase
    firebase.initializeApp(config);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

    let filesToUpload = [];

    uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
      filesToUpload = filesToUpload.concat(Array.from(files));
      // console.log('files to upload :',filesToUpload)
      if (!storageRef) {
        throw new Error('Storage Ref not set!');
      }
      const fileUploads = filesToUpload.map((currFile) => {
        // we store the name of the file as a storage ref
        const fileRef = storageRef.child(currFile.name);
        // we return a promise where we first "put" or upload the file
        // and then once the upload is complete, we return promise with
        // download URL string of the file we uploaded
        return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
      });

      Promise.all(fileUploads).then((items) => {
        // console.log('snapshot.downloadURL :',items);
        localStorage.setItem('img_url', items[0])
        filesToUpload = [];

      });


    }, () => {


    }); // upload files
    const textArea = document.querySelector('.js-textArea');
    const send = document.querySelector('.js-send');
    send.addEventListener('click', (e) => {
      e.preventDefault();
      let fireImg = localStorage.getItem('img_url');

      POST('/api/' + userId + '/activity', {
          image_url: fireImg,
          comments: textArea.value
        })
        .then(() => {
          textArea.value = "";
          GET('/api/user/' + userId)
            .then((post) => {
              renderFeed(post);
            })
        })
        .catch((e) => {
          alert(e)
        })
    });



    const userId = localStorage.getItem('user_id')
    console.log(' this is uid on profile page :', userId);

    GET('/api/user/' + userId)
      .then((posts) => {
        console.log('return from uid get req');
        console.log('data from get/user/uid: ', posts);
        renderFeed(posts)
      });


    function renderFeed(data) {
      // console.log('renderFeed', data,data.update)
      const user = data.user || data.update;
      // console.log(user,"THIS IS DATA USER");
      const container = document.querySelector('.js-main');
      container.innerHTML = "";

      for (const post of user) {
        const card = document.createElement('div');
        card.classList.add('ui', 'centered', 'card', `js-post-${post.feed_id}`);
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
<input type="text" class="js-comment" style='border:none; background-color:white;outline:none;width:100%;height:75px;font-size:14pt;word-break:break-all'value="${post.Chronicle}"></input>
</div>
<br>
<br>
<br>
<div class="extra content">
      <span class="right floated mods">
      	<button class="js-edit-${post.feed_id}" style = 'border:none; background-color:white;outline:none'><i class="edit icon"></i></button>
        <button class="js-delete-${post.feed_id}" style = 'border:none; background-color:white;outline:none'><i class="trash outline icon"></i></button>
      </span>
  </div>
</div>
      `;
        // console.log({post}, typeof post.feed_id,post.Username);
        container.appendChild(card);

        const postId = localStorage.setItem('post_id', post.list);
        const feed_id = post.feed_id
        const edit = document.querySelector(`.js-edit-${post.feed_id}`);
        edit.addEventListener('click', (e) => {
          console.log('foobar', card)
          e.stopPropagation();

          const updateComm = document.querySelector('.js-comment');
          const oldValue = updateComm.value;
          updateComm.setAttribute('disabled', 'disabled');
          PUT('/api/' + userId + '/updatepost/' + feed_id, {
              comments: updateComm.value
            })
            .then((data) => {
              console.log(1, data)
              updateComm.removeAttribute('disabled');
            })
            .catch((e) => {
              updateComm.removeAttribute('disabled');
              updateComm.value = oldValue;
              updateComm.style.border = '1px solid red'
              console.log(e);
            });
        });

        const deletePost = document.querySelector(`.js-delete-${post.feed_id}`)
        deletePost.addEventListener('click', (e) => {
          DELETE('/api/' + userId + '/deletePost/' + feed_id)
            .then((data) => {
              GET('/api/user/' + userId)
                .then((data) => {
                  console.log(1, data)
                  renderFeed(data);
                })
                .catch((err) => {
                  console.log(err);
                })
            })
        })

      } // for of



    } // render
    const deactivate = document.querySelector('.js-deactivate-btn')
    deactivate.addEventListener('click', (e) => {
      DELETE('/api/' + userId + '/deactivate', {
        user_id: userId
      })
    
      .then((data) => {
        localStorage.setItem('user_id', null);
        window.location.href = '/'
      })

    })


  }; // profile.html



  //RENDER Find Some Friends
  if (location.pathname === '/findFriends.html') {
    const userId = localStorage.getItem('user_id')
    //
    // console.log(userId);

    GET('/api/allUsers')
      .then((data) => {
        console.log('HERE ARE MY USERS', data, data.users);
        renderUsers(data)
      })

    function renderUsers(data) {

      const container = document.querySelector('.js-main');
      container.innerHTML = "";
      const users = data.users
      console.log('INRENDERUSERS', 2, users);
      for (const data of users) {
        console.log('IN FOR LOOP', 3, users);
        const card = document.createElement('div');
        card.classList.add('ui', 'centered', 'cards', `js-userId-${data.id}`)
        card.innerHTML = `

    <div class="card">
      <div class="content">
     <img class="ui avatar image" src="${data.profile_pic}">
        <div class="header">
         ${data.username}
        </div>
        <div class="meta">
          ${data.email}
        </div>
        <div class="description">

        </div>
      </div>
      <div class="extra content">
      <div class="ui centered buttons">
        <button class="ui labeled icon blue button js-follow-${data.id}">
    <i class="left thumbs outline up icon"></i>
    Follow
  </button>
  <button class="ui disabled button">
    Or
  </button>
  <button class="ui right labeled icon red button js-unfollow-${data.id}">
    Unfollow
    <i class="right thumbs outline down icon"></i>
  </button>
        </div>
      </div>
    </div>  `;


        container.appendChild(card);

        // const postId = localStorage.setItem('followedId', data.id);
        const followedId = data.id
        console.log(data.id)
        const followBtn = document.querySelector(`.js-follow-${data.id}`)

        console.log(followBtn);
        followBtn.addEventListener('click', (e) => {
          POST('/api/' + userId + '/follows/' + followedId, {
              followedUsers: data
            })
            .then(() => {
              GET('/api/' + userId + '/following')
                .then((data) => {
                  console.log('return from get req')
                  // console.log('this is data :', posts)
                  // renderUsers(data)
                })

            })
        }) //

        const unfollowBtn = document.querySelector(`.js-unfollow-${data.id}`)
        unfollowBtn.addEventListener('click', (e) => {
          DELETE('/api/' + userId + '/unfollows/' + followedId, {
              followedUsers: data,
              soMuchActivities: data.length
            })
            .then(() => {
              GET('/api/' + userId + '/following')
                .then((data) => {
                  console.log('return from get req')
                  // console.log('this is data :', posts)
                  // renderUsers(data)
                })

            })


        })


      } //for loop


    } //render

  } //end Find Page




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
