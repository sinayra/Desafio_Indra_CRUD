function carregarMenu(pag, div){

	$("#" + div).html('<img src="img/loading.gif">');

	var menu = './menu/' + pag;
	var req = $.ajax({
		url         : menu
	});

	req.done(function(data) {
		$("#" + div).html(data);
	});
}

function refineUrl(){
    //get full url
    var url = window.location.href;
    //get url after/  
    var value = url.substring(url.lastIndexOf('/') + 1);
    //get the part after before ?
    value  = value.split("?")[0];   
    return value;     
}

function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	console.log(sPageURL);

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? false : sParameterName[1];
		}
	}

	return false;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function menuSelected(menu){
	$('.menuSelected').removeClass("menuSelected");
	$('#menu ul li a:contains("' +capitalizeFirstLetter(menu) + '")').addClass("menuSelected");
}


$('#menu ul li a').click(function(e){ 
	var menu = ($(this).text()).toLowerCase();
	
	menuSelected(menu);

	carregarMenu(menu, "resultado");

	e.preventDefault();
});

var pag = getUrlParameter('pag');
if(pag != false){
	var html;
	carregarMenu(pag, "resultado");

	var status = parseInt(getUrlParameter('status'));
	var textStatus = getUrlParameter('textStatus');
	var msg = (getUrlParameter('msg')).replace(/\+/g, ' ');


	switch(+status){
		case 200:
			html = '<div class="msg_status sucess">' + capitalizeFirstLetter(getUrlParameter('nome')).replace(/\+/g, ' ') + ' '+ msg + ' com sucesso</div>';
		break;
		case 406:
			html = '<div class="msg_status erro">Operação cancelada</div>';
		break;
		default:
			html = '<div class="msg_status erro">Erro em ' + pag + '<br /> ' +  status + ': ' + textStatus + ' </div>'
		break;
	}
	$("#status").html(html);
		setTimeout(function() {
	        $(".msg_status").hide(1000);
	    }, 5000);
}
else{
	menuSelected("início");
}