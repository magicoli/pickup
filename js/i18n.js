function initLocales() {
	var i18n = $.i18n();

	if(getURLParameter("lang") && getURLParameter("lang") != "undefined")
		i18n.locale = getURLParameter("lang");

	if(i18n.locale != "undefined"){
		$.i18n().load({
			'fr':{
				"First name": "Prénom",
				"Name (required)": "Nom (requis)",
				"Nickname": "Surnom",
				"Submit": "Envoyer",
				"Clear": "Effacer",
				"Change": "Changer",
				"Change logo": "Changer le logo",
				"Version $1 is available": "La version $1 est disponible",
				"Download Android app": "Télécharger l'app Android",
			}
		})
	}
}
