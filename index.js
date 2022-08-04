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

function roundToDecimalPlace(num, dec) {
	if (num === null) {
		return;
	}
	return parseFloat(num.toFixed(dec));	
}

var equationEl = document.querySelector(".equation");
var displayEl = document.querySelector(".output");

class CalcState {
	constructor() {
		this.firstTerm = null;
		this.secondTerm = null;
		this.operator = null;

	}
	setFirstTerm(num) {
		this.firstTerm = num
		displayEl.textContent = num;
	}
	setFirstTermToNumber() {
		this.firstTerm = parseFloat(this.firstTerm);
	}
	setSecondTerm(num) {
		this.secondTerm = num;
		equationEl.textContent = this.genEqString();
	}
	getFirstTerm() {
		return this.firstTerm;
	}
	getSecondTerm() {
		return this.secondTerm;
	}

	getOperator() {
		return this.operator;
	}
	setOperator(op) {
		this.operator = op;
		if (this.getSecondTerm() !== null) {
			equationEl.textContent = this.genEqString();
		} else {
			equationEl.textContent = ""
		}
	}

	isValidOperation() {
		if (this.getFirstTerm() != null && this.getSecondTerm() != null && this.getOperator() != null) {
			if (this.getFirstTerm() === 0 && this.getOperator() === "/") {
				alert("cant divide by 0");
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	genEqString() {
		return `${roundToDecimalPlace(this.getSecondTerm(), 5)} ${this.getOperator()}`;
	}

	reset() {
		this.setFirstTerm(null);
		this.setSecondTerm(null);
		this.setOperator(null);
	}
}

let calcState = new CalcState();

function clickNum(num) {
	let currentNum = calcState.getFirstTerm();
	if (currentNum === null || currentNum === "NaN" || currentNum === undefined) {
		currentNum = "";
	}
	currentNum = `${currentNum}${num}`;
	calcState.setFirstTerm(currentNum);
}

function clickOp(op) {
	if (calcState.getFirstTerm() !== null && calcState.getSecondTerm() !== null) {
		calcState.setFirstTermToNumber();
		let equals = roundToDecimalPlace(operate(calcState.getOperator(), calcState.getSecondTerm(), calcState.getFirstTerm()), 5);
		calcState.setSecondTerm(equals);
		calcState.setFirstTerm(null);
		calcState.setOperator(op);
	} else if (calcState.getFirstTerm() === null && calcState.getSecondTerm() && calcState.getOperator()) {
		calcState.setOperator(op);
	} else {
		calcState.setFirstTermToNumber();
		calcState.setSecondTerm(calcState.getFirstTerm());
		calcState.setFirstTerm(null);
		calcState.setOperator(op);
	}
}

document.querySelectorAll(".num").forEach(node => {
	node.addEventListener("click", () => {

		clickNum(parseInt(node.textContent))
	})
})
document.querySelectorAll(".op").forEach(node => {
	node.addEventListener("click", () => {
		clickOp(node.textContent);
	})
})
document.querySelector(".eq").addEventListener("click", () => {
	if (calcState.isValidOperation()) {
		calcState.setFirstTermToNumber();
		calcState.setFirstTerm(roundToDecimalPlace(operate(calcState.getOperator(), calcState.getSecondTerm(), calcState.getFirstTerm()), 5))
		calcState.setSecondTerm(null);
		calcState.setOperator(null);
	} else {
		return;
	}
})
document.querySelector(".dec").addEventListener("click", () => {
	if (String(calcState.getFirstTerm()).includes(".")) {
		return;
	} else {
		if (calcState.getFirstTerm() === null) {
			calcState.setFirstTerm(0 + ".");
		} else {
			calcState.setFirstTerm(calcState.getFirstTerm() + ".")
		}
	}
})
document.querySelector(".clear").addEventListener("click", () => {
	calcState.reset();
})
document.querySelector(".delete").addEventListener("click", () => {
	if (String(calcState.getFirstTerm()).length > 1 && String(calcState.getFirstTerm()) !== "null") {
		calcState.setFirstTerm(String(calcState.getFirstTerm()).slice(0, -1));
	} else {
		calcState.setFirstTerm(null);
	}
})