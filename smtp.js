/* SmtpJS.com - v3.0.0 */
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};




let rnd = Math.floor(Math.random() * 10000);
let button1 = document.getElementById("send-code");
button1.addEventListener("click", sendCode);   
let button2 = document.getElementById("check-code");
button2.addEventListener("click", checkCode);
const startingMinutes = 2;
let time = startingMinutes * 60;
const countdownEl=document.getElementById("counter");

// getting mail address and some little change for views

function sendCode(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  if(email=="" || email==null)
  {
    alert("mail adresi boş olamaz");
  }
  else{
  sendEmail(email, rnd);
  let form1=document.getElementById("form1");
  form1.style.display="none";
  let form2=document.getElementById("form2");
  form2.style.display="flex";
  let check_button=document.getElementById("check-code");
  check_button.style.display="block";
  setInterval(startTime ,1000);
  }
}


function startTime(){
  let minutes=Math.floor(time/60);
  let seconds=time % 60;
  minutes= (minutes<10) ? "0" + minutes :minutes; 
  seconds= (seconds<10) ? "0" + seconds :seconds; 
  countdownEl.innerHTML=`${minutes} : ${seconds}`;
  time--;
  time = time < 0 ? 0 : time; 
 if(minutes+seconds==0){
   stopTime();
 }
}


function stopTime(){
  alert("kod zaman aşımına uğradı yeni kod isteyin");
  window.location.reload(true);
}



// checking code true

function checkCode(e) {
  e.preventDefault();
  var ucode= document.getElementById("code").value;
 if(rnd==ucode){
    alert("giriş sekmesine yönlendiriliyorsunuz");
    window.location.replace("http://uevi.firat.edu.tr/");
 }else{
   alert("kod hatalı lütfen tekrar deneyin");
 }
}

//sending mail

function sendEmail(email, code,) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "deneme511deneme@gmail.com",
    Password: "password",
    To: `${email}`,
    From: "deneme511deneme@gmail.com",
    Subject: "Tek Kullanımlık Kod",
    Body: `Oturum açmanız için gereken tek kullanımlık kod ${code}`,
  }).then((message) => alert("Kod gönderildi"));
}
