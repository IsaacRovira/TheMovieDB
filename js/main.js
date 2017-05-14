//<![CDATA[
/*

xhttp.open("GET", "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23cf888d2154b7ea3b81b691334ebcde", false);

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
var genres;
var pag = 0;
var indice = 0;
var peliculas=[];
var xhttp;
var worker;
var w_bg_pics_update;
var w_bg_pics_load;
var totPag = 0;
var totFilms = 0;

//Capturamos los parámetros de configuración de la web
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
	
	xhttp.open ("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=23cf888d2154b7ea3b81b691334ebcde", false);
	xhttp.send();
	if (xhttp.readyState === 4 && xhttp.status === 200) {
		try {
			genres = JSON.parse(xhttp.responseText);
		} catch (e) {
			alert("error config: " + e.message);
		}
	} else {
		alert(xhttp.statusText);
	}
}

//Determinar genero pelicula 2 métodos según el orden
function genero(genres_id, metodo){		
	var genres_name = new Array();
	if(metodo){
		for(var n = 0; n < genres['genres'].length; n++){
			for(var i = 0; i < genres_id.length; i++){
				if(genres['genres'][n]['id'] == genres_id[i]){
					genres_name.push(genres['genres'][n]['name']);					
					i=genres_id.length;
				}
			}
		}
	}else{
		for(var n = 0; n < genres_id.length; n++){
			for(var i = 0; i < genres['genres'].length; i++){
				if(genres_id[n] == genres['genres'][i]['id']){					
					genres_name.push(genres['genres'][i]['name']);
					i=genres['genres'].length;
				}
			}
		}
	}	
	return genres_name;
}

//Introduce número de estrellas según la puntuación
function estrella(numero){
	estrellas="";
	for(n=0; n<numero/2; n++){
		estrellas += "<span class='fa fa-star'></span>";
	}
	
	/*Media estrella para la parte fraccionaria*/
	if((numero%1)*10 >= 5){estrellas+="<span class='fa fa-star-half'></span>";}
	
	/*La puntuación entre ()*/
	estrellas+="<span id='valor'>&nbsp;&nbsp;("+peliculas[pag]['results'][indice]['vote_average']+")</span>";
	return estrellas; 
}

//Actualizamos el contenido html con los datos del array peliculas.
function actualizar() {
	var text;
	/*Titulo*/
	document.getElementById("titulo").innerHTML = "<h1>"+peliculas[pag]['results'][indice]["title"]+"</h1>"; 	
	
	/*Genero, Año y Puntuación*/	
	document.getElementById("varios").innerHTML = "<span id='genero'>" + genero(peliculas[pag]['results'][indice]['genre_ids'],true)[0] + "</span><span class='fa fa-calendar' aria-hidden='true'id='fecha'> " +  peliculas[pag]['results'][indice]['release_date'].substr(0,4) + "</span><span id='valoracion'>" + estrella(peliculas[pag]['results'][indice]['vote_average'])+ "</span>";
	
	/*Sinopsis*/
	document.getElementById("sinopsis").innerHTML = "<span>" + peliculas[pag]["results"][indice]["overview"] + "</span>";

	/*Imagen1*/
	text = config['images']['secure_base_url'] + config['images']['poster_sizes'][6] + peliculas[pag]['results'][indice]['poster_path'];
	document.getElementById('pic').setAttribute("src", text);
	//document.getElementById('contenedor').style.backgroundImage = "url('"+text+"')";
}

function randomfilm(){
	var pn = Math.floor((Math.random() * peliculas.length-1));		
	var fn = Math.floor((Math.random() * (peliculas[pn]['results'].length -1)));	
	return peliculas[pn]['results'][fn]['poster_path'];
}

function gen_bg_img(mF, col){
	var lines="";
	var num = 0;	
	do{
		/*if((num%(mC/mF)) == 0){			
			lines += '<div class="row">\n';			
		} */		
		lines += '<img class="sp col-'+col+'" id="sp' + num + '">\n';

		/*if((num%(mC/mF)) == (mC/mF)-1){
			lines += '</div>\n';
		}*/

		num++;
	}while(num < mF);
	//alert(lines);
	document.getElementById("smallpics").innerHTML = lines;
	numero = num;
	w_bg_pics_load.onmessage = function(event){
		var imagenes=[];
		for(i=0;i<num;i++){
			imagenes.push(0);
		}
		if(imagenes[event.data]==0){
			actualizar_fondo(event.data);
			imagenes[event.data] = 1;
		}
		for(i=0;i<imagenes.length;i++){
			if(imagenes[i] == 0){
				break;
			}else{
				var fin = true;
			}
			if(fin){
				w_bg_pics_load.terminate();
				break;
			}
		}
	}
}

function actualizar_fondo(pic){		
	var valor = config['images']['secure_base_url'] + config['images']['poster_sizes'][3] + randomfilm();	
	document.getElementById('sp'+ pic).style.backgroundImage = "url('"+valor+"')"; 
	document.getElementById('sp'+ pic).setAttribute("src", valor);
}

//Boton siguiente
function Siguiente() {
	if(indice < peliculas[pag]["results"].length-1){
		indice++;
	}else{		
		if(pag == peliculas.length-1){pag=0;}else{pag++;}		
		indice = 0;
	}
	actualizar();
}

//Boton anterior
function Anterior() {
	if(indice === 0){
		if(pag === 0){			
			pag = peliculas.length-1;
			
		}else{
			pag--;
		}		
		indice = peliculas[pag]["results"].length-1;		
	}else{
		indice--;
	}
	actualizar();
}

//Cargamos la primera pagina de pelicualas. Las demas con un worker...
function loadfilms(){	
	xhttp = new XMLHttpRequest();	
	xhttp.open("GET", "https://api.themoviedb.org/4/list/1?api_key=23cf888d2154b7ea3b81b691334ebcde",false);
	
	xhttp.send();

	if (xhttp.readyState === 4 && xhttp.status === 200){
		try {				
			peliculas.push(JSON.parse(xhttp.responseText));
		} catch (e) {
			alert("error: " + e.message);
		}
	} else {
		alert("Status text: " + xhttp.statusText +
			  " Status state: " + xhttp.readyState +
			  " Status: " + xhttp.status);
	}
	actualizar();
}

//Verificamos que podemos lanzar un worker.
if(typeof(Worker) !== "undefined"){
	
	//Browser supports Web worker.
	worker = new Worker('js/updateinfo.js');
	w_bg_pics_update = new Worker('js/updatebackground.js');
	w_bg_pics_load = new Worker('js/loadbackground.js');
	//Escuchamos a los worker.
	worker.onmessage = function(event){
		peliculas.push(event.data);
		totPag = peliculas.length;		
		totFilms += peliculas[totPag-1]['results'].length;
		if(totPag == 50){
			worker.terminate();
			worker = undefined;			
		}
	}
	
	w_bg_pics_update.onmessage = function(event){
		actualizar_fondo(event.data);
	}	
	
}else{
	alert("Your browser does not support Web Workers!");
}






//]]>
