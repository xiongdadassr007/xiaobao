import path from "./path";
import http from "./http";
export default {
  one(id) {
    return http.get(path.query + "/" + id);
  },
  all(data) {
    return http.post(
      //   path.query + `?page=${term.page}&size=${term.size}`,
      path.query + `?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
      data
    );
  },
  add(data) {
    return http.post(path.query, data);
  },
  edit(data, id) {
    return http.put(path.query + "/" + id, data);
  },
  del(id) {
    return http.delete(path.query + "/" + id);
  },
};
