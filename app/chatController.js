var chatArr = [];
var chatLen;
var chatText = "";

function submitChatText() {

  let chatInput = document.getElementById('chatInput').value;

  if (chatInput.trim() != "") {
    chatArr.push({ "content": chatInput, "timestamp": "7:58pm", "direction": "outgoing" });
    console.log("submitted some chat text: " + chatInput);

    updateChat();

    document.getElementById('chatInput').value = '';

    //addIncomingMsgForTesting();

    //let mBody = {
    //            sender: "Stefan",
    //            recipient: "ChatBot",
    //            chatMsg: chatInput
    //            }

    chatResponse = userAction();

  }
}

const userAction = async () => {

  console.log("starting userAction");

  fetch('http://localhost:8082/chat', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  }).then(response => response.json())
    .then(result => {console.log(result)});

  //return response.ok ? myJson : Promise.reject(myJson);
  return null;
}


function updateChat() {
  chatLen = chatArr.length;
  chatText = "<ul class='chat-log-list'>";

  for (i = 0; i < chatLen; i++) {

    if (chatArr[i].direction == "outgoing") {
      chatText += "<li class='outgoing-chat-text'>" + chatArr[i].content + "</li>";
    } else {
      chatText += "<li class='incoming-chat-text'>" + chatArr[i].content + "</li>";
    }
  }

  chatText += "</ul>";
  document.getElementById('mainChatText').innerHTML = chatText;

  updateScroll();
}

function updateScroll() {
  var element = document.getElementById("mainChatText");
  element.scrollTop = element.scrollHeight;
}

function addIncomingMsgForTesting() {
  chatArr.push({ "content": "Hey! This is a dummy message! I hope you are having a great day! :)", "timestamp": "7:58pm", "direction": "incoming" });
  console.log("TESTING: INCOMING MESSAGE INJECTION ENABLED");
  updateChat();
}
