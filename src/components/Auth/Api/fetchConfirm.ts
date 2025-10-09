import type { ConfirmCode } from "@/components/Auth/Api/types/interfeces";

export async function fetchConfirm(): Promise<ConfirmCode> {
  const random = Math.random();

  //Задержка имитирует запрос
  await new Promise((resolve) => setTimeout(resolve, 200));

  //Имитация некоторых ошибок от сервера через рандомайз
  if (random < 0.05) {
    throw new Error("Network Error: Failed to fetch");
  } else if (random < 0.08) {
    throw {
      message: "Internal Server Error",
      code: 500,
    };
  } else if (random < 0.11) {
    throw {
      message: "Service Unavailable",
      code: 503,
    };
  } else if (random < 0.14) {
    throw {
      message: "Bad request",
      code: 400,
    };
  }
  return { confirmCode: "123456" };
}
