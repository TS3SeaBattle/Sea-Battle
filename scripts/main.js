////////////////
// Variables. //
////////////////

// HTML.
var board = document.getElementById("board"); // Récupère le canvas dans le HTML.
var context = board.getContext("2d"); // Récupère le context du canvas.

// Constantes.
const cases_size = 64; // Dimension des cases.

// Images.
var background = new Image(640, 640);
background.src = 'data/img/bg.jpg';

// Sons.


// Coordonnées.
var x_click = 0;
var y_click = 0;

// Jeu.
var total = 0;

var nbBoatsJ1 = 6;
var nbBoatsJ2 = 6;

var ableToShoot = true;

var case_clicked = 0;

var game_phase1 = 0;
// 0 = J1 pose ses navires.
// 1 = J2 pose ses navires.
// 2 = Place à l'attaque.

var game_phase2 = 2;
// 1 = J1 attaque.
// 2 = J2 attaque.

// Plateaux.
// Plateau des navires du joueur 1.
var p1_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Plateau des navires du joueur 2.
var p2_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Plateau des attaques du joueur 1.
var p1_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Plateau des attaques du joueur 2.
var p2_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

////////////////
// Fonctions. //
////////////////

// Effacer le tableau de jeu.
var clearBoard = function () {
	context.clearRect(0, 0, board.height, board.width);
};

// Dessin du tableau de jeu.
var drawBoard = function () {
	// Dessin du fond.
	context.drawImage(background, 0, 0, 640, 640, 0, 0, 640, 640);

	// Dessin des lignes.
	for (var y = cases_size; y < board.height; y += cases_size) {
		context.moveTo(0, y);
		context.lineTo(board.width, y);
	};

	// Dessin des colonnes.
	for (var x = cases_size; x < board.width; x += cases_size) {
		context.moveTo(x, 0);
		context.lineTo(x, board.height);
	};

	// Dessiner le quadrillage.
	context.stroke();
};

var resetBoard = function () {
	clearBoard();
	drawBoard();
};

// Réinitialisation du jeu.
var resetGame = function () {
	console.clear(); // Nettoyer la console.
	resetBoard(); // Nettoyer le canvas.
	// Restart le jeu.
	game_phase1 = 0;
	game_phase2 = 2;
	nbBoatsJ1 = 6;
	nbBoatsJ2 = 6;
	total = 0;
	p1_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	p2_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	p1_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	p2_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
	//on redéfinit les variables au restart
	console.log("Joueur 1 place ses navires !");
};

// Lors d'un clic.
var mouseClick = function (event) {
	x_click = event.pageX - board.offsetLeft; // x = x sur la page - x du canvas.
	y_click = event.pageY - board.offsetTop; // y = y sur la page - y du canvas.
	case_clicked = 10 * (Math.floor(y_click / cases_size)) + Math.floor((x_click / cases_size)); // Repère de la case cliquée à l'aide des coordonnées.
	// Si le joueur 1 place un navire.
	if (game_phase1 == 0) {
		if (p1_board[case_clicked] == 0 && total < 6) {
			context.fillStyle = 'black'
			context.fillRect((case_clicked % 10) * cases_size, (Math.floor(case_clicked / 10)) * cases_size, cases_size, cases_size); // Remplir la case.
			p1_board[case_clicked] = 1;
			console.log(p1_board);
			total += 1;
		} else if (total == 6) {
			console.log("Vous avez placé tout vos bateaux !");
		} else {
			console.log("Vous avez déjà un navire ici !");
		};
	};

	// Si le joueur 2 place un navire.
	if (game_phase1 == 2) {
		if (p2_board[case_clicked] == 0 && total < 6) {
			context.fillStyle = 'black'
			context.fillRect((case_clicked % 10) * cases_size, (Math.floor(case_clicked / 10)) * cases_size, cases_size, cases_size); // Remplir la case.
			p2_board[case_clicked] = 1;
			console.log(p2_board);
			total += 1;
		} else if (total == 6) {
			console.log("Vous avez placé tout vos bateaux !");
		} else {
			console.log("Vous avez déjà un navire ici !")
		};
	};

	// Si le joueur 1 attaque.
	if (game_phase2 == 1) {
		if (!ableToShoot) {
			console.log("Vous avez déjà tiré !");
		} else if (p1_strike[case_clicked] == 0) {
			if (p2_board[case_clicked] == 1) {
				console.log("Touché !");
				context.fillStyle = 'red'
				context.fillRect((case_clicked % 10) * cases_size, (Math.floor(case_clicked / 10)) * cases_size, cases_size, cases_size);
				p2_board[case_clicked] = 0;
				p1_strike[case_clicked] = 2;
				console.log(p1_strike);
				ableToShoot = false;
				nbBoatsJ2 -=1;
				if (nbBoatsJ2 = 0) {
					console.log("Fin de la partie ! Victoire du joueur 1");
				};
			} else if (p2_board[case_clicked] == 0) {
				p1_strike[case_clicked] = 1;
				console.log(p1_strike);
				console.log("Plouf !");
				context.fillStyle = 'blue'
				context.fillRect((case_clicked % 10) * cases_size, (Math.floor(case_clicked / 10)) * cases_size, cases_size, cases_size);
				ableToShoot = false;
			} else {
			console.log("Vous avez déjà tiré ici !")
		}};
	};

	// Si le joueur 2 attaque.
	if (game_phase2 == 0) {
		if (!ableToShoot) {
			console.log("Vous avez déjà tiré !");
		} else if (p2_strike[case_clicked] == 0) {
			if (p1_board[case_clicked] == 1) {
				console.log("Touché !");
				context.fillStyle = 'red'
				context.fillRect((case_clicked % 10) * cases_size, (Math.floor(case_clicked / 10)) * cases_size, cases_size, cases_size);
				p1_board[case_clicked] = 0;
				p2_strike[case_clicked] = 2;
				console.log(p2_strike);
				ableToShoot = false;
				nbBoatsJ1 -=1;
				if (nbBoatsJ1 = 0) {
					console.log("Fin de la partie ! Victoire du joueur 2");
				};
			} else if (p1_board[case_clicked] == 0) {
				p2_strike[case_clicked] = 1;
				console.log(p2_strike);
				console.log("Plouf !");
				context.fillStyle = 'blue'
				context.fillRect((case_clicked % 10) * cases_size, (Math.floor(case_clicked / 10)) * cases_size, cases_size, cases_size);
				ableToShoot = false;
			} else {
			console.log("Vous avez déjà tiré ici !")
		}};
	};
};

// Changer de phase de jeu.
var changeGamePhase = function () {
	resetBoard();
	game_phase1 += 1;
	if (game_phase1 == 1) {
		game_phase1 = 2;
		total = 0;
		console.log("Joueur 2 place ses navires !");
		ableToShoot = false
	} else {
		if (ableToShoot){
			console.log("Vous devez jouer !")
		}else{
			game_phase2 += 1;
			game_phase2 = game_phase2 %2;
			ableToShoot = true;
			if (game_phase2 == 1) {
				console.log("Joueur 1 attaque !");
			} else {
				console.log("Joueur 2 attaque !");
			}
		};
	};
};

///////////////////
// Constructeur. //
///////////////////



/////////////
// Objets. //
/////////////



/////////////////////////////////
// Gestionnaires d'évènements. //
/////////////////////////////////

// Clic de la souris.
board.addEventListener('mousedown', mouseClick);

// Au chargement de la page.
background.addEventListener('load', function() {
	resetGame();
}, false);