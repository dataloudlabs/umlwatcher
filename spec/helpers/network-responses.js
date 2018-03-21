(function(){
	var net_responses = {};

	// net_responses["/api/appconfig_ok"] = {
	// 	"status": 200,
	// 	"contentType": 'application/json',
	// 	"responseText": '{"meta":["ID","Label","Panel","Activate","Deactivate","IP Activate","IP Deactivate","Timeout"],"data":[["1","Botão Subir","Sala","FF0011","FF0010","Arduino Sotão","Arduino Sotão","5000"],["2","Botão Descer","Sala","FF0013","FF0014","Arduino Sotão","Arduino Sotão","5000"],["3","Botão Subir","Quarto","FF0015","FF0016","Arduino Sotão","Arduino Sotão","5000"],["4","Botão Descer","Quarto","FF0017","FF0018","Arduino Cave","Arduino Cave","5000"],["5","Luz teto","Cozinha","LL1000","LL0001","Arduino Cave","Arduino Cave","-1"],["6","Botão Subir","Quarto Rodrigo","FF0015","","Arduino Sotão","Arduino Sotão","5000"],["7","Botão Descer","Quarto Rodrigo","FF0017","","Arduino Cave","Arduino Cave","5000"],["8","Sotão","Luzes","LL1000","","Arduino Cave","Arduino Cave","-1"]],"cols":{"ID":"0","Label":"1","Panel":"2","Activate":"3","Deactivate":"4","IP Activate":"5","IP Deactivate":"6","Timeout":"7"}}'
	// };

	// net_responses["/api/appconfig_500"] = {
	// 	"status": 500,
	// 	"contentType": 'application/json',
	// 	"responseText": ''
	// };

	net_responses.mock = function(key){
		return net_responses[key];
	};

	net_responses.data = function(key){
		return JSON.parse(net_responses[key].responseText);
	}

	window.net_responses = net_responses;
})()