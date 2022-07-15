import path from './path';
import http from './http';
export default{
    one(id){
        return http.get(path.getTaskInfo+'/'+id);
    },
    all(term={}){
        return http.post(path.getTaskInfo+`?page=${term.page}&size=${term.size}`, {data:term})
    },
    add(data){
        return http.post(path.getTaskInfo,data);
    },
    edit(data,id){
        return http.put(path.getTaskInfo+'/'+id,data)
    },
    del(id){
        return http.delete(path.getTaskInfo+'/'+id)
    }
}