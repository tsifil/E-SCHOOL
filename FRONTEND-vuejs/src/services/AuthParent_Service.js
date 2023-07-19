import axios from "axios";

const url = 'http://localhost:2002'

export default{
    creationcompteParent(credentials){
        return axios
        .post(url+'/api/creer_compte_parent',credentials)
        .then(response => response.data)
    },
    loginParent(credentials){
        return axios
        .post(url+'/api/connecter_parentTuteur',credentials)
        .then(response => response.data)
    },
    choixAnneeParent(credentials){
        return axios
        .post(url+'/api/choixAnneesco_Parent',credentials)
        .then(response => response.data)
    },
    getSecretContent(){
        return axios.get(url+'/api/secret-route_parent').then(response => response.data)
    }
}