class Query:
    queryName : str
    valueName : str
    byType : str

    def __init__(self, dataInput: str):
        self.convert(dataInput)

    def convert(self, dataInput: str):
        splitData = dataInput.split("@");
        self.queryName = splitData[0]
        self.valueName = splitData[1]
        self.byType = splitData[2]

def convertInput(inputData: str):
    propertyQueries = []
    inputData = inputData.split(";");
    for property in inputData:
        propertyQuery = Query(property.strip());
        propertyQueries.append(propertyQuery);
    return propertyQueries;

example_input = "h3@name@text;img@avatar@src;p@position@text"
trying_input = convertInput(example_input)
for query in trying_input:
    print(query.queryName, query.valueName, query.byType)