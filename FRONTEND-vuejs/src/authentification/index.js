import Vue from "vue";
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const getDefaultState = () => {
    return{
      /* Admin START */
      token:'',
      user:{},
      tokenAnneeAdmin:'',
      userAnnee:{},
      /* Admin END */
      /* Parent START */
      tokenParent:'',
      parent:{},
      tokenAnneSco:'',
      anneeSco:{},
      /* Parent END */
      /* Prof START */
      tokenProf:'',
      prof:{},
      tokenAnneeProf:'',
      profAnnee:{}
    }
}
export default new Vuex.Store({
    strict:true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters:{
        /** ADMIN **/
        isLoggedIn: 
            state => {
                return state.token
            },
            getUser: state => {
                return state.user
            },
        isChoiceAnneeAdmin:
            state => {
                return state.tokenAnneeAdmin
            },
        getUserAnnee: state => {
                return state.userAnnee
            },
            /** PARENT */
        isLoggedInParent:
            state => {
                return state.tokenParent
            },
            getParent: state => {
                return state.parent
            },
        isAnneeScolaire:
            state => {
                return state.tokenAnneSco
            },
            getAnneeSco: state => {
                return state.anneeSco
          },
          /** PROFESSEUR */
          isLoggedInProf:
            state => {
                return state.tokenProf
            },
          getProf: state => {
            return state.prof
          },
          isAnneeScolaireProf:
            state => {
                return state.tokenProf
            },
          getAnneeScoProf: state => {
            return state.profAnnee
          }
},
mutations: {
        /** ADMIN */
        SET_TOKEN: (state,token) => {
            state.token = token;
        },
        SET_USER: (state,user) => {
            state.user = user
        },
        SET_TOKEN_ANNEE_ADMIN: (state,tokenAnneeAdmin) =>{
             state.tokenAnneeAdmin = tokenAnneeAdmin
        },
        SET_USER_ANNEE: (state,userAnnee) => {
            state.userAnnee = userAnnee
        },
        /*** PARENT */
        SET_TOKENPARENT: (state,tokenParent) => {
            state.tokenParent = tokenParent;
        },
        SET_PARENT: (state,parent) => {
            state.parent = parent
        },
        SET_TOKEN_ANNEE_SCO: (state,tokenAnneSco) => {
            state.tokenAnneSco = tokenAnneSco
        },
        SET_ANNEE_SCO: (state,anneeSco) => {
            state.anneeSco = anneeSco
        },
        /** PROFESSEUR */
        SET_TOKENPROF: (state,tokenProf) => {
            state.tokenProf = tokenProf;
        },
        SET_PROF:(state,prof) => {
            state.prof = prof
        },
        SET_TOKEN_ANNEE_PROF: (state,tokenAnneeProf) => {
            state.tokenAnneeProf = tokenAnneeProf
        },
        SET_ANNEE_PROF: (state,profAnnee) => {
            state.profAnnee = profAnnee
        },
        /** DECONNEXION */
        RESETPROFESSEUR:(state) => {
            Object.assign(state,{"tokenProf":"","prof":{},"tokenAnneeProf":"","profAnnee":{}})
        },
        RESETPARENT:(state) => {
             Object.assign(state,{"tokenParent":"","parent":{},"tokenAnneSco":"","anneeSco":{}})
        },
        RESET:(state) => {
             Object.assign(state,{"tokenAnneeAdmin":"","userAnnee":{},"token":"","user":{}})
        },
    },
    actions:{
        /** ADMINISTRATEUR  */
        login: ({ commit }, {token,user}) => {
            commit('SET_TOKEN',token);
            commit('SET_USER',user)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        anneeScoAdmin: ({commit}, {tokenAnneeAdmin,userAnnee}) => {
            commit('SET_TOKEN_ANNEE_ADMIN',tokenAnneeAdmin);
            commit('SET_USER_ANNEE',userAnnee);
            Axios.defaults.headers.common['Authorization'] = `Bearer ${tokenAnneeAdmin}`;
        },
        /** PARENT */
        loginParent: ({ commit }, {tokenParent,parent}) => {
            commit('SET_TOKENPARENT',tokenParent)
            commit('SET_PARENT',parent)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${tokenParent}`;
        },
        anneeScoParent: ({ commit }, {tokenAnneSco,anneeSco}) => {
            commit('SET_TOKEN_ANNEE_SCO',tokenAnneSco);
            commit('SET_ANNEE_SCO',anneeSco)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${tokenAnneSco}`;
        },
        /** PROFESSEUR */
        loginProf: ({ commit }, {tokenProf,prof}) => {
            commit('SET_TOKENPROF',tokenProf)
            commit('SET_PROF',prof)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${tokenProf}`;
        },
        anneeScoProf:( {commit },{tokenAnneeProf,profAnnee}) => {
            commit('SET_TOKEN_ANNEE_PROF',tokenAnneeProf);
            commit('SET_ANNEE_PROF',profAnnee)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${tokenAnneeProf}`;
        },
        /** DECONNEXION */
        logoutProfesseur:({commit}) => {
            commit('RESETPROFESSEUR')
        },
        logoutParent:({commit}) => {
            commit('RESETPARENT')
        },
        logout:({commit}) => {
            commit('RESET')
        }
    }
});