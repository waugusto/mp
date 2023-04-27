/*
 * Bootstrap-based responsive mashup
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	//host: "paineis-ext.mpdft.mp.br",
	host: window.location.hostname,
	//host: "vp1-app-034.mpdft.mp.br",
	//host: "vp1-app-034"	
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
//to avoid errors in workbench: you can remove this when you have added an app
var app;
require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	
	$( "[data-qcmd]" ).on( 'click', function () {
		var $element = $( this );
		switch ( $element.data( 'qcmd' ) ) {
			//app level commands
			case 'clearAll':
				app.clearAll();
				break;
		}
	});

	//descomentar para atribuir tema escolhido ao mashup
	const themeID = 'horizon';
	qlik.theme.apply( themeID );
	
	//qlik.theme.apply('breeze').then(function(result){});
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  		qlik.resize();
	});
	$(".btnFullscreen").on("click",function(){
		fullscreen($(this).parents(".fullscreen"));    
		return false;
		qlik.resize();
	});

	function fullscreen(panel){ 
		if (panel.hasClass("fullscreened")) {
			panel.removeClass("fullscreened");
			panel.find(".header-fullscreen a.btnFullscreen .fa").removeClass("fa-compress").addClass("fa-expand");
			qlik.resize(); 
		} else {
			panel.addClass("fullscreened");		
			panel.find(".header-fullscreen a.btnFullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
			qlik.resize();
		}
	}
	function buscaObjeto(divid,objectid){
		app.visualization.get(objectid).then(function(vis){
		//console.log(vis);
			vis.show(divid);
			$("#"+divid).append("<a id='excel"+ divid + objectid + "' class='export_data export_data_excel'><i class='fal fa-file-spreadsheet'></i></a>");

			$("#excel"+divid+ objectid).on('click',function(e){
				console.log("cliquei excel");
				//console.log(e)
				vis.exportData().then(function (result) {
				//console.log(result);
					window.open(result, 'Download');
				});
			});																							
			$("#"+divid).append("<a id='pdf"+ divid + objectid + "' class='export_data export_data_pdf'><i class='fa-light fa-file-pdf'></i></a>");

			$("#pdf"+divid+ objectid).on('click',function(e){
				var settings = { documentSize: 'a4', aspectRatio: 2, orientation: "landscape" };
				console.log("cliquei PDF");
				vis.exportPdf(settings).then(function (result) {
					console.log('PDF download link: ', result);
					window.open(result, 'Download');
				});
			});


		});
	}
	//callbacks -- inserted here --
	//open apps -- inserted here --

	var qvfName = "D-PDDC - MAPA DA SAÚDE - REGULAÇÃO.qvf";

	if(window.location.hostname == "paineis-ext.mpdft.mp.br"){
		qvfName = "7edb02fa-f1f5-4ea6-b348-049a4ac2d095"
	}else{
		qvfName = "7edb02fa-f1f5-4ea6-b348-049a4ac2d095"
	}

	var app = qlik.openApp(qvfName, config);
	app.getAppLayout( function ( layout ) {
			console.log(layout.qLastReloadTime);
			$(".qvUltimacarga").html("Atualizado em: " + transformaData(layout.qLastReloadTime));
	});
	//get objects -- inserted here --
	

	function limpaDivFiltros(){
		app.clearAll();
		$("#QVFILTROS-00").remove();
		$("#QVFILTROS-01").remove();
		$("#QVFILTROS-02").remove();
		$("#QVFILTROS-03").remove();
		$("#QVFILTROS-04").remove();
		$("#QVFILTROS-05").remove();
		$("#CurrentSelections").remove();		
	}
	function addFiltros(qtd,classe,page){

		let selecoes = $(".qvselecoesatuais");
		// console.log(selecoes);
		for (let i = 0; i < qtd; i++) {
			console.log(i)
			$(".container-Filtros").append("<div id='QVFILTROS-0" +i+"' class='"+classe+"'></div>");
		}
		$(page).prepend("<div id='CurrentSelections' class='qvobjects qvselecoesatuais'></div>");
	}
	function transformaData(value){
		var dataCompleta = value;
		var data = dataCompleta.substr(0,10).split('-');
		var hora = dataCompleta.substr(11,5);
		var ultimaCarga = data[2] + "/" + data[1] + "/" + data[0] + " " + hora;
		return ultimaCarga;
	};
	
	$(".menu-item .menu-link").on("click", function(e){ 
	var expr = (e.currentTarget.hash);
	console.log(expr);
	switch (expr) {
		case "#page2": 
			
			app.getObject('QVFILTROS-00','DreMPbn');
			app.getObject('QVFILTROS-01','jxWFS');
			app.getObject('QVFILTROS-02','KmmwQrk');
			app.getObject('QVFILTROS-03','WYjEZc');
			app.getObject('QVFILTROS-04','XhCYz');
			app.getObject('CurrentSelections','CurrentSelections');
			app.getObject('KPI01','qcvB');
			app.getObject('KPI02','aHsKJ');
			app.getObject('KPI03','fcxXtT');	
			buscaObjeto('QV01','eqJGe');
			buscaObjeto('QV02','JPPq');
			buscaObjeto('QV03','Qppsy');
			buscaObjeto('QV04','rYND');
			buscaObjeto('QV05','vwwET');
			buscaObjeto('QV06','pSxb');
			buscaObjeto('QV07','VcCgn');
			// buscaObjeto('QV08','nVemFm');
			limpaDivFiltros();
			addFiltros(5,'qvfiltro', '#page2 > .filtroSelecoes');
		break;
		// case "#page3": //IDEB
			
		// 	app.getObject('CurrentSelections','CurrentSelections');
		// 	app.getObject('QVFILTROS-00','');
		// 	app.getObject('QVFILTROS-01','');
		// 	app.getObject('QVFILTROS-02','');
			
		// 	app.getObject('KPI04','QAfBWy');
		// 	app.getObject('KPI05','wTPXp');
		// 	app.getObject('KPI06','rXsJZvC');
		// 	buscaObjeto('QV09','CBpfBU');
		// 	buscaObjeto('QV10','zJVEcc');
		// 	buscaObjeto('QV11','Bjqmzh');
		// 	buscaObjeto('QV12','TrAsLyT');
		// 	buscaObjeto('QV13','mjwAUZt');
		// 	buscaObjeto('QV14','XjPPAF');
		// 	buscaObjeto('QV15','qJmzJpX');
		// 	//addFiltros(5,'qvfiltro','#page2 > .filtroSelecoes');
		// break;
		case "#page4": 
			limpaDivFiltros();
			app.getObject('CurrentSelections','CurrentSelections');
			app.getObject('QVFILTROS-00','0966927f-4419-4abe-afa6-3b4aced236ff');
			app.getObject('QVFILTROS-01','854004e0-73a2-429b-8a4c-d69c92d4e817');
			app.getObject('QVFILTROS-02','3b7a596a-c21d-403d-bc6b-cf1d664ffcea');
			app.getObject('QVFILTROS-03','04aa36b7-2a75-404e-9f1b-83b8c9689b41');
			app.getObject('QVFILTROS-04','44d76fb8-32b6-4825-a946-06ba0414e505');

			app.getObject('KPI07','882dc286-3e95-4450-991b-1d7a3a5d5f00');
			app.getObject('KPI08','b58f9c44-b3ed-4011-801e-9b34f9eb9305');
			app.getObject('KPI09','8d4f4fa7-557b-42cc-b54d-c0b8e023d886');
			buscaObjeto('QV16','00fdabe4-383e-42d5-bd15-f8c989903d2e');
			buscaObjeto('QV17','73466ba1-ea58-4031-ad1c-b305f933f432');
			buscaObjeto('QV18','483deee0-094a-4179-9f26-85e996bf227a');
			buscaObjeto('QV19','6c51378a-2bbc-49f3-8649-61e97f1705d1');
			buscaObjeto('QV20','a8deb29e-f78d-492d-8d52-7107ea9a8362');
			buscaObjeto('QV21','82500190-f8fa-44e8-b9bf-88113607e185');
			buscaObjeto('QV22','7993f57a-6f60-4ffe-8f01-158fe5f81270');
			
			limpaDivFiltros();
			addFiltros(5,'qvfiltro','#page4 > .filtroSelecoes');
		break;
		// case "#page5":
		// 	limpaDivFiltros();
		// 	app.getObject('CurrentSelections','CurrentSelections');
		// 	app.getObject('QVFILTROS-00','');
		// 	app.getObject('QVFILTROS-01','');
		// 	app.getObject('QVFILTROS-02','');

		// 	app.getObject('KPI10','a7739fba-33ec-462a-b7bd-71320d4567ab');
		// 	app.getObject('KPI11','b58a1e0a-43c8-413d-a0bd-93ddcae35437');
		// 	app.getObject('KPI12','890d53eb-32c0-4841-8229-669829643285');
		// 	buscaObjeto('QV24','5d1920ea-cedb-422f-af4b-730e2b941fd2');
		// 	buscaObjeto('QV25','b6f509ce-8e7c-456a-af62-f48971d4e21e');
		// 	buscaObjeto('QV26','65c456b0-515f-4d81-9b11-2e72665ba2f6');
		// 	buscaObjeto('QV27','b13bebd2-39b7-49c2-8432-e16ff7e068a7');
		// 	buscaObjeto('QV28','ec707269-a960-46b9-8cb5-7707ca3c788e');
		// 	buscaObjeto('QV29','kkPCve');

		// 	//addFiltros(5,'qvfiltro','#page2 > .filtroSelecoes');
		// break;
	}
	
	});
	
	if (!window.matchMedia("(min-width: 769px)").matches) {
		$('body').addClass('mobile');
	}
	
	$(".mobile .menu-item .menu-link").on("click", function(e){
		$(".navegacao-esquerda").removeClass('ativo');
	});
	$(".enable-interactive").on("click", function(e){
		$(".disableScroll").toggleClass('ativo');
		$(".enable-interactive").toggleClass('ativo');
		
		$(".enable-interactive span").text(function(i, text){
          return text === "Desabilitar interação" ? "Habilitar interação" : "Desabilitar interação";
      	})
		
	});
	
	
	
});
	const url = "./dados.json";
	const xrfkey = '123456789abcdefg';
	async function buscaJson(){
		try{
			const cabecalhoGet = {	method: 'GET',	headers: { 'X-qlik-xrfkey': xrfkey, 'Content-Type': 'application/json' }}
			const contentLibrarySinc = "/extensions/mapasaude/dados.json?xrfkey=";
			const response = await fetch(contentLibrarySinc+xrfkey,cabecalhoGet)
			const data = await response.json();
			youtubeLinks(data);
			//console.log(data);

		}
		catch (error){
			console.log("Json ainda não criado");
			console.log(error);
		}
	}buscaJson();

	function youtubeLinks(response){

		var elemento = $(".youtube-links");

		for (let i = 0; i < response.length; i++) {
			var titulo = response[i].titulo;
			var link = response[i].link;
			var youtubeVideo = "<iframe src='https://www.youtube.com/embed/"+link+"'></iframe>";
			elemento.append("<div class='col-sm-4'>"+youtubeVideo+"<div class='youtube-titulo' id=''>"+titulo+"</div></div>");
		}
	}
