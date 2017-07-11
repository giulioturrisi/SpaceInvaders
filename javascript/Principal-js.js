//contiene funzione start() per l'inizio del gioco e funzioni per creazione classifica,form login,e informazioni
var Arena;
var Ship;
var Bonus;
//form principale per il login e la registrazione
function login() {
	Arena=new GameArena();
	Arena.displayArena();

	var f=document.createElement("form");
	f.setAttribute("method","post");
	f.setAttribute("id","form");
	f.setAttribute("action","php/login_reg_utente.php");
	f.setAttribute("method","Post");
	//valido gli elementi inseriti tramite il javascript
	f.setAttribute("onsubmit","return validateForm()");

	//Username
	var pUser=document.createElement("p");
	pUser.setAttribute("class","field");
	var text=document.createTextNode("Username: ");
	pUser.appendChild(text);
	f.appendChild(pUser);
	var inputUser=document.createElement("input");
	inputUser.setAttribute("type","text");
	inputUser.setAttribute("name","user_name");
	inputUser.setAttribute("class","credential");
	inputUser.setAttribute("id","username");
	var pinputUser=document.createElement("p");
	pinputUser.appendChild(inputUser);
	f.appendChild(pinputUser);


	//Passowrd
	var pPass=document.createElement("p");
	pPass.setAttribute("class","field");
	text=document.createTextNode("Password: ");
	pPass.appendChild(text);
	f.appendChild(pPass);
	var inputPass=document.createElement("input");
	inputPass.setAttribute("type","text");
	inputPass.setAttribute("name","password");
	inputPass.setAttribute("class","credential");
	inputPass.setAttribute("id","password");
	inputPass.setAttribute("type","password");
	var pinputPass=document.createElement("p");
	pinputPass.appendChild(inputPass);
	f.appendChild(pinputPass);

	//Pulsante Login
	var pLogin=document.createElement("p");
	var submitLogin=document.createElement("input");
	submitLogin.setAttribute("type","submit");
	submitLogin.setAttribute("value","Login");
	submitLogin.setAttribute("name","Login");
	submitLogin.setAttribute("class","credential2");
	submitLogin.setAttribute("id","Login");
	pLogin.appendChild(submitLogin);
	f.appendChild(pLogin);


	//Pulsante Registrazione
	var pReg=document.createElement("p");
	var submitReg=document.createElement("input");
	submitReg.setAttribute("type","submit");
	submitReg.setAttribute("value","Register");
	submitReg.setAttribute("name","Register");
	submitReg.setAttribute("class","credential2");
	submitReg.setAttribute("id","Register");
	pReg.appendChild(submitReg);
	f.appendChild(pReg);
	
	var gameArea=document.getElementById("game-area");
	gameArea.appendChild(f);

	//testo per mostrare a schermo l'errore commesso nell'autenticazione. Viene gestito a parte tramite altre funzioni
	var erroreLogin=document.createElement("p");
	erroreLogin.setAttribute("id","errore");
	gameArea.appendChild(erroreLogin);
	erroreLogin.style.color="red";
	erroreLogin.style.position="absolute";
	erroreLogin.style.top="64%";
	erroreLogin.style.left="22%";
	

}


//inizio gioco
function start() {
	Arena=new GameArena();
	Arena.displayArena();
	Arena.displayBegin();
	Ship=new MyShip("0%","40%");
	Ship.displayShip();
	Bonus=new BonusPoint();
	document.onkeydown=onkeyPress;
	//alloco 20 nemici in un array utilzzato per gestire al meglio tutti gli oggetti creati
	for(var i=0;i<=19;i++) {
		var Nemico=new Enemy(); 
		Arena.arrayNemici.push(Nemico);
	}
	//i proiettili,una volta creati,vengono inseriti nel seguente array
	Arena.arrayProiettili=[];
	var contatore=0;
	Arena.ClearIntervalPrinci=setInterval(function () { 
														//gestisce movimento proiettile
														if(contatore%15==0) {
															for(var i=0;i<Arena.BulletNumber;i++) 
																if(Arena.arrayProiettili[i].presente=="True") {
																	Arena.arrayProiettili[i].displayBulletMovement();
																}
														}
														//gestisce movimento navicelle nemiche
														if(contatore%120==0)
															{
																for(var i=0;i<=19;i++) 
																if(Arena.arrayNemici[i].Present=="True") {
																	Arena.arrayNemici[i].enemymovement();
																}
															}
														//gestische tempo uscita nemici
														if(contatore%2100==0)
															{
																if(Arena.NumeroNemiciUsciti<20) {
																	Arena.arrayNemici[Arena.NumeroNemiciUsciti].displayEnemy();
																	Arena.NumeroNemiciUsciti++;
																}
															}
														contatore=contatore+15;
														},15);
	}




