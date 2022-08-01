function add(num1, num2) {
	return num1 + num2;
}

function sub(num1, num2) {
	return num1 - num2;
}

function mul(num1, num2) {
	return num1 * num2;
}

function div(num1, num2) {
	return num1 / num2;
}

function operate(op, num1, num2) {
	switch (op) {
		case "+":
			return add(num1, num2);
		case "-":
			return sub(num1, num2);
		case "*":
			return mul(num1, num2);
		case "/":
			return div(num1, num2);
	}
}

var eqArr = [];
var currNum = 0;

function updateEqText() {
	let eqString = ""
	eqArr.forEach(el => {
		eqString += " ";
		eqString += el;
	})
	document.querySelector(".equation").textContent = eqString;
}

function updateDisplay(num) {
	document.querySelector(".output").textContent = num;
}

function pressNum(num) {
	currNum = (currNum * 10) + num;
	updateDisplay(currNum);
}

function pressOp(op) {
	if (currNum != null) {
		eqArr.push(currNum);
		eqArr.push(op);
		updateEqText();
	} else  {
		eqArr.push(op);
		updateEqText();
	}
	currNum = null;
}
function solve() {
	let runningSum = eqArr[0];
	let index = 0;
	while (index < eqArr.length - 1) {
		console.log(operate(eqArr[index + 1], runningSum, eqArr[index + 2]))
		runningSum = operate(eqArr[index + 1], runningSum, eqArr[index + 2]);
		index += 2;
	}
	return runningSum;
}

document.querySelectorAll(".num").forEach(node => {
	node.addEventListener("click", () => {
		pressNum(parseInt(node.textContent))
	})
})
document.querySelectorAll(".op").forEach(node => {
	node.addEventListener("click", () => {
		pressOp(node.textContent);
	})
})
document.querySelector(".eq").addEventListener("click", () => {
	eqArr.push(currNum);
	console.log(eqArr);
	let newNum = solve();
	updateDisplay(newNum);
	eqArr = [newNum];
	updateEqText();
	currNum = null;
})
