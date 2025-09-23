import axios from "axios";

describe("Random Node - Integração com random.org", () => {
  it("deve retornar um número válido da API real", async () => {
    const min = 1;
    const max = 10;
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    const response = await axios.get(url, { responseType: "text" });

    const randomNumber = parseInt(response.data.trim(), 10);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
    expect(Number.isInteger(randomNumber)).toBe(true);
  }, 10000); // aumenta timeout pra 10s pra evitar false negatives
});
