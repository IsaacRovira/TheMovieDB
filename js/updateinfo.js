//<![CDATA[

function updatefilms() {	
	for(var i = 1; i < 11; i++){
		xhttp = new XMLHttpRequest();	
		xhttp.open("GET", "https://api.themoviedb.org/4/list/"+ (i+1) +"?api_key=23cf888d2154b7ea3b81b691334ebcde",false);
		
		xhttp.send();

		if (xhttp.readyState === 4 && xhttp.status === 200){
			try {				
				postMessage(JSON.parse(xhttp.responseText));
			} catch (e) {
				alert("error: " + e.message);
			}
		} else {
			alert("Status text: " + xhttp.statusText +
				  " Status state: " + xhttp.readyState +
				  " Status: " + xhttp.status);
		}		
		setTimeout("updatefilms()",500);
	}
}
updatefilms();
//]]>