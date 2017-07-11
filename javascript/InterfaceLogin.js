//contiene tutte quelle funzioni richiamate dinamicamente nell'index tramite l'echo del php. 

//viene attivata a login completato
function InterfaceStart() {
	//sostituisce Login con Start,e modifica la funzione da richiamare tramite href
	var login=document.getElementById("login");
	login.setAttribute("href","javascript:start()");
	var text=login.firstChild;
	var textnew=document.createTextNode("Start!")
	login.replaceChild(textnew,text);

	//inserisce sopra il div un link utile per il logout
	var logout=document.createElement("a");
	logout.setAttribute("class","smartLink");
	logout.setAttribute("id","logout");
	logout.setAttribute("href","php/logout.php");
	var padre=document.getElementById("game");
	padre.appendChild(logout);
	text=document.createTextNode("Logout");
	logout.appendChild(text);
}

//gestisce l'errore per Utente non trovato
function unfoundedUser() {
	login();
	var padre=document.getElementById("errore");
	var nodes=padre.childNodes;
	if(nodes[0]!=undefined) padre.removeChild(nodes[0]);
	var avviso=document.createTextNode("*User not found");
    padre.appendChild(avviso);
    padre.style.left="38%";
}

//gestisce l'errore per Utente già esistente
function alreadyExistUser() {
	login();
	var padre=document.getElementById("errore");
	var nodes=padre.childNodes;
	if(nodes[0]!=undefined) padre.removeChild(nodes[0]);
	var avviso=document.createTextNode("*User already existent");
    padre.appendChild(avviso);
    padre.style.left="38%";
}

//informa che la registrazione è avvenuta con successo
function RegistrationCompleted() {
	login();
	var padre=document.getElementById("errore");
	var nodes=padre.childNodes;
	if(nodes[0]!=undefined) padre.removeChild(nodes[0]);
	var avviso=document.createTextNode("*Login to play now!");
    padre.appendChild(avviso);
    padre.style.left="38%";
}