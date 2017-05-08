//<![CDATA[
/*
{"poster_path":"\/tWqifoYuwLETmmasnGHO7xBjEtt.jpg"
"adult":false
"overview":"A live-action adaptation of Disney's version of the classic 'Beauty and the Beast' tale of a cursed prince and a beautiful young woman who helps him break the spell."
"release_date":"2017-03-16"
"genre_ids":[14,10749]
"id":321612
"original_title":"Beauty and the Beast"
"original_language":"en"
"title":"Beauty and the Beast"        "backdrop_path":"\/6aUWe0GSl69wMTSWWexsorMIvwU.jpg"
"popularity":129.168016
"vote_count":2121
"video":false
"vote_average":6.8
*/
        
var config;
var indice = 0;
var peliculas;
var xhttp;


function resizedw() {
	var Ancho = window.innerWidth;
	var Alto = window.innerHeight;	
	
	document.getElementById("contenedor").style.Width = Ancho + "px";	
	document.getElementById("coverpic").style.maxWidth = Ancho + "px";	
}

function getConfig() {
	xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://api.themoviedb.org/3/configuration?api_key=23cf888d2154b7ea3b81b691334ebcde", false);
	xhttp.send();
	if (xhttp.readyState === 4 && xhttp.status === 200) {
		try {
			config = JSON.parse(xhttp.responseText);
		} catch (e) {
			alert("error config: " + e.message);
		}
	} else {
		alert(xhttp.statusText);
	}
}

function estrella(numero){
	estrellas="";
	for(n=0; n<numero/2; n++){
		estrellas += "<i class='fa fa-star'></i>";
	}
	return estrellas;
}

function actualizar() {	
	var text;
	document.getElementById("titulo").innerHTML = "<h1>"+peliculas['results'][indice]["title"]+"</h1>";
	
	document.getElementById("varios").innerHTML = "<div id='fecha'> Año: " +  peliculas['results'][indice]['release_date'].substr(0,4) + "</div> <div id='valoracion'> Puntuación: " + estrella(peliculas['results'][indice]['vote_average']) + "</div>";
	
	document.getElementById("sinopsis").innerHTML = "<b id='sinopsis_b'><i>Sinopsis: </i></b>" + peliculas["results"][indice]["overview"];

	text = config['images']['secure_base_url'] + config['images']['poster_sizes'][6] + peliculas['results'][indice]['poster_path'];
	document.getElementById('coverpic').setAttribute("src", text);
}

function Siguiente() {
	if(indice < peliculas["results"].length-1){
		indice++;
	}else{
	  indice = 0;
	}
	actualizar();
}

function Anterior() {
	if(indice == 0){
		indice = peliculas["results"].length -1;
	}else{
		indice--;
	}
	actualizar();
}

function loadfilms() {
	xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23cf888d2154b7ea3b81b691334ebcde", false);  
	xhttp.send();

	if (xhttp.readyState === 4 && xhttp.status === 200){
		try {
			peliculas = JSON.parse(xhttp.responseText);
		} catch (e) {
			alert("error: " + e.message);
		}
	} else {
		alert(xhttp.statusText);
	}
	actualizar();
}

$(window).resize(function(){
	resizedw();
});
//]]>
