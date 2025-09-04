import axios from "axios";

const mockApi = {
  SBER: [
    { holder: "Правительство России", share_percent: "50.000" },
    { holder: "Правительство России", share_percent: "50.000" },
    { holder: "Американские инвесторы", share_percent: "33.000" },
    { holder: "Американские инвесторы", share_percent: "33.000" },
    { holder: "Другие акционеры", share_percent: "6.360" },
    { holder: "Другие акционеры", share_percent: "6.360" },
    { holder: "Европейские инвесторы", share_percent: "6.240" },
    { holder: "Европейские инвесторы", share_percent: "6.240" },
    { holder: "Физ.лица резиденты", share_percent: "2.900" },
    { holder: "Физ.лица резиденты", share_percent: "2.900" },
    { holder: "Юр.лица резиденты", share_percent: "1.500" },
    { holder: "Юр.лица резиденты", share_percent: "1.500" },
  ],
};

export async function fetchInfo() {
  try {
    const res = await axios.get(
      "https://stage.invest-era.ru/api/shareholders/SBER/",
    );
    return res.data;
  } catch (error) {
    console.warn("API недоступно, используем mock", error);
    return mockApi;
  }
}
