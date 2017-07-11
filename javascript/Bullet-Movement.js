//contiene oggetto bullet e relative funzioni per la sua gestione
function bullet(Source) {
	this.xpos;
	this.ypos;
	this.proiettile;
	this.padre;
	//utile per gestire la setInterval. Vengono mossi solo i proiettili presenti sul campo
	this.presente="False";
	var self=this;
	//fa comparire i proiettili a schermo. Tramite Xpos e Ypos l'immagine viene allineata con la navicella e con i nemici
	this.displayBullet= function(Xpos,Ypos) {
		this.presente="True";
		this.proiettile=document.createElement("IMG");
		this.proiettile.setAttribute("class","bullet");
		this.proiettile.setAttribute("src","images/bullet.png");
		this.proiettile.setAttribute("alt","bullet");
		this.xpos=parseInt(Xpos)+2+"%";
		this.ypos=parseInt(Ypos)-5+"%";
		this.proiettile.style.top=this.ypos;
		this.proiettile.style.left=this.xpos;
		this.padre=document.getElementById("game-area");
		this.padre.appendChild(this.proiettile);
	}
	this.displayBulletMovement=function() {
		//discrimina se la sorgente del proiettile è il nemico o la navicella
		if(Source=="Enemy") 	
			bulletmovement(this,"left");
		else {
			bulletmovement(this,"right");
		}
	}
	//gestisce rimozione proiettili
	this.distruction=function() { 
		this.padre.removeChild(this.proiettile);
		delete this.xpos;
		this.presente="False";
	}
}


//funzione per il movimento dei proiettili. Direction discrimina chi è a sparare e in che direzione il proiettile deve andare
function bulletmovement(self,direction) {
	//sparo della navicella
	if(direction=="right") {
		self.proiettile.style.left=parseInt(self.proiettile.style.left)+1+"%";
		self.xpos=self.proiettile.style.left;
		//vengono controllati tutti i nemici presenti in campo per vedere quali sono stati colpiti
		for(var i=0;i<Arena.arrayNemici.length;i++) {
			if(parseInt(self.xpos)>=parseInt(Arena.arrayNemici[i].xpos)-8 && parseInt(self.xpos)<=parseInt(Arena.arrayNemici[i].xpos)-5)
				if(parseInt(self.ypos)>=parseInt(Arena.arrayNemici[i].ypos)-10 && parseInt(self.ypos)<=parseInt(Arena.arrayNemici[i].ypos)-3) {
				Arena.arrayNemici[i].distructionAnimation();
				Arena.incrementPoint();
			  	Arena.decrementEnemyLeft();
			  	self.distruction();
			 }
		}
		//se nessun nemico è stato intercettato,l'elemento viene rimosso una volta superata la destra dello schermo
		if(parseInt(self.xpos)>=93) {
			self.distruction();
		}
	}
	//sparo dei nemici
	else {
		self.proiettile.style.left=parseInt(self.proiettile.style.left)-1+"%";
		self.xpos=self.proiettile.style.left;
		if(parseInt(self.xpos)<=parseInt(Ship.xpos)+1 && parseInt(self.xpos)>=parseInt(Ship.xpos)-5) 
		if(parseInt(self.ypos)>=parseInt(Ship.ypos)-8 && parseInt(self.ypos)<=parseInt(Ship.ypos)-4) {
			Ship.distruction();
			Arena.removeLife();
			self.distruction();
		}
		//se la navicella non è stata colpita,l'oggetto proiettile viene rimosso dopo aver superato il lato sinistro dello schermo
		if(parseInt(self.xpos)<=-7) {
		self.distruction();
		}
	}
}