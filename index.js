var video_out = document.getElementById("vid-box")
var vid_thumb = document.getElementById("vid-thumb")


function login(form) {
	var phone = window.phone = PHONE({
	    number        : form.username.value || "Anonymous", // listen on username line else Anonymous
	    publish_key   : 'pub-c-308d9e42-a87e-4706-badf-ee8d85a32e2c',
	    subscribe_key : 'sub-c-ed7cdff0-ac53-11e6-b697-0619f8945a4f',
	});	
	var ctrl = window.ctrl = CONTROLLER(phone);
	
	console.log("ctrl which should be wrapper library 'controller'", ctrl)

	ctrl.ready(function(){
		form.username.style.background="#55ff5b" // Turn input green
		form.login_submit.hidden="true"	// Hide login button
		ctrl.addLocalStream(vid_thumb)		// Place local stream in div
	})

	ctrl.receive(function(session){
    	session.connected(function(session){ video_out.appendChild(session.video) })
    	session.ended(function(session) { ctrl.getVideoElement(session.number).remove() })
	})
	
	return false
}

function makeCall(form){
	if (!window.phone) alert("Login First!");
	console.log('typeof window.phone; if this is undefined, the function will not execute--', typeof window.phone)
	console.log('window.phone object', window.phone)
	var num = form.number.value;
	if (phone.number()==num) return false; // No calling yourself!
	ctrl.isOnline(num, function(isOn){
		console.log('isOn variable in dialing function. I need this to return true:', isOn)
		console.log('number I am calling:', num)
		if (isOn) ctrl.dial(num);
		else alert("User if Offline");
	});

	return false
}