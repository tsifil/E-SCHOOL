o<template>
   
    <div class="container-scroller">
  
      <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">           
            <div class="row">
                  
          <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Editer</h4>
                  <form v-for="a in anneeScolaire" :key="a.idAs" @submit.prevent="Modifier(a.libelle,a.dateDebut,a.dateFin)">
                    <div class="form-group">
                      <label>Libellé</label>
                      <input type="text" class="form-control" v-model="a.libelle" placeholder="Libelle">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Date de début</label>
                      <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="a.dateDebut"
                            min-date="1000-12-12"/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Date de fin</label>
                      <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="a.dateFin"
                            min-date="1000-12-12"/>
                      
                    </div>
                    <button type="submit" class="btn btn-info mr-2">Enregistrer la modification</button>
                    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
                  </form>
                </div>
              </div>
            </div>

                  </div>
                </div>
              </div>
              </div>
          </div>
        
         </template>
  
  
  <script>
  import {HTTP} from '../../../../http-constants'
  import NavHaut from '../../includes/Menu_haut.vue'
  import NavGauche from '../../includes/Menu_gauche.vue'
  
  export default{
       components:{NavHaut,NavGauche},
       async created(){
          if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                this.$router.push('/connecter_personnel_administration')
          }
      },
        data(){
            return{
                idAs:this.$route.params.idAs,
                anneeScolaire:'',
                locale: {
                lang: 'fr', // or 'en', 'es', 'de',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            },
                    }
        },
        methods:{
            Annee(){
                HTTP.get(`/editer/anneescolaire/${this.idAs}`).then((response)=>{
                    this.anneeScolaire = response.data
                })
            },
            Modifier(libelle,dateDebut,dateFin){
                const data = {
                    libelle:libelle,
                    dateDebut:dateDebut,
                    dateFin:dateFin,
                    idAs:this.idAs
                }
                HTTP.post('/modifier_anneeScolaire',data).then((response)=>{
                    if(response.data.msgDup404){
                        this.$swal(response.data.msgDup404,{icon:'error'})
                    }else if(response.data.msg200){
                         this.$router.replace({ name: "anneeScolaireListe"}) 
                         this.$swal(response.data.msg200,{icon:'success'})
                    }
                })
            }
        },
        mounted(){
            this.Annee()
        }
    }
</script>
