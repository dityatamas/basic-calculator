class Calculator {
  constructor(historyOperand, resultOperand) {
    this.historyOperand = historyOperand
    this.resultOperand = resultOperand
    this.clear()
  }

  clear() {
    this.result = ''
    this.history = ''
    this.operator = undefined
  }

  delete() {
    this.result = this.result.toString().slice(0, -1)
  }

  percentage() {
    this.result = this.result.toString() / 100
  }

  appendNumber(number) {
    if (number === '.' && this.result.includes('.')) return
    this.result = this.result.toString() + number.toString()
  }

  chooseOperation(operator) {
    if (this.result === '') return
    if (this.history !== '') {
      this.compute()
    }
    this.operator = operator
    this.history = this.result
    this.result = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.history)
    const current = parseFloat(this.result)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operator) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.result = computation
    this.operator = undefined
    this.history = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.resultOperand.innerText =
      this.getDisplayNumber(this.result)
    if (this.operator != null) {
      this.historyOperand.innerText =
        `${this.getDisplayNumber(this.history)} ${this.operator}`
    } else {
      this.historyOperand.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-backspace]')
const allClearButton = document.querySelector('[data-clear]')
const percentButton = document.querySelector('[data-percentage]')
const historyOperand = document.querySelector('[data-history]')
const resultOperand = document.querySelector('[data-result]')

const calculator = new Calculator(historyOperand, resultOperand)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

percentButton.addEventListener('click', button => {
  calculator.percentage()
  calculator.updateDisplay()
})