//informazioni riguardanti il gioco
function information() {
	var gameImage=document.getElementById("game-image");
	var nodes=document.getElementById("game-image").childNodes;
	var y;
	//elimina tutti gli elementi presenti nel div game-image(utilizzato per contenere anche la tabella della classifica)
	for(var i=0;i<nodes.length;i++){
		y=nodes[i];
		if(nodes[i].id=="indeximage" || nodes[i].id=="informationList" || nodes[i].id=="tablePoint") {
			gameImage.removeChild(y);
			gameImage.style.borderColor="white";
		 	break;
		} 
	}
	//creazione lista per le istruzioni
	var List=document.createElement("ul");
	List.setAttribute("id","informationList");
	List.style.color="white";
	gameImage.appendChild(List);
	var Element=[];
	var text=["Use the arrow keys to control the spaceship","Press the space bar to shoot","Take the rockets along the map to collect more points","Defeat 20 Enemies!","Remember!Lives lost will reduce your score"];
	var ElementText=[];
	//inserimento del testo all'interno della lista
	for(var i=0;i<=4;i++) {
		Element[i]=document.createElement("li");
		List.appendChild(Element[i]);
		ElementText[i]=document.createTextNode(text[i]);
		Element[i].appendChild(ElementText[i]);
	}
}



//mostra la classifica generale
function rank(tableRank) {
	var x=document.getElementById("game-image");
	var nodes=document.getElementById("game-image").childNodes;
	var y;
	//elimina tutti gli elementi presenti nel div game-image
	for(var i=0;i<nodes.length;i++){
		y=nodes[i];
		if(nodes[i].id=="indeximage" || nodes[i].id=="informationList") {
			x.removeChild(y);
			x.style.borderColor="white";
		 	break;
		} 
	};
	//creazione tabella e inserimento degli elementi al suo interno
	var table=document.createElement("table");
	table.setAttribute("id","tablePoint");
	x.appendChild(table);
	var j=0;
	var d=1;
	if(tableRank!=undefined) {
			for(var i=1;i<9;i++) {
				var row=table.insertRow(i-1);
				var PositionCell=row.insertCell(0);
				var UsernameCell=row.insertCell(1);
				var PointCell=row.insertCell(2);
				if(tableRank[d]!=undefined) {
					var text=document.createTextNode(i);
					PositionCell.appendChild(text);
			
					text=document.createTextNode(tableRank[d]);
					UsernameCell.appendChild(text);
			
					text=document.createTextNode(tableRank[j]);
					PointCell.appendChild(text);
					d=d+2;
					j=j+2;
				}
			}
	}
	var row=table.insertRow(0);
	var PositionCell=row.insertCell(0);
	var UsernameCell=row.insertCell(1);
	var PointCell=row.insertCell(2);
	text=document.createTextNode("Rank");
	PositionCell.appendChild(text);
	text=document.createTextNode("Score");
	PointCell.appendChild(text);
	text=document.createTextNode("Username");
	UsernameCell.appendChild(text);
}



//funzione per validare il login e la registrazione
function validateForm() {
	var padre=document.getElementById("errore");
	//riallineo lo stile del messaggio di errore creato tramite javascript,e elimino gli errori precedenti risultanti dal php
	padre.style.left="22%";
	var nodes=padre.childNodes;
	if(nodes[0]!=undefined) padre.removeChild(nodes[0]);
	
	var x = document.forms["form"]["username"].value;
    var y = document.forms["form"]["password"].value;
    var specialKey=/\W/;
    var whiteSpace=/\s/;
    
    if(whiteSpace.test(x) || whiteSpace.test(y)) {
    	var avviso=document.createTextNode("*Username and Password must not contain blank spaces");
    	padre.appendChild(avviso);
    	return false;
    }
    else if(specialKey.test(x) || specialKey.test(y)) {
    	var avviso=document.createTextNode("*Username must contain only Letter o Number");
    	padre.appendChild(avviso);
        return false;
    }
    else if (x==null || x.length<=4 || y==null || y.length<=4) {
    	var avviso=document.createTextNode("*Username and Password must include at least 5 characters");
    	padre.appendChild(avviso);
        return false;
    }
    else
    	return true;
    
    
}