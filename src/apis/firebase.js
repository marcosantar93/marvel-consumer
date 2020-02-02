import axios from "axios";

export default axios.create({
    baseURL: "https://marvel-consumer.firebaseio.com"
})