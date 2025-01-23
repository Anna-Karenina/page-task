import { withQuery } from "@/utils/withQuery";
import { http } from "./http_config";

class Repository {
  getUsers(page: number = 1, limit: number = 10) {
    return http.get(
      withQuery('/users', { page, limit })
    ).then(resp => resp.data)

  }
}

export const repository = new Repository()
