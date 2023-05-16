/*
 * Bootstrap-based responsive mashup
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
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
				case 'back':
					app.back();
					break;
				case 'forward':
					app.forward();
					break;
			}
	});
	
	//qlik.theme.apply('breeze').then(function(result){});
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  		qlik.resize();
	});
	$(".fullscreen").on("click",function(){
		fullscreen($(this).parents(".panel-card"));    
		//return false;
		//qlik.resize();
		console.log("Cliquei" + $(this));
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
	// function buscaObjeto(divid,objectid){
	// 	app.visualization.get(objectid).then(function(vis){
	// 	//console.log(vis);
	// 		vis.show(divid);
	// 		$("#"+divid).append("<a id='excel"+ divid + objectid + "' class='export_data export_data_excel'><i class='fas fa-file-excel'></i></a>");

	// 		$("#excel"+divid+ objectid).on('click',function(e){
	// 			console.log("cliquei excel");
	// 			//console.log(e)
	// 			vis.exportData().then(function (result) {
	// 			//console.log(result);
	// 				window.open(result, 'Download');
	// 			});
	// 		});

	// 		$("#"+divid).append("<a id='pdf"+ divid + objectid + "' class='export_data export_data_pdf'><i class='fas fa-file-pdf'></i></a>");

	// 		$("#pdf"+divid+ objectid).on('click',function(e){
	// 			var settings = { documentSize: 'a4', aspectRatio: 2, orientation: "landscape" };
	// 			console.log("cliquei PDF");
	// 			vis.exportPdf(settings).then(function (result) {
	// 				console.log('PDF download link: ', result);
	// 				window.open(result, 'Download');
	// 			});
	// 		});


	// 	});
	// }
	function buscaObjeto(divid,objectid){
		app.visualization.get(objectid).then(function(vis){
			vis.show(divid);
			QlikExport.setUpExport('#'+divid, vis);
		});
	}
	function buscaObjetoSoExcel(divid,objectid){
		app.visualization.get(objectid).then(function(vis){
		//console.log(vis);
			vis.show(divid);
			$("#"+divid).append("<a id='excel"+ divid + objectid + "' class='export_data export_data_excel'><i class='fas fa-file-excel'></i></a>");

			$("#excel"+divid+ objectid).on('click',function(e){
				console.log("cliquei excel");
				//console.log(e)
				vis.exportData().then(function (result) {
				//console.log(result);
					window.open(result, 'Download');
				});
			});

		});
	}
	
	//callbacks -- inserted here --
	//open apps -- inserted here --
	var qvfName = "D-NCD - PROSUS.qvf";
	if(!['paineis-ext.mpdft.mp.br','mysite2.com'].includes(window.location.hostname)){
           qvfName = "26d4f904-c5f1-4602-a83b-0db25f215a7d"
	}

	if(window.location.hostname == "paineis-ext.mpdft.mp.br"){
		qvfName = "26d4f904-c5f1-4602-a83b-0db25f215a7d"
	}

	var app = qlik.openApp(qvfName, config);

	//var app = qlik.openApp('6d51648e-f4df-492c-a623-2e7f613b7713', config);
	
	app.field('Ano_Matriculas_Escolas').selectValues([2021],false);
	
	app.getAppLayout( function ( layout ) {
		console.log(layout.qLastReloadTime);
		$(".qvUltimacarga").html("Atualizado em: " + transformaData(layout.qLastReloadTime));
	});

	
	//get objects -- inserted here --
	//app.getObject('SEL01','ZXtem');
	//app.getObject('KPI07-1','JzCSLn');
	
	app.getObject('QVBTNINF04','JzCSLn');
    app.getObject('CurrentSelections','CurrentSelections');
	

	// Mapa Principal
	// app.getObject('filtroSelecoesHome','CurrentSelections');
	app.getObject('QVFILTROS-00','e2f47784-4612-4188-87d5-5b41193bcff2');
	app.getObject('KPI01','697262ac-4066-491e-87d0-d7536d295e16');
	app.getObject('KPI02','4078c1c4-3c21-4398-9596-d3657857ee97');
	app.getObject('KPI03','c2697a5d-f4d9-4fc0-940f-5a1bdae73f3a');
	app.getObject('KPI04','28a20aaf-bb57-481e-804b-6fcf01e8f89d');
	app.getObject('KPI04-1','pRtUWKp');
	app.getObject('QV01','LjxRp');
	//buscaObjeto('QV01','804d8bce-5928-4fb4-85f2-c3ed18c5917c');
	
function limpaDivFiltros(){
	$("#QVFILTROS-00").remove();
	$("#QVFILTROS-01").remove();
	$("#QVFILTROS-02").remove();
	$("#QVFILTROS-03").remove();
	$("#QVFILTROS-04").remove();
	$("#QVFILTROS-05").remove();
	// $("#CurrentSelections").remove();
}
function addFiltros(qtd,classe,page){
	let selecoes = $(".qvselecoesatuais");
	// console.log(selecoes);
	for (let i = 0; i < qtd; i++) {
		$(".filtros-container").append("<div id='QVFILTROS-0" +i+"' class='"+classe+"'></div>");
	}
	// $(page).prepend("<div id='CurrentSelections' class='qvobjects qvselecoesatuais'></div>");
}
function transformaData(value){
	var dataCompleta = value;
	var data = dataCompleta.substr(0,10).split('-');
	var hora = dataCompleta.substr(11,5);
	var ultimaCarga = data[2] + "/" + data[1] + "/" + data[0] + " " + hora;
	return ultimaCarga;
};
$(".menu-item .menu-link").on("click", function(e){

	$('.sheet-title').text($(this).text());

	var expr = (e.currentTarget.hash);

	switch (expr) {
		case "#page2": //IDEB
		
		    //app.getObject('CurrentSelections','CurrentSelections');
		  	app.getObject('QVFILTROS-00','6b9b7df7-9cc5-4e9c-97b8-325d94717031');
		  	app.getObject('QVFILTROS-01','wUcEcW');
		  	app.getObject('QVFILTROS-02','eGPX');
		  	app.getObject('QVFILTROS-03','pRXfeJ');
		  	app.getObject('QVFILTROS-04','XeAsHJ');
			app.getObject('KPI05','4c0fbe7c-8370-458b-ac08-63d618f3ffaf');
			app.getObject('KPI06','b083073e-1855-433d-931a-3767aa1bdcd6');
			app.getObject('KPI07','9f8bfb4f-79e6-4a4c-9ff4-6899916c75a9');
			app.getObject('KPI08','975b4254-6056-422b-bcea-4c6571fb80b0');
			app.getObject('KPI09','c1f30eb2-cb34-47b2-97e4-9f5f09b47fc5');
			app.getObject('KPI10','926a1ff9-ddbd-4230-8312-bfe3236c80e4');	
			app.getObject('SEL01','ZXtem')
			app.getObject('SEL02','LMkJj')
			app.getObject('SEL03','gWzn')
			
			buscaObjeto('QV02','6beba9cd-52b1-419b-8b70-8af9228d5059');
			buscaObjeto('QV03','bxcqDFC');
			buscaObjeto('TB01','FtcXRp');
			limpaDivFiltros();
			addFiltros(5,'qvfiltro','#page2 > .filtroSelecoes');
		    break;
				
		  
		case "#page3": //ENSINO INFANTIL
		  	//app.getObject('CurrentSelections','CurrentSelections');
		  	app.getObject('QVFILTROS-00','ecj');
			app.getObject('QVBTN01','zbkvwU');
			app.getObject('QVBTN02','BJHJhJ');
			app.getObject('KPI11','qrEjRa');
			app.getObject('KPI12','BAfsMm');
			app.getObject('KPI13','udDbqa');
			app.getObject('KPI13-1','ncJUG');
			app.getObject('QVBTNINF01','hujPS');
			app.getObject('QVBTNINF02','hWDSL');
			app.getObject('QVBTNINF03','tJgvBJ');
			
			app.getObject('QVBTNINF05','mJrhLpz');
			buscaObjeto('QV04','Jbsbb'); 
			buscaObjeto('QV05','ccbda8bb-c375-4549-96c8-f409524c8b22'); 
			buscaObjeto('QV05-1','eurNJH');
			buscaObjeto('QV05-2','xBAmAqP');
			limpaDivFiltros();
			addFiltros(1,'qvfiltro filtroContainer', '#page3 > .filtroSelecoes');
		    break;
		case "#page4": // Internações (Saúde Mental)
		  	
		  	app.getObject('QVFILTROS-00','JUWnfv');
			app.getObject('QVBTNFDM01','TZUBxY');
			app.getObject('QVBTNFDM02','VKhbT');
			app.getObject('QVBTNFDM03','pszHew');
			app.getObject('QVBTNFDM04','jEmwNNH');
			app.getObject('QVBTNFDM05','wjNdUd');
			app.getObject('QVBTNFDM06','TtwwULr');
			app.getObject('QVBTNFDM07','JRYKSx');
			app.getObject('QVBTNFDM08','eMpUYm');
			app.getObject('QVBTNFDM09','qYHhM');
			app.getObject('QVBTNFDM10','ZvUhFH');
			app.getObject('KPI14','WPFcJVX');
			app.getObject('KPI15','a805dd4f-df27-4fe5-9b41-e7f3fa252234');
			app.getObject('KPI16','MjhhqQW');
			app.getObject('KPI16-1','RqCbAJ');
			app.getObject('KPI16-2','926c2e79-55de-488f-af8c-da30138ad2fc');
			buscaObjeto('QV06','Hwvef');
			buscaObjeto('QV07','PYyaL');
			buscaObjeto('QV08','jkzPPJ');
			//buscaObjeto('QV09','wjNdUd');
			buscaObjeto('QV10','SyLpmS');
			buscaObjeto('QV11','bFFnRJ');
			buscaObjeto('QV11-1','xUCYJ');
			limpaDivFiltros()
			addFiltros(1,'qvfiltro filtroContainer', '#page4 > .filtroSelecoes');
		    break;
		case "#page5": //ENSINO MÉDIO
			//app.getObject('CurrentSelections','CurrentSelections');
		  	app.getObject('QVFILTROS-00','SFgtYMQ');
		  	//app.getObject('QVFILTROS-01','FfJVFb');
			app.getObject('QVBTN03','AGdSp');
			app.getObject('QVBTN04','Bymac');
			app.getObject('QVBTN05','ppVgCw');
			app.getObject('QVBTNENM01','bVmdtD');
			app.getObject('QVBTNENM02','JzPbxx');
			app.getObject('QVBTNENM03','DQtj');
			app.getObject('QVBTNENM04','bnnzJz');
			app.getObject('QVBTNENM05','YNkJqLs');
			
			app.getObject('KPI17','VBPVtP');
			app.getObject('KPI18','ctHG');
			app.getObject('KPI19','kqpchZT');
			app.getObject('KPI19-1','ZfHxJ');
			buscaObjeto('QV12','nBpYxwX');
			buscaObjeto('QV13','mEmnuaM');
			buscaObjeto('QV14','BUFYN');
			buscaObjeto('QV15','KbVeWW');
			buscaObjeto('QV16','jmJNat');
			buscaObjeto('QV17','pTjpgt');
			buscaObjeto('QV18','TepxEu');
			limpaDivFiltros()
			addFiltros(1,'qvfiltro filtroContainer', '#page5 > .filtroSelecoes');
		    break;
		case "#page6":
			app.getObject('QVFILTROS-00','e0ab1889-86fe-45b3-a009-307b62e6040d');			
			app.getObject('KPI20','63e50b2f-77be-4111-9a36-cfc96bb7f3fe');
			app.getObject('KPI21','d2b2a3a0-fc37-411d-b375-1149ce35db5e');
			app.getObject('KPI22','a66daf3f-6b26-4712-8dae-9c0a852ae13d');

			buscaObjeto('QV20','ed943427-2a14-4a42-a3b8-9416fd0c01ab');
			buscaObjeto('QV21','qnkVhTY');
			buscaObjeto('QV22','ntgyn');
			buscaObjeto('QV23','htgHaN');

			limpaDivFiltros();
			addFiltros(1,'qvfiltro filtroContainer', '#page6 > .top-inside-page .filtroSelecoes');
			break;
		case "#page1":
			//app.getObject('CurrentSelections','CurrentSelections');
			app.getObject('QVFILTROS-00','e2f47784-4612-4188-87d5-5b41193bcff2');			
			app.getObject('KPI01','697262ac-4066-491e-87d0-d7536d295e16');
			app.getObject('KPI02','4078c1c4-3c21-4398-9596-d3657857ee97');
			app.getObject('KPI03','c2697a5d-f4d9-4fc0-940f-5a1bdae73f3a');
			app.getObject('KPI04','28a20aaf-bb57-481e-804b-6fcf01e8f89d');
			app.getObject('KPI04-1','pRtUWKp');
			buscaObjeto('QV01','LjxRp');
			limpaDivFiltros();
			addFiltros(1,'qvfiltro filtroContainer', '#page1 > .top-inside-page .filtroSelecoes');
		}
	});
});


const url = "./dados.json";
const xrfkey = '123456789abcdefg';
async function buscaJson(){
	try{
		const cabecalhoGet = {	method: 'GET',	headers: { 'X-qlik-xrfkey': xrfkey, 'Content-Type': 'application/json' }}
		const contentLibrarySinc = "/extensions/mashupeducacao/dados.json?xrfkey=";
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

	//import data from './dados.json' assert {type:'json'};
	
	var elemento = $(".youtube-links");

	for (let i = 0; i < response.length; i++) {
		var titulo = response[i].titulo;
		var link = response[i].link;
		var youtubeVideo = "<iframe src='https://www.youtube.com/embed/"+link+"'></iframe>";
		elemento.append("<div class='col-sm-4'>"+youtubeVideo+"<div class='youtube-titulo' id=''>"+titulo+"</div></div>");
	}
	//console.log(titulo);
}
