//contiene l'oggetto Arena e le relative funzioni per la sua gestione
function GameArena() {
	this.NumeroNemiciUsciti=0;
	//array utile a gestire il movimento dei nemici nella setInterval Principale. Utilizzato anche per gestire lo scontro con il proiettile.
	this.arrayNemici=[];
	//array utile a gestire il movimento del proiettile nella setInterval Principale.
	this.arrayProiettili=[];
	this.BulletNumber=0;
	this.Life=3;
	this.Point=0;
	this.EnemyLeft=20;
	this.ClearIntervalPrincipale;
	this.ClearIntervalEnemyMovement;
	this.ClearIntervalBullet;
	var begin;
	var game_area;
	var elementgame;
	var newgame_area;
	//funzione per creare nuovo div di gioco
	this.displayArena=function() {
		elementgame=document.getElementById("game");
		game_area=document.getElementById("game-area");
		newgame_area=document.createElement("div");
		newgame_area.setAttribute("id","game-area");
		elementgame.replaceChild(newgame_area,game_area);
		//reset Punteggio
		var p=document.getElementById("score");
   		var text=document.createTextNode(this.Point);
   		p.replaceChild(text,p.firstChild);
   		//reset Vita
   		p=document.getElementById("life");
   		text=document.createTextNode(this.Life);
   		p.replaceChild(text,p.firstChild);
   		//reset Nemici Rimasti
   		p=document.getElementById("enemyleft");
   		var text=document.createTextNode(this.EnemyLeft);
   		p.replaceChild(text,p.firstChild);
	}
	//funzione per mostrare a schermo il messaggio d'inizio
	this.displayBegin=function() {
		begin=document.createElement("p");
		var text=document.createTextNode("Begin!");
		begin.appendChild(text);
		begin.setAttribute("id","begin");
		var z=document.getElementById("game-area");
		z.appendChild(begin);
		//nascondo l'avviso di inizio gioco,per modificarlo e utilizzarlo successivamente. Mostrerà a schermo delle informazioni a partita conclusa.
    	setTimeout(function() {begin.style.visibility="hidden"; begin.removeChild(text);},1000);
   	}
   	//funzione per gestire l'incremento dei punti
   	this.incrementPoint=function () {
   		if(this.Life>0 && this.NumeroNemiciUsciti>=0) {
   			this.Point+=50;
   			var p=document.getElementById("score");
   			var text=document.createTextNode(this.Point);
   			p.replaceChild(text,p.firstChild);

         }
   	}
   	//funzione per gestire il decremento della vita.
   	this.removeLife=function (){
   		if(this.Life>0 && this.EnemyLeft!=0) {
   			this.Life-=1;
   			var p=document.getElementById("life");
   			var text=document.createTextNode(this.Life);
   			p.replaceChild(text,p.firstChild);
   			//ogni vita persa decrementa il punteggio totale
   			this.Point-=50;
   			p=document.getElementById("score");
   			text=document.createTextNode(this.Point);
   			p.replaceChild(text,p.firstChild);
   		}
   		//se le vite rimaste sono pari a zero,blocca la comparsa di nuovi nemici
   		if(this.Life==0) 
   			this.Stop();
	   }
	//funzione per decrementare i nemici rimasti
   	this.decrementEnemyLeft=function () {
   		if(this.Life>0 && this.EnemyLeft!=0) {
   			this.EnemyLeft-=1;
   			var p=document.getElementById("enemyleft");
   			var text=document.createTextNode(this.EnemyLeft);
   			p.replaceChild(text,p.firstChild);
   		}
   		if(this.EnemyLeft==0)
   			this.Stop();
   	}
   	//blocca la comparsa di nuovi nemici,e gestisce la fine del gioco
   	this.Stop=function() {
   		Arena.NumeroNemiciUsciti=20;
   		//clearInterval(this.ClearIntervalPrincipale);
   		begin.style.visibility="visible";
   		if(this.Life==0) {
   			var text=document.createTextNode("YOU LOSE!");
			begin.appendChild(text);
   		}
   		else {
   			var text=document.createTextNode("GOOD JOB!");
			begin.appendChild(text);
   		}
   		delete Arena.Life;
   		var retry=document.createElement("a");
   		newgame_area.appendChild(retry);
   		retry.setAttribute("id","Retry");
   		//chiama la funzione per pulire le setInterval Principale,e gestisce il reiniziare del gioco
	    retry.setAttribute("href","javascript:stopmovement('retry')");
		var text=document.createTextNode("Click to Retry!");
		retry.appendChild(text);
		//modifico l'href di Logout e Back to Menu per salvare il punteggio anche nel caso del loro click
		var x=document.getElementById("BackToMenu");
		x.setAttribute("href","javascript:stopmovement('tomenu')");
		var y=document.getElementById("logout");
		y.setAttribute("href","javascript:stopmovement('logout')");

		}
}

//ferma le setInterval
function stopmovement(action) {
	//clearInterval(Arena.ClearIntervalEnemyMovement);
	clearInterval(Arena.ClearIntervalBullet);
	for(var i=0;i<20;i++) {
		if (Arena.arrayNemici[i].Present="True") Arena.arrayNemici[i].distruction();
	}
	submitPoint(action);
}

//form per salvare il punteggio dell'utente
function submitPoint(action) {
	clearInterval(Arena.ClearIntervalPrinci);
	var f=document.createElement("form");
	f.setAttribute("method","post");
	f.setAttribute("id","form");
	f.setAttribute("action","php/submitPoint.php");
	f.setAttribute("method","Post");
	var inputPoint=document.createElement("input");
	inputPoint.setAttribute("type","text");
	inputPoint.setAttribute("name","point");
	inputPoint.setAttribute("id","score");
	inputPoint.setAttribute("name","score");
	inputPoint.style.visibility="hidden";
	inputPoint.setAttribute("value",Arena.Point);
	//input per il tipo di azione in base al pulsante premuto
	var azione=document.createElement("input");
	azione.setAttribute("type","text");
	azione.setAttribute("name","point");
	azione.setAttribute("id","action");
	azione.setAttribute("name","action");
	azione.style.visibility="hidden";
	azione.setAttribute("value",action);
	f.appendChild(azione);
	f.appendChild(inputPoint);
	document.body.appendChild(f);
	f.submit();
}
	

