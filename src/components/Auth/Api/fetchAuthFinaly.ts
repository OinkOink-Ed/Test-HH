import { confirmData } from "@/mocData/ConfirmData";
import type {
  HTTPImitationError,
  Token,
} from "@/components/Auth/Api/types/interfeces";
import type { PostConfirm } from "@/components/Auth/Api/types/PostConfirm";

export async function fetchAuthFinaly(data: PostConfirm): Promise<Token> {
  const random = Math.random();

  //Задержка имитирует запрос
  await new Promise((resolve) => setTimeout(resolve, 500));

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

  //Отдавать решил упрощенные объекты без структуры response от сервера, в том числе и ошибки

  if (data.confirm === confirmData.code) return { token: "123456789" };

  throw {
    message: "Не верный код подтверждения",
    code: 403,
  } as HTTPImitationError;
}
