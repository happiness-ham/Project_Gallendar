import axios from "axios"

const checkUserId = (userid : string) => { // 요청메소드 + 요청정보
    return axios.get(`http://13.209.7.184:8080/members/checkId/${userid}`);
}

export default checkUserId;