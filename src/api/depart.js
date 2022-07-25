import path from './path';
import http from './http';
export default{
    // 请求所有牵头部门
    all(){
        return http.get(path.depart)
    }
}