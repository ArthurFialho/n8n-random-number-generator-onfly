import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from "n8n-workflow";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: "file:random.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Generate true random numbers using Random.org",
    defaults: {
      name: "Random",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "True Random Number Generator",
            value: "generateRandom",
            description: "Generate a true random number using Random.org",
            action: "Generate a true random number",
          },
        ],
        default: "generateRandom",
      },
      {
        displayName: "Min",
        name: "min",
        type: "number",
        displayOptions: {
          show: {
            operation: ["generateRandom"],
          },
        },
        default: 1,
        description: "Minimum value (inclusive)",
        required: true,
      },
      {
        displayName: "Max",
        name: "max",
        type: "number",
        displayOptions: {
          show: {
            operation: ["generateRandom"],
          },
        },
        default: 100,
        description: "Maximum value (inclusive)",
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const operation = this.getNodeParameter("operation", i);

        if (operation === "generateRandom") {
          const min = this.getNodeParameter("min", i) as number;
          const max = this.getNodeParameter("max", i) as number;

          if (min > max) {
            throw new NodeOperationError(
              this.getNode(),
              "Min value cannot be greater than Max value"
            );
          }

          if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new NodeOperationError(
              this.getNode(),
              "Min and Max must be integers"
            );
          }

          const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

          const response = await this.helpers.request({
            method: "GET",
            url,
            json: false,
          });

          const randomNumber = parseInt(response.trim());

          returnData.push({
            json: {
              result: randomNumber,
              min,
              max,
              source: "random.org",
            },
            pairedItem: {
              item: i,
            },
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error instanceof Error ? error.message : String(error),
            },
            pairedItem: {
              item: i,
            },
          });
          continue;
        }
        throw error;
      }
    }

    return this.prepareOutputData(returnData);
  }
}
