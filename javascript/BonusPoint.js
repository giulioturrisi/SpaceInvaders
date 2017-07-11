//contiene oggetto Bonus e relative funzioni per la sua gestione
function BonusPoint() {
	this.xpos;
	this.ypos;
	this.padre;
	this.bonus;
	//variabile utile per far comparire o meno un nuovo oggetto se ne è presente un altro sul campo
	this.stillCreate="false";
	var self=this;
	//inserisce il bonus
	this.display=function(Xpos,Ypos) {
		this.stillCreate="true";
		this.padre=document.getElementById("game-area");
		this.bonus=document.createElement("IMG");
		this.bonus.setAttribute("id","bonus");
		this.bonus.setAttribute("src","images/bonus.png");
		this.bonus.setAttribute("alt","bonus");
		this.bonus.style.top=Ypos;
		this.bonus.style.left=parseInt(Xpos)-3+"%";
		this.xpos=this.bonus.style.left;
		this.ypos=this.bonus.style.top;
		this.padre.appendChild(this.bonus);
		//se il bonus non viene raccolto,scompare automaticamente
		setTimeout(function() { if(self.stillCreate!="false") self.distruction()},4000);

	}
	//gestisce l'evento della raccolta del bonus
	this.distruction=function() {
		this.stillCreate="false";
		this.padre.removeChild(this.bonus);
		delete this.xpos;
	}
}