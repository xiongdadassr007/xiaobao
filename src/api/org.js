import path from './path';
import http from './http';
export default{
    // 请求所有机构
    all(){
        return http.get(path.org)
    }
}