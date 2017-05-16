//<![CDATA[

self.addEventListener('message', function(e){
	xhttp = new XMLHttpRequest();	
	xhttp.open("GET", "https://api.themoviedb.org/4/list/1?language=es-ES&api_key=23cf888d2154b7ea3b81b691334ebcde",false);	
	xhttp.send();	
	if (xhttp.readyState === 4 && xhttp.status === 200){
		try {				
			return JSON.parse(xhttp.responseText);
		}catch (e){
			return e;
			}
		}else{
			return "Status text: " + xhttp.statusText +
				  " Status state: " + xhttp.readyState +
				  " Status: " + xhttp.status;
	}	
	self.close();
}, false);


//]]>