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

class CalcState {
	constructor() {
		this.firstTerm = null;
		this.secondTerm = null;
		this.operator = null;

	}
	setFirstTerm(num) {
		this.firstTerm = num
	}
	setSecondTerm(num) {
		this.secondTerm = num;
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
	}

	isValidOperation() {
		if (this.getFirstTerm() != null && this.getSecondTerm() != null && this.getOperator() != null) {
			return true;
		} else {
			return false;
		}
	}
}

let calcState = new CalcState();

function clickNum(num) {
	console.log(num)
	let currentNum = calcState.getFirstTerm();
	if (currentNum === null || currentNum === "NaN" || currentNum === undefined) {
		currentNum = 0;
	}
	currentNum = currentNum * 10 + num;
	calcState.setFirstTerm(currentNum);
}

function clickOp(op) {
	if (calcState.getFirstTerm() !== null && calcState.getSecondTerm() !== null) {
		let equals = operate(op, calcState.getSecondTerm(), calcState.getFirstTerm());
		calcState.setSecondTerm(equals);
		calcState.setFirstTerm(null);
	} else {
		calcState.setSecondTerm(calcState.getFirstTerm());
		calcState.setFirstTerm(null);
		calcState.setOperator(op);
	}
}

document.querySelectorAll(".num").forEach(node => {
	node.addEventListener("click", () => {

		clickNum(parseInt(node.textContent))
		console.log(calcState);
	})
})
document.querySelectorAll(".op").forEach(node => {
	node.addEventListener("click", () => {
		clickOp(node.textContent);
		console.log(calcState);
	})
})
document.querySelector(".eq").addEventListener("click", () => {
	if (calcState.isValidOperation()) {
		calcState.setFirstTerm(operate(calcState.getOperator(), calcState.getSecondTerm(), calcState.getFirstTerm()))
		calcState.setSecondTerm(null);
		calcState.setOperator(null);
		console.log(calcState)
	} else {
		return;
	}
})
