(()=>{
  const signUpusername = document.querySelector('.js-signUpUserName');
  const signUpemail = document.querySelector('.js-signUpEmail');
  const signUppassword = document.querySelector('.js-signUpPassword');
  const signUpSubmit = document.querySelector('.js-signUpSubmit')


  const loginUserName = document.querySelector('.js-loginUserName');
  const loginPassword = document.querySelector('.js-loginPassword');
  const loginSubmit = document.querySelector('.js-loginSubmit')



  const POST = (route, data) => {
    return new Promise((resolve, reject)=>{
      const http = new XMLHttpRequest();
      http.open('POST', route);
      http.setRequestHeader('Content-Type', 'application/json');
      http.onreadystatechange = () => {
        if(http.readyState == XMLHttpRequest.DONE && http.status ==200){
          const data = http.responseText;
          resolve(data)
        }
      }
      http.send(JSON.stringify(data))
    })
  }

const signUp = (e) => {
  const username = signUpusername.value;
  const email = signUpemail.value;
  const password = signUppassword.value;

  e.preventDefault();
  POST('/auth/signup',{
    username,
    email,
    password
  }).then((res)=>{
    console.log(res);
  })
}

const login = (e) => {
  e.preventDefault();
  const username = loginUserName.value;
  const password = loginPassword.value;

  POST('/loginAuth/login',{
    username,
    password
  }).then((res)=>{
    console.log(res);
  }).then((res)=>{
    console.log(res);
  })
}


//#########EVENT LISTENERS #####################
signUpSubmit.addEventListener('click', (e)=>{
  signUp(e);
})
loginSubmit.addEventListener('click', (e)=>{
  login(e);
})


})();
