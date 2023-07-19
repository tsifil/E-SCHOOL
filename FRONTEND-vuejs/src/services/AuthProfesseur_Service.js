import axios from "axios";

const url = 'http://localhost:2002'

export default{
    creationcompteProf(credentials){
        return axios
        .post(url+'/api/creer_compte_prof',credentials)
        .then(response => response.data)
    },
    loginProf(credentials){
        return axios
        .post(url+'/api/connecter_prof',credentials)
        .then(response => response.data)
    },
    choixAnneeProf(credentials){
        return axios
        .post(url+'/api/choixAnneesco_prof',credentials)
        .then(response => response.data)
    },
    getSecretContent(){
        return axios.get(url+'/api/secret-route_prof').then(response => response.data)
    }
}