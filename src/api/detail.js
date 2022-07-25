import path from "./path";
import http from "./http";
export default {
  one(id) {
    return http.get(path.detail + "/" + id);
  },
  all(data) {
    return http.post(
      //   path.query + `?page=${term.page}&size=${term.size}`,
      path.detail + `?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
      data
    );
  },
  add(data) {
    return http.post(path.detail, data);
  },
  edit(data, id) {
    return http.put(path.detail + "/" + id, data);
  },
  del(id) {
    return http.delete(path.detail + "/" + id);
  },
};
