import axios from "axios";
// import dotenv from 'dotenv'
const userURL = "http://localhost:8000/user/";
const movieURL = "http://localhost:8000/movie/";


class postUsers {
    static userRating(params){
        return new Promise((resolve, reject) => {
            axios.post(userURL+"rating", {params}).then(
                result => {
                    resolve(result.data)
                }
            ).catch(err => reject(err));
        })
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            axios.get(userURL)
                .then(response => {
                    // console.log(response);
                    resolve(response.data.data)
                })
                .catch(error => reject(error));
        });
    }

    static getOneUser(_id) {
        return new Promise((resolve, reject) => {
            axios.get(userURL + _id)
                .then((result) => {
                    // console.log(result);
                    resolve(result.data.data);
                })
                .catch(err => reject(err));
        })
    }

    static createUser(data){
        return new Promise((resolve, reject) => {
            axios.post(userURL, data)
                .then((result) => {
                    // console.log(result);
                    resolve(result)
                })
                .catch(err => reject(err));
        })
    }

    static loginUser(email, password) {
        return new Promise((resolve, reject) => {
            axios.post(userURL+'signin', ({email,password}))
                .then((result) => {
                    // console.log(result);
                    resolve(result.data.data._id)
                })
                .catch(err => reject(err));
        })
    }
}

class apiMovie{
    static getAllMovie(params){
        return new Promise((resolve, reject) => {
            axios.get(movieURL +`?page=${params.page}&size=${params.size}`).then(
                result => {resolve(result.data)}
            ).catch(err => reject(err))
        })
    }
    static getRecommendation(params) {
        const id = params.id.id
        return new Promise((resolve, reject) => {
            axios.get(userURL+id +`/getRecommendation/?size=${params.size}`).then(
                result => {
                    // console.log(result.data);
                    resolve(result.data)
                }
            ).catch(err => reject(err))
        })
    }
}

export {
    postUsers,
    apiMovie,
}