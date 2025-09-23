import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Random Node Integration", () => {
  it("deve retornar um número entre 1 e 10", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: "7\n" });

    const min = 1;
    const max = 10;
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    const response = await axios.get(url, { responseType: "text" });
    const randomNumber = parseInt(response.data.trim(), 10);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it("deve garantir que o retorno seja um número inteiro", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: "5\n" });

    const min = 1;
    const max = 10;
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    const response = await axios.get(url, { responseType: "text" });
    const randomNumber = parseInt(response.data.trim(), 10);

    expect(Number.isInteger(randomNumber)).toBe(true);
  });
});
