class DataPythonInput {
    parent
    inputData
    nextPage

    constructor() {
        this.name = ""
        this.parent = "";
        this.inputData = ""
        this.nextPage = ""
    }

    addInputData(input_1, input_2, input_3) {
        if (this.inputData.trim() !== "") {
            if (input_2 && input_3) this.inputData += `[二]${input_1}[一]${input_2}[一]${input_3}`
            else this.inputData += `[二]${input_1}`
        } else {
            if (input_2 && input_3) this.inputData = `${input_1}[一]${input_2}[一]${input_3}`
            else this.inputData = input_1
        }
    }

    string() {
        return `${this.name}[三]${this.parent}[三]${this.inputData}[三]${this.nextPage}[四]`.replaceAll(" ", "空")
    }
}

module.exports = DataPythonInput;