import type { PostAuth } from "@/components/Auth/Api/types/PostAuth";
import type {
  ConfirmCode,
  HTTPImitationError,
} from "@/components/Auth/Api/types/interfeces";
import { UserData } from "@/mocData/UserData";

export async function fetchAuth(data: PostAuth): Promise<ConfirmCode> {
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

  if (
    data.password === UserData.password &&
    data.username === UserData.username
  )
    return { confirmCode: "123456" };

  throw {
    message: "Не верный логин или пароль",
    code: 403,
  } as HTTPImitationError;
}
