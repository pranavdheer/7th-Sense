/* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/


function cambiar_login() {
  var loginUserName = document.querySelectorAll("#loginUserName")[0].value;
  var loginPassword = document.querySelectorAll("#loginPassword")[0].value;
  if (loginPassword.length>0 && loginUserName.length>0){
    var form = document.createElement("form");
    var element1 = document.createElement("input");
    var element2 = document.createElement("input");

    form.method = "POST";
    form.action = "/login";

    element1.value = loginUserName;
    element1.name = "username";
    form.appendChild(element1);

    element2.value = loginPassword;
    element2.name = "password";
    form.appendChild(element2);

    document.body.appendChild(form);

    form.submit();
  }
  else{
    document.querySelectorAll("#signupName")[0].value = "";
    document.querySelectorAll("#signupUsername")[0].value="";
    document.querySelectorAll("#signupPassword")[0].value="";
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

    setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = "1"; }, 400);

    setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.display = "none";
    }, 200);  
  }

  }

function cambiar_sign_up(at) {
  var signupName = document.querySelectorAll("#signupName")[0].value;
  var signupUsername = document.querySelectorAll("#signupUsername")[0].value;
  var signupPassword = document.querySelectorAll("#signupPassword")[0].value;
  if (signupName.length>0 && signupPassword.length>0 && signupUsername.length>0){
    var form = document.createElement("form");
    var element1 = document.createElement("input");
    var element2 = document.createElement("input");


    form.method = "POST";
    form.action = "/signup";

    element1.value = signupUsername;
    element1.name = "username";
    form.appendChild(element1);

    element2.value = signupPassword;
    element2.name = "password";
    form.appendChild(element2);

    document.body.appendChild(form);

    form.submit();
  }
  else{
    document.querySelectorAll("#loginUserName")[0].value = "";
    document.querySelectorAll("#loginPassword")[0].value = "";
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.opacity = "1";
    }, 100);

    setTimeout(function () {
      document.querySelector('.cont_form_login').style.display = "none";
    }, 400); 
  }
   


}    



function ocultar_login_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);  
  
  }
document.querySelectorAll(".oracle")[0].innerHTML = window.location.href.split("/")[window.location.href.split("/").length - 1].toUpperCase();
if (window.location.href.split("/")[window.location.href.split("/").length-1]=="signup"){
      cambiar_sign_up();
    }
    else{
      cambiar_login();
    }
  

  