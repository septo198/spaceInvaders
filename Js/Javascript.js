var i=0;	    	//indice
var j=0;	    	//indice 2
var i2=0;			//indice 3
var i3=0;			//indice 4
var l=0;			//indice 4
var y=0;			//indice 5
var su=false;		//booleana per cambio immagine alieni
var k=0;			//indice di appoggio
var temp=0;			//tempo nave madre
var madreFinito=true;
var madreColpita=false;
var navi=24;	    //numero navi
var tempo=250;		//tempo alieni
var numBunk=4;		//numero di bunker
var l1=4;			//livello bunker 1
var l2=4;			//livello bunker 2
var l3=4;			//livello bunker 3
var l4=4;			//livello bunker 4
var righe=3;        //numero di righe di alieni
var offset=5;   	//offset alieni orizzontale
var offset2=15;  	//offset alieni verticale 
var offset3=15; 	//offset movimento giocatore
var offset4=10;  	//offset movimento proiettile
var vite=3;			//vite del giocatore
var punti=0;		//punti del giocatore
var sx=false;   	//variabile di stato per controllare il movimento orizzontale	
var alt=440;    	//dimensione controllo di gioco, altezza
var lar=570;    	//dimensione controllo di gioco, larghezza
var altPro=5		//altezza proiettile
var larPro=2    	//larghezza proiettile
var tornato=true;	//variabile di stato per controllare l'arrivo del proiettile degli alieni
var danno=false;	//variabile di stato per controllare se il proiettile dell'alieno ha colpito qualcosa
var haFinito=true;  //variabile di stato per controllare l'arrivo del proiettile del giocatore
var colpito=false;	//variabile di stato per controllare se il proiettile del giocatore ha colpito qualcosa
var finito=false;   //variabile di stato per controllare la fine del gioco
var presi=0;        //variabile per controllare quante navicelle sono state prese
var trovato=false;  //variabile per controllare se siamo arrivati all'ultima navicella
var trovato2=false; //variabile per controllare se la nave aliena è idonea a sparare

function avvio() {
	document.getElementById("lifes").innerHTML=vite;
	document.getElementById("points").innerHTML=punti;
	m=setInterval('sposta()',tempo);
	if (finito) { clearInterval(x);}
}

function naveMadre() {
	madre=document.getElementById('madre').style;
	madre.display='block';
	madre.left=0;
	madre.top=0;
	lancia();
}

function lancia() {
	madre=document.getElementById('madre').style;
	if (((parseInt(madre.left)+parseInt(madre.width)+offset)<=lar) && (madreColpita==false)) {
		madre.left=(parseInt(madre.left))+offset;
		setTimeout("lancia()",20);
	} else {
		madre.display='none';
		madreFinito=true;
		madreColpita=false;
	}
}
 
function sposta() {				
	j=navi;
	if (madreFinito) {
			temp=Math.floor(Math.random() * (25000)) + 5000;
			madreFinito=false;
			setTimeout('naveMadre()',temp);
		}	
	while ((j!=0) && (trovato==false)) {
		if (document.getElementById("n"+j).style.display=='block') {
			if (parseInt(document.getElementById("n"+j).style.top)+offset2>=parseInt(document.getElementById("giocatore").style.top)) {
				finito=true;
				trovato=true;
				location.href='Sconfitta.html';		//sconfitta
			} else {
				j--;
			}
		} else {
			j--;
		}
	}
	if (finito==false) {
		if (tornato==true) {
						spara();	//spari degli alieni
						razzoMusic.play();
		}	
	if (sx==false) {
					for (i2=1; i2<=navi; i2++)
						document.getElementById("n"+i2).style.left=(parseInt(document.getElementById("n"+i2).style.left)+offset)+"px";	
						if (su==false) {
							for (i3=1;i3<=8; i3++)
								document.getElementById("n"+i3).src="Images/Alieno3Su.png";
							for (i3=9;i3<=16; i3++)
								document.getElementById("n"+i3).src="Images/Alieno2Su.png";
							for (i3=17;i3<=24; i3++)
								document.getElementById("n"+i3).src="Images/Alieno1Su.png";
							su=true;
						} else {
							for (i3=1;i3<=8; i3++)
								document.getElementById("n"+i3).src="Images/Alieno3Giu.png";
							for (i3=9;i3<=16; i3++)
								document.getElementById("n"+i3).src="Images/Alieno2Giu.png";
							for (i3=17;i3<=24; i3++)
								document.getElementById("n"+i3).src="Images/Alieno1Giu.png";
							su=false;
						}
					if (parseInt(document.getElementById("n"+navi/righe).style.left)+offset>=lar) {
						 sx=true;
						 for (i2=1; i2<=navi; i2++)
							document.getElementById("n"+i2).style.top=(parseInt(document.getElementById("n"+i2).style.top)+offset2)+"px";
					}
				} else {
					 for (i2=1; i2<=navi; i2++)
						document.getElementById("n"+i2).style.left=(parseInt(document.getElementById("n"+i2).style.left)-offset)+"px";
						if (su==false) {
							for (i3=1;i3<=8; i3++)
								document.getElementById("n"+i3).src="Images/Alieno3Su.png";
							for (i3=9;i3<=16; i3++)
								document.getElementById("n"+i3).src="Images/Alieno2Su.png";
							for (i3=17;i3<=24; i3++)
								document.getElementById("n"+i3).src="Images/Alieno1Su.png";
							su=true;
						} else {
							for (i3=1;i3<=8; i3++)
								document.getElementById("n"+i3).src="Images/Alieno3Giu.png";
							for (i3=9;i3<=16; i3++)
								document.getElementById("n"+i3).src="Images/Alieno2Giu.png";
							for (i3=17;i3<=24; i3++)
								document.getElementById("n"+i3).src="Images/Alieno1Giu.png";
							su=false;
						}
					 if (parseInt(document.getElementById("n1").style.left)-offset<=0) {
						 sx=false;
						 for (i2=1; i2<=navi; i2++)
							document.getElementById("n"+i2).style.top=(parseInt(document.getElementById("n"+i2).style.top)+offset2)+"px";
					 }
					}
	}					
}
 
