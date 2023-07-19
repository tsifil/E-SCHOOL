import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    isAuthenticated: true,
    activePopup:false,
    isAddFamille:false,
    headers:[],
    stepData:{},
    idMembre:'',
    membre:{
      numProvisoire: '',
      numDefinitif: '',
      nom: '',
      prenoms: '',
      sexe: '',
      dateNais: '',
      lieuNais: '',
      status:'',
      tel: '',
      email: '',
      adresse: '',
      isPere: false,
      isMere: false,
      isEnfant: false,
      isChef: false,
      quartier: '',
      famille:''
    },
  },
  mutations: {
    enable(state){
      state.isAuthenticated = true
    },
    disable(state){
      state.isAuthenticated = false
    },
    enablePopup(state){
      state.activePopup = true
    },
    disablePopup(state){
      state.activePopup = false
    },
    enableAddFamille(state){
      state.isAddFamille = true
    },
    disableAddFamille(state){
      state.isAddFamille = false
    },
    setHeaders(state, new_header){
      state.headers = new_header
    },
    setStepData(state, data){
      state.stepData = data
    },
    setMembreFamille(state, membre){
      state.membre = membre
    },
    setDateNais(state, date){
      state.membre.dateNais = date
    }, 
    initId(state, val){
      state.idMembre = val
    },
    token(state, token){
      state.token = token
    }
  },
  actions: {
    startConnexion({commit}){
      commit('enable')
    },
    endConnexion({commit}){
      commit('disable')
    },
    openPopup({commit}){
      commit('enablePopup')
    },
    closePopup({commit}){
      commit('disablePopup')
    },
    turnOnAddFamille({commit}){
      commit('enableAddFamille')
    },
    turnOffAddFamille({commit}){
      commit('disableAddFamille')
    },
    setHeaders({commit}, new_header){
      commit('setHeaders', new_header)
    },
    setStepData({commit}, data){
      commit('setStepData', data)
    },
    setMembreFamille({commit}, membre){
      commit('setMembreFamille', membre)
    },
    setDateNais({commit}, date){
      commit('setDateNais', date)
    },
    initId({commit}, val){
      commit('initId', val)
    },
    token({commit}, token){
      commit('token', token)
    }
  },
  modules: {
    
  }
})
