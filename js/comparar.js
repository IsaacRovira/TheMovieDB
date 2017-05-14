//<![CDATA[

function comparar(valor){
	for(n = 0; n < peliculas.length; n++){
		for(i=0;i<peliculas[n]['results'].length;i++){
			for(j=0;j<valor.length;j++){
				if(peliculas[n]['resuluts'][i]['title'][j] != valor[j]){
					break;
				}
				return true;
			}
			for(j=0;j<valor.length;j++){
				if(peliculas[n]['resuluts'][i]['original_title'][j] != valor[j]){
					break;
				}
				return true;
			}			   
		}
	}
}

self.addEventListener("meessage",function(e){
	self.postMessage(comparar(e.data));	
}, false);


//]]>