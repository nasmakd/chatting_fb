const firebaseConfig = {
	apiKey: 'AIzaSyDe0aI4hcSfbd-6r5EKQw_GbnVfgYtacUE',
	authDomain: 'uplifted-earth-283200.firebaseapp.com',
	databaseURL: 'https://uplifted-earth-283200-default-rtdb.firebaseio.com',
	projectId: 'uplifted-earth-283200',
	storageBucket: 'uplifted-earth-283200.appspot.com',
	messagingSenderId: '622478231717',
	appId: '1:622478231717:web:b9bad0774ad3c6581be54c',
	measurementId: 'G-18HLK69HD5',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();

//*************************** 2-0 추가로 작성해야할 스크립트*******************************//
var messagesRef = firebase.database().ref('messages');

const cc = document.getElementById('logout');

function authpop() {
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function (result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			location.href = 'chat.html';
		})
		.catch(function (error) {
			alertmsg = 'errorCode: ' + error.code + '\r\n';
			alertmsg += 'errorMessage: ' + error.message + '\r\n';
			alertmsg += 'email: ' + error.email + '\r\n';
			alertmsg += 'credential: ' + error.credential + '\r\n';
			alert(alertmsg);
			console.log(alertmsg);
		});
}

const appCheck = firebase.appCheck();
appCheck.activate(
	'6Lc75qwjAAAAAJRseVodyNUy15Upegen3EuQFMG2',

	true
);
