var fps = 60; var interval = (1000 / fps); var version = 0.003; var release = "-r1"; var init = false;

// update
function Update() { Log("This is needed to make the other Update.() function to work."); };
Update.playerStats = function() {
	if (init == true) {
		$("#s-hp, #nav-hp").html("HP : " + beautify(ps.hp, 0) + "/" + beautify(ps.maxHp, 0) + ' <small class="small">+' + beautify(ps.hpPerSec, 0) + 'HP/s</small>');
		$("#s-xp, #nav-xp").html("XP : " + beautify(ps.xp, 0) + "/" + beautify(ps.xpNeeded, 0));
		$("#s-gold, #nav-gold").html("Gold : " + beautify(ps.gold, 2));
		$("#s-diamond, #nav-diamond").html("Diamond : " + beautify(ps.diamond, 2));
		$("#s-level").html("Level : " + beautify(ps.level, 0));
		$("#s-coal, #modal-coal").html("Coal : " + beautify(pi.coal, 2));
		$("#s-crystal, #modal-crystal").html("Crystal : " + beautify(pi.crystal, 2));
		$("#s-jade, #modal-jade").html("Jade : " + beautify(pi.jade, 2));
		$("#s-ruby, #modal-ruby").html("Ruby : " + beautify(pi.ruby, 2));
		$("#s-saphire, #modal-saphire").html("Saphire : " + beautify(pi.saphire, 2));

		$("#s-helmet").html('<img class="stats" src="' + p.helmet.img + '"> Helmet : <i>' + p.helmet.itemName + "</i><br>+" + p.helmet.armor + " armor");
		$("#s-armour").html('<img class="stats" src="' + p.armour.img + '"> Armour : <i>' + p.armour.itemName + "</i><br>+" + p.armour.armor + " armor");
		$("#s-gloves").html('<img class="stats" src="' + p.gloves.img + '"> Gloves : <i>' + p.gloves.itemName + "</i><br>+" + p.gloves.armor + " armor");
		$("#s-boots").html('<img class="stats" src="' + p.boots.img + '"> Boots : <i>' + p.boots.itemName + "</i><br>+" + p.boots.armor + " armor");
		$("#s-amulet").html('<img class="stats" src="' + p.amulet.img + '"> Amulet : <i>' + p.amulet.itemName + "</i><br>+" + p.amulet.armor + " armor");
		$("#s-sword").html('<img class="stats" src="' + p.sword.img + '"> Sword : <i>' + p.sword.itemName + "</i><br>+" + p.sword.damage + " damage");
		$("#s-totalarmor").html("Total armor : " + getPlayerArmor() + "% reduction of monster damage (currently not implemented)");
		// hp-bar in the navbar
		var playerHpBar = 100;
		playerHpBar = (ps.hp / ps.maxHp) * 100;
		$("#ps-hpbar").css("width", playerHpBar + "%");
	};
};
Update.monsters = function() {
	if (typeof liveAdventure == "string" && init == true) {
		for (var i = 0; i < liveMonsters.length; i++) {
			var lm = liveMonsters[i];
			var lmi = liveMonsters[i].index;
			var widthHp = 100;
			// updating progress-bar + text
			widthHp = (lm.hp / lm.maxHp) * 100;
			$("#monster-hb" + lmi).css("width", widthHp + "%");
			$("#monster-hpdisplay" + lmi).html(lm.hp + "/" + lm.maxHp + " HP");
		};
		$("#monsters-msg").css("display", "none");
	} else {
		$("#monsters-msg").css("display", "block");
	};
};
Update.gameInit = function() {
	Log("Calling Update.gameInit() - this is the onload function");
	Adventure.init();
	Mining.init();
	Shop.init();
	Player.init(); // init materials
	init = true;
	loadData();
	Mining.check();
	Shop.check();
	Log("You can play, the game is fully loaded! Have fun!");
};

// log
function Log(text) { console.log("Inc-RPG v" + version + release + " : " + text); };

// loading + loop
window.onload = function() {
	Update.gameInit();
};
var mainInterval = window.setInterval(function() {
	Update.playerStats();
	Update.monsters();
}, interval);
var regainHpInterval = window.setInterval(function() {
	Player.regainHp();
}, 1000);
var saveInterval = window.setInterval(function() {
	saveData();
}, 10000);
var buildsInterval = window.setInterval(function() {
	Mining.reward();
}, 10);
var helpersInterval = window.setInterval(function() {
	getXpNeeded();
	getPlayerHp();
}, 100);