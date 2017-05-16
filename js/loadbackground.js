//<![CDATA[

/*
function updatebackgroundpics(){	
	postMessage(Math.floor((Math.random() * 20)));
	setTimeout("updatebackgroundpics()", 5);
}
updatebackgroundpics();
*/

function gen_bg_img(mF,col){
	var lines="";
	var num = 0;
	var ruta = config['images']['secure_base_url'] + config['images']['poster_sizes'][3];	
	do{
		var pn = Math.floor((Math.random() * peliculas.length-1));		
		var fn = Math.floor((Math.random() * (peliculas[pn]['results'].length -1)))	
		var peli = ruta + peliculas[pn]['results'][fn]['poster_path'];
		/*if((num%(mC/mF)) == 0){			
			lines += '<div class="row">\n';			
		} */		
		lines += '<img class="sp col-'+col+'" id="sp' + num + '" src="'+peli+'">\n';

		/*if((num%(mC/mF)) == (mC/mF)-1){
			lines += '</div>\n';
		}*/

		num++;
	}while(num < mF);
	return lines;
}

self.addEventListener('message', function(e){	
	//postMessage(gen_bg_img(e.data[0], e.data[1]));
	postMessage(e.data);
}, false);
self.close();

//]]>