function gioca(e) {
	obj=document.getElementById("giocatore").style;
	switch (e.keyCode) {
		case 37: if (parseInt(obj.left)-offset3>=0) {
						obj.left=(parseInt(obj.left)-offset3)+'px';
				}
		 break;
		case 39: if (parseInt(obj.left)+offset3<lar) {
						obj.left=(parseInt(obj.left)+offset3)+'px';
				}
		 break;
		case 32: if (haFinito==true) {
					sparoMusic.play();
					missile()
					}
		 break;
	}
} 
 
function missile(){
	obj=document.getElementById("giocatore").style;
	obj2=document.getElementById("missile").style;
	obj2.top=(parseInt(obj.top)-altPro)+'px';
	obj2.left=(parseInt(obj.left)+(parseInt(obj.width)/2))+'px';
	obj2.display='block';
	haFinito=false;
	colpito=false;
	muovi_missile();
} 
 
function muovi_missile(){
	obj2=document.getElementById('missile').style;	
	if (colpito==true) {
		if (parseInt(obj2.top)-offset4>0) {var x=false;}
		else {var x=false;}
	} else {
		if (parseInt(obj2.top)-offset4>0) {var x=true;}
		else {var x=false;}
	}
	if (x==true) {
		if ((parseInt(document.getElementById("madre").style.left)<=parseInt(obj2.left)+parseInt(obj2.width)) && ((parseInt(document.getElementById("madre").style.left)+parseInt(document.getElementById("madre").style.width))>=(parseInt(obj2.left))) && (parseInt(document.getElementById("madre").style.top)+parseInt(document.getElementById("madre").style.height)>=parseInt(obj2.top))) {
			madreColpita=true;	//nave madre colpita
			punti=punti+100;
			document.getElementById("points").innerHTML=punti;
		}
		obj2.top=(parseInt(obj2.top)-offset4)+'px';
		i=navi;
		l=numBunk;
		while ((l!=0) && (colpito==false)) {
			if (document.getElementById("Bunker"+l).style.display=='block') {
				
				if ((parseInt(document.getElementById("Bunker"+l).style.left)<=parseInt(obj2.left)+parseInt(obj2.width)) && ((parseInt(document.getElementById("Bunker"+l).style.left)+parseInt(document.getElementById("Bunker"+l).style.width))>=(parseInt(obj2.left))) && (parseInt(document.getElementById("Bunker"+l).style.top)+parseInt(document.getElementById("Bunker"+l).style.height)>=parseInt(obj2.top))) {	
					switch (l) {
						case 1: colpito=true;
								l1--;
								if (l1==0) {
											document.getElementById("Bunker"+l).style.display='none';
								} else {
											document.getElementById("Bunker"+l).src='Images/Bunker'+l1+'.png';
								}
						break;
						case 2: colpito=true;
								l2--;
								if (l2==0) {
											document.getElementById("Bunker"+l).style.display='none';
								} else {
											document.getElementById("Bunker"+l).src='Images/Bunker'+l2+'.png';
								}
						break;
						case 3: colpito=true;
								l3--;
								if (l3==0) {
											document.getElementById("Bunker"+l).style.display='none';
								} else {
											document.getElementById("Bunker"+l).src='Images/Bunker'+l3+'.png';
								}
						break;
						case 4: colpito=true;
								l4--;
								if (l4==0) {
											document.getElementById("Bunker"+l).style.display='none';
								} else {
											document.getElementById("Bunker"+l).src='Images/Bunker'+l4+'.png';
								}
						break;
					}
				} else {
					l--;
				}
			} else {
				l--;
			}
		}
		while ((i!=0) && (colpito==false)) {
			if (document.getElementById("n"+i).style.display=='block') {
				if ((parseInt(document.getElementById("n"+i).style.left)<=parseInt(obj2.left)+parseInt(obj2.width)) && ((parseInt(document.getElementById("n"+i).style.left)+parseInt(document.getElementById("n"+i).style.width))>=(parseInt(obj2.left))) && (parseInt(document.getElementById("n"+i).style.top)+parseInt(document.getElementById("n"+i).style.height)>parseInt(obj2.top))){ 
					document.getElementById("n"+i).src="Images/Esplosione.png"; 	//Hai colpito l'alieno e la navicella viene distrutta 
					explosion.play();
					setTimeout('esplosione()',80);	
					document.getElementById("n"+i).style.display='none';
					offset=offset+2;
					colpito=true;					
					presi++;
					if (i<=4) {
						punti=punti+10
					} else {
						if (i<=8) {
							punti=punti+20;
						} else {
							punti=punti+30;
						}
					}
					document.getElementById("points").innerHTML=punti;
				} else {
					i--;
				}
			} else {
					i--;
			}
		}
	setTimeout('muovi_missile()',20);
	} else {
		haFinito=true;
		obj2.display='none';
		if (presi==navi) {
			finito=true;
			location.href='Vittoria.html';
		  //vittoria
		}
	}
}

