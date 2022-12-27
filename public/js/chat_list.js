let myId;
let email;
let userName;
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		myId = user.uid;
		email = user.email;
		userName = user.displayName;
    if(!userName){
      cc.classList.add('hide')
    }else{
      cc.classList.remove('hide')
    }
	} else {
	}
});

function sendMessage() {
	//메세지 보내기
	var message = document.getElementById('message').value;
	if (message == '') {
		alert('메세지를 입력해 주세요');
	} else {
		//데이터 베이스에 저장하기
		messagesRef.push().set({
			sender: myId,
			message: message,
      userName : userName,
      email : email
		});
		document.getElementById('message').value = '';
	}
	return false;
}


const messagesWrap = document.getElementById('messages');
const del_popup = document.getElementById('message_popup');
const dark = document.querySelector('.dark');
const del_yes = document.querySelector('.del_yes');
const del_no = document.querySelector('.del_no');


messagesRef
.on('child_added', function (snapshot) {
	let snapVal = snapshot.val()
	var html = '';

	html += `<li id='message-${snapshot.key}' class='messageList ${snapVal.email == email ? 'right' : ''}'> 
	<p class='user_id'>${snapVal.userName}(${snapVal.email})</p> <span data-id='${snapshot.key}' class='${snapVal.email == email? myId:''}' onclick='deleteMessage(this)'>`

	html += snapVal.message;
	html += '</span></li>';

	messagesWrap.innerHTML += html;

	messagesWrap.scrollTop = messagesWrap.scrollHeight;
});

//메세지 리스트 가져오기(화면상에 호출)


//삭제 기능 함수문("삭제" 버튼 클릭시)
function deleteMessage(self) {
	var messageId = self.getAttribute('data-id');
	var confirm = self.classList.contains(myId);
	if (confirm) {
		dark.classList.add('active');
		del_popup.classList.add('active');
		//database 내부에서 데이터를 삭제
		del_yes.addEventListener('click', () => {
			firebase.database().ref('messages').child(messageId).remove();
			dark.classList.remove('active');
			del_popup.classList.remove('active');
		});
	}
	del_no.addEventListener('click', () => {
		dark.classList.remove('active');
		del_popup.classList.remove('active');
	});
}

// 삭제된 메세지에 대한 표현(삭제된 메세지 입니다.)
messagesRef
	.on('child_removed', function (snapshot) {
		document.getElementById('message-' + snapshot.key).innerHTML = '삭제된 메세지 입니다.';
	});


function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			cc.classList.add('hide');
      location.href = 'index.html';
		})
		.catch((error) => {
			// An error happened.
		});
}


function deleteUser(){
  const userDel = firebase.auth().currentUser;
  firebase
  .auth()
  .currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
  .then((UserCredential) => {
      console.log("re-outh", UserCredential);
      userDel.delete().then(() => {
        // User deleted.
        location.href = 'index.html'
      }).catch((error) => {
        // An error ocurred
        // ...
      });
  });
}

$(".hamBtn").click(function(){
	if($("header").hasClass("on")){
		$("header").removeClass("on");
	}else{
		$("header").addClass("on");
	}
})