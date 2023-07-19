import axios from "axios";

const url = 'http://localhost:2002'

export default{

    login(credentials){
        return axios
        .post(url+'/api/connecter_personnel_administration',credentials)
        .then(response => response.data)
    },
    anneeScoAdmin(credentials){
        return axios
        .post(url+'/api/annee_admin',credentials)
        .then(response => response.data)
    },
    getSecretContent(){
            return axios.get(url+'/api/secret-route_administrateur').then(response => response.data)
        }
}