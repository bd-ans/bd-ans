const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_DARK_DIR = "./mustache/dark.mustache";
const MUSTACHE_LIGHT_DIR = "./mustache/light.mustache";
const MUSTACHE_MAIN_DIR = "./mustache/main.mustache";

let uCYear = 0;
let uCMonth = 0;
let uCDay = 0;

let uuuid = 0;

var mS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
var dat = new Date();
var curday = dat.getDate();
var curmon = dat.getMonth() + 1;
var curyear = dat.getFullYear();
function checkleapyear(datea) {
	if (datea.getYear() % 4 == 0) {
		if (datea.getYear() % 10 != 0) {
			return true;
		} else {
			if (datea.getYear() % 400 == 0) return true;
			else return false;
		}
	}
	return false;
}

function DaysInMonth(Y, M) {
	with (new Date(Y, M, 1, 12)) {
		setDate(0);
		return getDate();
	}
}

function datediff(date1, date2) {
	var y1 = date1.getFullYear(),
		m1 = date1.getMonth(),
		d1 = date1.getDate(),
		y2 = date2.getFullYear(),
		m2 = date2.getMonth(),
		d2 = date2.getDate();
	if (d1 < d2) {
		m1--;
		d1 += DaysInMonth(y2, m2);
	}
	if (m1 < m2) {
		y1--;
		m1 += 12;
	}
	return [y1 - y2, m1 - m2, d1 - d2];
}

const calage = () => {
	var calday = 19;
	var calmon = 05;
	var calyear = 2005;
	if (
		curday == "" ||
		curmon == "" ||
		curyear == "" ||
		calday == "" ||
		calmon == "" ||
		calyear == ""
	) {
	} else {
		var curd = new Date(curyear, curmon - 1, curday);
		var cald = new Date(calyear, calmon - 1, calday);

		var diff =
			Date.UTC(curyear, curmon, curday, 0, 0, 0) -
			Date.UTC(calyear, calmon, calday, 0, 0, 0);
		var dife = datediff(curd, cald);

		uCYear = dife[0];
		uCMonth = dife[1];
		uCDay = dife[2];

		dife[0] + " years, " + dife[1] + " months, and " + dife[2] + " days";
		var as = parseInt(calyear) + dife[0] + 1;
		var diff =
			Date.UTC(as, calmon, calday, 0, 0, 0) -
			Date.UTC(curyear, curmon, curday, 0, 0, 0);
	}
};

function uuidv4() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
}

console.log(uuidv4())

calage();
let DATA = {
	uYear: uCYear,
	uMonth: uCMonth,
	uDay: uCDay,
	uuuid: uuidv4(),

	date: new Date().toLocaleString("en", {
		weekday: "long",
		hour: "numeric",
		minute: "numeric",
		timeZone: "Asia/Tashkent",
	}),
};


function generateReadMe() {
	fs.readFile(MUSTACHE_DARK_DIR, (err, data) => {
		if (err) throw err;
		const output = Mustache.render(data.toString(), DATA);
		fs.writeFileSync("./imgs/dark.svg", output);
	});
	fs.readFile(MUSTACHE_LIGHT_DIR, (err, data) => {
		if (err) throw err;
		const output = Mustache.render(data.toString(), DATA);
		fs.writeFileSync("./imgs/light.svg", output);
	});
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err;
		const output = Mustache.render(data.toString(), DATA);
		fs.writeFileSync("./README.md", output);
	});
}  
generateReadMe();
