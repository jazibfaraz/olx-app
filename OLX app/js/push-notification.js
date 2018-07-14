
const messaging = firebase.messaging();
messaging.requestPermission()
.then(() =>{
    console.log('request allowed');
    return messaging.getToken();
})
.then((token) =>{
    console.log(token);
})
.catch((err) => {
    alert(err);
})