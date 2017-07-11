//contiene oggetto Nemico e relative funzioni per la sua gestione
function Enemy() {
	this.xpos;
	this.ypos;
	this.ClearIntervalShot;
	this.nemico;
	this.padre;
	//utile per gestire la setInterval. Vengono mossi solo i nemici presenti sul campo
	this.Present="False";
	var self=this;
	//fa comparire i nemici a schermo
	this.displayEnemy=function() {
		this.Present="True";
		this.nemico=document.createElement("IMG");
		this.padre=document.getElementById("game-area");
		this.padre.appendChild(this.nemico);
		this.nemico.setAttribute("class","enemyship");
		this.nemico.setAttribute("src","images/nemico.png");
		this.nemico.setAttribute("alt","nemico");
		this.nemico.style.left="90%";
		//funzione random per gestire la casualità della zona in cui compare nemico
		this.nemico.style.top=Math.floor((Math.random() * 90) + 1)+"%";
		//SetInterval per gestire lo sparo dei nemici
		this.ClearIntervalShot=setInterval(function() {self.shot();},1500);
	}
	//funzione per lo sparo
	this.shot=function() {
		var coordx=parseInt(this.xpos)-7+"%";
		//una volta superato il lato sinistro del gioco,fermo la setInterval
		if(parseInt(coordx)<=-10) 
			clearInterval(this.ClearIntervalShot);
		//creazione oggetto proiettile e suo inserimento nell'array condiviso
		var LastBullet=new bullet("Enemy"); 
		Arena.arrayProiettili.push(LastBullet);
		Arena.arrayProiettili[Arena.BulletNumber].displayBullet(coordx,this.ypos);
		Arena.BulletNumber++;
	}
	//gestisce animazione per la distruzione del nemico
	this.distructionAnimation=function () {
		this.nemico.setAttribute("src","images/Explosion.png");
		setTimeout(function() {self.padre.removeChild(self.nemico);},400);
		//gestisce creazione oggetto bonus e regola la sua comparsa all'interno dell'area di gioco
		if(Arena.EnemyLeft%3==0 && Bonus.stillCreate=="false") {
			Bonus.display(this.xpos,this.ypos);
		}
		this.distruction();
	}
	this.distruction=function() {
		//dopo la distruzione del nemico,viene fermata la setInterval che regola lo sparo e inoltre l'oggetto viene oscurato alla setInterval principale
		clearInterval(self.ClearIntervalShot);
		delete this.xpos;
		this.Present="False";
	}
	//funzione per il movimento del nemico
	this.enemymovement=function() {
		this.nemico.style.left=parseInt(this.nemico.style.left)-1+"%";
		this.xpos=this.nemico.style.left;
		this.ypos=this.nemico.style.top;
		//una volta superato la parte sinistra del gioco,l'elemento viene distrutto e il counter dei nemici rimasti viene decrementato
		if(parseInt(this.xpos)<=-1) {
			this.distruction();
			Arena.decrementEnemyLeft();
			this.padre.removeChild(this.nemico);
		}
		//gestisce scontro tra navicella e nemici
		if(parseInt(this.xpos)>=parseInt(Ship.xpos)+3 && parseInt(this.xpos)<=parseInt(Ship.xpos)+8)
			if(parseInt(this.ypos)>=parseInt(Ship.ypos)-2 && parseInt(this.ypos)<=parseInt(Ship.ypos)+4) {
				this.distructionAnimation();
				Arena.decrementEnemyLeft();
				Arena.removeLife();
				Ship.distruction();
			}
	}
}
