
if('ServiceWorker' in navigator)
{
    console.log('passed');
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(() =>{
        console.log('service-worker is installed');
    })
}



var auth = firebase.auth();
var db = firebase.database();
var store = firebase.storage();


var emailRef = document.getElementById("email");
var passRef = document.getElementById("password");


function Pages(val) {
    location = "categories/" + val + ".html";
}


function Location() {
    location = "./signup.html"
}

function Location1() {
    location = "./submit-form.html"
}




function CreateElement(element, idVal) {

    var el = document.createElement(element);
    el.setAttribute("class", idVal);
    return el;
}

function GetId(id) {
    return document.getElementById(id);

}

// document.getElementById("signup-btn").addEventListener("click", function(){
//     SignUp();
// })

function SignUp() {
    auth.createUserWithEmailAndPassword(emailRef.value, passRef.value)
        .then((success) => {
            location = "./signin.html";
        })
        .catch((err) => {
            alert(err);
            console.error(err);
        })
}

// document.getElementById("signin-btn").addEventListener("click", function(){
//     SignIn();
// })

function SignIn() {
    auth.signInWithEmailAndPassword(emailRef.value, passRef.value)
        .then((success) => {
            // console.log('signin successfully', success.user);
            localStorage.setItem('currentUserUid', success.user.uid)
            location = "./index.html";
        })
        .catch((err) => {
            alert(err);
            console.error(err);
        })
}

GetId("logout-btn").addEventListener('click', SignOut);

function SignOut()
{
    auth.signOut().then(() => {
        location = "signin.html";

    }).catch((e) => {
        console.error(e);
    })
}




function Database() {
    // alert("database")
    var userName = GetId("name");
    var title = GetId("title");
    var cat = GetId("category");
    var desc = GetId("description");
    var phoneNum = GetId("phone-number");

    
     

    

    //   storing an image on the firebase 
    var fileInput = document.getElementById('file').files[0];
    var uploadTaskRef = firebase.storage().ref('/images/' + fileInput.name + '/');
    var uploadTask = uploadTaskRef.put(fileInput);
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);

        var data = {
            titleData: title.value,
            catData: cat.value,
            descData: desc.value,
            phoneNumData: phoneNum.value,
            url: downloadURL
    
        }
        
        
    let currentUserUid = firebase.auth().currentUser.uid;
    // storing an object to firebase
    db.ref("Users/user/" + currentUserUid + "/").push(data);
    console.log("Push Data", data);
    });
    

}   



//fetching from firebase

function Fetch() {
    // alert("fetch");
    
    let currentUserUid = localStorage.getItem('currentUserUid');
    db.ref("Users/user/" + currentUserUid + "/").on('child_added', (snapshot) => {

        var dataKey = snapshot.key;

        var fetchedData = {
            fetchedTitle: snapshot.val().titleData,
            fetchedCat: snapshot.val().catData,
            fetchedDesc: snapshot.val().descData,
            fetchedPhoneNum: snapshot.val().phoneNumData,
            fetchedUrl: snapshot.val().url
        }
        // console.log(fetchedData.fetchedCat);            

        // fetching image from firebase
        
            // till here

            // calling function for append
        
        var viewPost = Render(fetchedData.fetchedTitle, fetchedData.fetchedDesc, fetchedData.fetchedUrl);    
        // console.log("Render :",viewPost);
        
        
    
    var category = fetchedData.fetchedCat;
    var body = GetId(category);
    var div1 = body.querySelector("#main-div1");    
        div1.innerHTML += viewPost;
    })
}


function Render(title, desc, url)
{
    // alert("Render");
    return `
    <div class="add-view" id="add-view-div">
          
          <div class="image-div">
            <img id="post-img" src="${url}" alt="offline">
          </div>
          
          <div class="title-div" id="title-div">
            <h3 id="title">${title} </h3>
          </div>
      
          <div class="desc-div">
            <p>${desc}</p>
          </div>
    </div>
    `
}


document.getElementById("search-input-cat").addEventListener('keyup', FilterDiv)

function FilterDiv()
{
    console.log("filter")
    var searchVal = GetId("search-input-cat").value.toUpperCase();
    // console.log(searchVal);

    let mainDiv = GetId('main-div1');
    //let  = document.getElementById("add-view-div");
    let childDiv = mainDiv.querySelectorAll("div.add-view");

    for(var i = 0; i < childDiv.length; i++)
    {
        h3 = childDiv[i].getElementsByTagName("h3")[0];

        if(h3.innerText.toUpperCase().indexOf(searchVal) > -1)
        {
            childDiv[i].style.display = "block";
        }
        else
        {
            childDiv[i].style.display = "none";
        }

    }
}



