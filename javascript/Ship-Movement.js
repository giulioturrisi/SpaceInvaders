//contiene oggetto navicella e relative funzioni per la sua gestione
function MyShip (Xpos,Ypos) {
	this.xpos=Xpos;
	this.ypos=Ypos;
	this.navicella;
	this.padre;
	var self=this;
	//faccio comparire la navicella all'interno dell'area di gioco
	this.displayShip=function () {
		this.navicella=document.createElement("IMG");
		this.navicella.setAttribute("id","ship");
		this.navicella.setAttribute("src","images/navicella.png");
		this.navicella.setAttribute("alt","SpaceShip");
		this.padre=document.getElementById("game-area");
		this.padre.appendChild(self.navicella);
	}
	//riallinea i cambiamenti fatti sulle variabili dell'oggetto con lo stile dell'immagine
	this.displayMovement=function (dx,dy) {
		this.navicella=document.getElementById("ship");
		this.navicella.style.left= this.xpos;
		this.navicella.style.top= this.ypos;
	}
	//funzione per sparare. Crea oggetti proiettili e li inserisce all'interno di un array,utile per utilizzare una setInterval congiunta
	this.shot=function() {
		LastBullet=new bullet("Ship");
		LastBullet.displayBullet(this.xpos,this.ypos);
		Arena.arrayProiettili.push(LastBullet);
		Arena.BulletNumber++;
	}
	//simula esplosione navicella
	this.distruction=function() {
		setTimeout(function() { self.navicella.style.visibility="hidden"},200);
		setTimeout(function() { self.navicella.style.visibility="visible";},400);
	}
}


//evento tasti
function onkeyPress(e) {
	e = (!e) ? window.event : e; 
	var key =(e.which != null) ? e.which : e.keyCode;
	switch (key){
	case 37: move(-1, 0 , key); break; 
	case 38: move(0, -1 , key); break; 
	case 39: move(1, 0 , key); break; 
	case 40: move(0, 1 , key); break; 
	case 32: Ship.shot(); break;
	}
}


//inizio funzioni movimento navicella
function move(dx,dy,command) { 
	if (Ship.ypos=="91%") Ship.ypos="-4%";
	else if (Ship.ypos=="-5%") 
		Ship.ypos="90%";
	else if (Ship.xpos=="-5%") 
		Ship.xpos="90%";
	else if (Ship.xpos=="91%") 
		Ship.xpos="-4%";
	else{
		Ship.xpos= parseInt(Ship.xpos) + dx + "%";
		Ship.ypos= parseInt(Ship.ypos) + dy + "%"; 
	}
	Ship.displayMovement();
	//inserisce i razzi a seguito del movimento
	RocketDisplay(command);
	//gestisce passaggio navicella sopra il bonus point
	if(parseInt(Ship.xpos)>=parseInt(Bonus.xpos)-2 && parseInt(Ship.xpos)<=parseInt(Bonus.xpos))
		if(parseInt(Ship.ypos)>=parseInt(Bonus.ypos)-5 && parseInt(Ship.ypos)<=parseInt(Bonus.ypos)-1) {
			Arena.incrementPoint();
			Bonus.distruction();
		}
}


//inserimento razzo
function RocketDisplay(command) { 
		var razzo=document.createElement("IMG");
		var game_area=document.getElementById("game-area");
		razzo.style.position="absolute";
		
		//destra
		if(command==39) {

			razzo.setAttribute("src","images/rocket.png");
			razzo.setAttribute("class","rocket");
			razzo.setAttribute("alt","rocket");
			
			razzo.style.top=parseInt(Ship.ypos)-17+"%";
			razzo.style.left=parseInt(Ship.xpos)-29+"%";
		}
		//sinistra
		if(command==37) {
			razzo.setAttribute("src","images/rocket.png");
			razzo.setAttribute("class","rocket");
			razzo.setAttribute("alt","rocket");
			
			razzo.style.top=parseInt(Ship.ypos)-17+"%";
			razzo.style.left=parseInt(Ship.xpos)-21+"%";
		}
		//giu
		if(command==40) {
			razzo.setAttribute("src","images/rocket2.png");
			razzo.setAttribute("class","rocket2");
			razzo.setAttribute("alt","rocket2");

			razzo.style.top=parseInt(Ship.ypos)-7+"%";
			razzo.style.left=parseInt(Ship.xpos)-7+"%";
		}
		//su
		if(command==38) {
			razzo.setAttribute("src","images/rocket2.png");
			razzo.setAttribute("class","rocket2");
			razzo.setAttribute("alt","rocket2");
			razzo.style.top=parseInt(Ship.ypos)-2+"%";
			razzo.style.left=parseInt(Ship.xpos)-7+"%";
			
		}
		game_area.appendChild(razzo);
		//inserita per simulare un animazione
		setTimeout(function() {game_area.removeChild(razzo)},80);
}