function esplosione() {
	
}

function spara() {
	do {
		k=Math.floor(Math.random() * (navi - 1 + 1)) + 1;
		if (document.getElementById("n"+k).style.display=='block') {
			trovato2=true;
		} else {
			trovato2=false;
		}
		}
	while (trovato2==false);
	obj=document.getElementById("n"+k).style;
	obj2=document.getElementById("sparo").style;
	obj2.top=(parseInt(obj.top)+parseInt(obj.height)+altPro)+'px';
	obj2.left=(parseInt(obj.left)+parseInt(parseInt(obj.width)/2))+'px';
	obj2.display='block';
	tornato=false;
	danno=false;
	muovi_raggio();
}

function muovi_raggio(){
	obj2=document.getElementById("sparo").style;	
	bers=document.getElementById("giocatore").style;
	if (danno==true) {
		if (parseInt(obj2.top)+offset4<alt) {var x=false;}
		else {var x=false;}
	} else {
		if (parseInt(obj2.top)+offset4<alt) {var x=true;}
		else {var x=false;}
	}
	if (x==true) {
		y=numBunk;
		while ((y!=0) && (danno==false)) {
			if (document.getElementById("Bunker"+y).style.display=='block') {	
				if ((parseInt(document.getElementById("Bunker"+y).style.left)<=parseInt(obj2.left)+parseInt(obj2.width)) && ((parseInt(document.getElementById("Bunker"+y).style.left)+parseInt(document.getElementById("Bunker"+y).style.width))>=(parseInt(obj2.left))) && (parseInt(document.getElementById("Bunker"+y).style.top)<=parseInt(obj2.top)+parseInt(obj2.width))) {	
					switch (y) {
						case 1: danno=true;
								l1--;
								if (l1==0) {
											document.getElementById("Bunker"+y).style.display='none';
								} else {
											document.getElementById("Bunker"+y).src='Images/Bunker'+l1+'.png';
								}
						break;
						case 2: danno=true;
								l2--;
								if (l2==0) {
											document.getElementById("Bunker"+y).style.display='none';
								} else {
											document.getElementById("Bunker"+y).src='Images/Bunker'+l2+'.png';
								}
						break;
						case 3: danno=true;
								l3--;
								if (l3==0) {
											document.getElementById("Bunker"+y).style.display='none';
								} else {
											document.getElementById("Bunker"+y).src='Images/Bunker'+l3+'.png';
								}
						break;
						case 4: danno=true;
								l4--;
								if (l4==0) {
											document.getElementById("Bunker"+y).style.display='none';
								} else {
											document.getElementById("Bunker"+y).src='Images/Bunker'+l4+'.png';
								}
						break;
					}
				} else {
					y--;
				}
			} else {
				y--;
			}
		}
		obj2.top=(parseInt(obj2.top)+offset4)+'px';
		if ((parseInt(bers.left)<=parseInt(obj2.left)+parseInt(obj2.width)) && (parseInt(bers.left)+parseInt(bers.width))>=(parseInt(obj2.left)) && (parseInt(bers.top)<parseInt(obj2.top))){ 
				danno=true;		//Hai colpito il giocatore
				vite--;
				document.getElementById("lifes").innerHTML=vite;
		} 
	setTimeout('muovi_raggio()',20);
	} else {
		tornato=true;
		obj2.display='none';
		if (vite==0) {
			finito=true;
			location.href='Sconfitta.html';
		  //sconfitta
		}
	}
}
