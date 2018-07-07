
var auth = firebase.auth();
var db = firebase.database();


var emailRef = document.getElementById("email");
var passRef = document.getElementById("password");


function Pages(val)
{
    location = "categories/" + val + ".html";
}


function Location()
{
    location = "./signup.html"
}

function Location1()
{
    location = "./submit-form.html"
}




function CreateElement(element, idVal){

    var el = document.createElement(element);
    el.setAttribute("class", idVal);
    return el;
}

function GetId(id)
{
    return document.getElementById(id);
    
}

// document.getElementById("signup-btn").addEventListener("click", function(){
//     SignUp();
// })

function SignUp()
{
    auth.createUserWithEmailAndPassword(emailRef.value, passRef.value)
    .then((success) => {
        location = "./signin.html";
    })
    .catch((err) => {
        console.error(err);
    })
}

// document.getElementById("signin-btn").addEventListener("click", function(){
//     SignIn();
// })

function SignIn()
{
    auth.signInWithEmailAndPassword(emailRef.value, passRef.value)
    .then((success) => {
        // console.log('signin successfully', success.user);
        localStorage.setItem('currentUserUid', success.user.uid)
        location = "./index.html";
    })
    .catch((err) => {
        console.error(err);
    })
}



function Database()
{
    var userName = GetId("name");
    var title = GetId("title");
    var cat = GetId("category");
    var desc = GetId("description");
    var phoneNum = GetId("phone-number");
    

    var data = {
        titleData: title.value,
        catData: cat.value,
        descData: desc.value,
        phoneNumData: phoneNum.value

    }

   
    console.log(data); 
    let currentUserUid = firebase.auth().currentUser.uid;

    // storing an object to firebase
   db.ref("Users/user/"+ currentUserUid +"/").push(data);

//   storing an image on the firebase 
   var fileInput = document.getElementById('file');
   var fileName = fileInput.files[0].name;
   var main = firebase.storage();

    main.ref("images/"+ fileName);
    // storage_db.put(fileInput.files[0]);
   
//     console.log(task);
    // fetch();
    

}

//fetching from firebase

function fetch()
{
    let currentUserUid = localStorage.getItem('currentUserUid');
    db.ref("Users/user/"+ currentUserUid +"/").limitToLast(1).on('child_added', (snapshot) =>{

        var dataKey = snapshot.key;
        
        var fetchedData = {
            fetchedTitle : snapshot.val().titleData,
            fetchedCat : snapshot.val().catData,
            fetchedDesc: snapshot.val().descData,
            fetchedPhoneNum : snapshot.val().phoneNumData
        }
        // console.log(fetchedData);            
        Render(fetchedData.fetchedTitle, fetchedData.fetchedDesc);

        // AllFetchedData(fetchedData.fetchedTitle, fetchedData.fetchedCat, fetchedData.fetchedDesc, fetchedData.fetchedPhoneNum);
    })
    
    
}



function Render(title, desc){

    var bodyForTarget = document.getElementById("category").value;
    console.log(bodyForTarget);
    var catVal = GetId(bodyForTarget);
    // console.log(catVal);

    var parentDiv = CreateElement("div", "main-div");
    
    var childDiv = CreateElement("div", "add-view");
    var imgDivOfchildDiv = CreateElement("div", "image-div");
    var titleDivOfchildDiv = CreateElement("div", "title-div")
    var descDivOfchildDiv = CreateElement("div", "desc-div");


    var imgEl = CreateElement("img", "null");
    imgEl.src = "#";
    imgDivOfchildDiv.appendChild(imgEl);
    
    var h3El = CreateElement("h3", "null");
    h3El.innerText = title;
    titleDivOfchildDiv.appendChild(h3El);
    // console.log(titleDivOfchildDiv);

    var pEl = CreateElement("p", "null");
    pEl.innerText = desc;
    descDivOfchildDiv.appendChild(pEl);
    // console.log(descDivOfchildDiv);

    childDiv.appendChild(imgDivOfchildDiv);
    childDiv.appendChild(titleDivOfchildDiv);
    childDiv.appendChild(descDivOfchildDiv);
    parentDiv.appendChild(childDiv);
    
    catVal.appendChild(parentDiv);

    // document.body1.appendChild(parentDiv);
    // console.log(document.body1.appendChild(parentDiv));

    // childDiv.addEventListener('click', AllFetchedData);

    // console.log(parentDiv);
    // document.getElementsByClassName

}

// function AllFetchedData(title, cat, desc, phone){

//     //get element by id vars
//     GetId()

//     //pass them the param data
// }


// function RemoveData()
// {

// }




















// // todo
// //search functionalty applied here 



// function Search() {
//     // var main = GetId("main");
//     var searchVal = GetId("search-input");
//     searchVal.addEventListener("keyup", function(e){
//         const term = e.target.value.toLowerCase();
//         const divs = document.getElementsByClassName("add-view");
//         const h3 = document.getElementsByClassName("title-div");

//         Array.from(divs).forEach(function(div){
//             const title = div.h3.textContent;
//             if(title.toLocaleLowerCase().indexOf(term) != -1)
//             {
//                 divs.style.display = 'block';
//             }
//             else
//             {
//                 divs.style.display = "none";
//             }
//         })
//     })
// }