var text; //输入字符串
var map; //字符编码索引
var arr; //字符数
var index; //字符下标
var height;
var width;
var fontSize = 32;
var mode = 1;

function run() {
	map = new Array(0);
	arr = new Array(99999).fill(0);
	index = new Array(99999).fill(0);
	getText();
	putText();
	styleClear();
	styleChange();
	changeSize();
}

function getText() {
	text = $("#inputText")[0].value;
}

function putText() {
	$("#outputText").empty();
	for (let i = 0; i < text.length; i++) {
		let t = text[i].charCodeAt();
		if (arr[t] == 0) {
			map.push(t);
		}
		arr[t]++;
		if (index[t] === 0) {
			index[t] = new Array();
		}
		index[t].push(i);
		if (t == 10) {
			$("#outputText").append("</br>");
		} else {
			$("#outputText").append("<span class=\"outputSpan\" id=\"out" + i + "\">" + text[i] + "</span>");
		}
	}
}

function styleClear() {
	for (let i = 0; i < text.length; i++) {
		$("#out" + i).css("color", "inherit");
	}
}

function styleChange() {
	for (let i = 0; i < map.length; i++) {
		let t = map[i]; //某字符的编码
		if (t != 10 && t != 32) {
			if (arr[t] > 1) {
				if (mode == 0) {
					for (let j = 0; j < index[t].length; j++) { //查找所有的t字符
						let ind = index[t][j];
						$("#out" + ind).css("color", "red");
					}
				} else {
					search(t);
				}
			}
		}
	}
}

function search(t) {
	for (let i = 0; i < index[t].length; i++) { //查找所有的t字符
		let first = index[t][i];
		for (let j = 0; j < index[t].length; j++) {
			let second = index[t][j];
			if (
				(i == j) ||
				(first < text.length - 1 && text[first + 1].charCodeAt() == 10) ||
				(first < text.length - 1 && text[first + 1].charCodeAt() == 32) ||
				(second < text.length - 1 && text[second + 1].charCodeAt() == 10) ||
				(second < text.length - 1 && text[second + 1].charCodeAt() == 32) ||
				(text[first].charCodeAt() == 10) ||
				(text[first].charCodeAt() == 32) ||
				(text[second].charCodeAt() == 10) ||
				(text[second].charCodeAt() == 32)
			) {
				continue;
			}

			if (text[first + 1] == text[second + 1]) {
				$("#out" + first).css("color", "red");
				$("#out" + (first + 1)).css("color", "red");
				$("#out" + second).css("color", "red");
				$("#out" + (second + 1)).css("color", "red");
			}
		}
	}
}

function changeSize() {
	fontSize = $("#rangeSize")[0].value;
	$("#showSize").html(fontSize);
	$("#inputText").css("font-size", fontSize + "px");
	$(".outputSpan").css("font-size", fontSize + "px");
}

function changeMode0() {
	mode = 0;
	styleClear();
	styleChange();
}

function changeMode1() {
	mode = 1;
	styleClear();
	styleChange();
}

function autoSta() {
	if ($("#autoStart")[0].checked) {
		run();
	}
}
