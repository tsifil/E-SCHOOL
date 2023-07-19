<template>
       <div class="container-scroller">
       <NavHaut/>

        <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
           
            <div class="row">
                      
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Nouveau Trimestre</h4>
                  
        <form class="forms-sample" @submit.prevent="enregistrer()">
            <div class="form-group">
                <label>Libellé</label>
                <select v-model='libelle'  class="form-control">
                    <option value="" disabled>Veuillez choisir le trimestre</option>
                    <option value="1er Trimestre">1er Trimestre</option>
                    <option value="2ème Trimestre">2ème Trimestre</option>
                    <option value="3ème Trimestre">3ème Trimestre</option>
                </select>
            </div>
            <div class="form-group">
                <label>Date de début</label>
                <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="dateDebut"
                            min-date="1000-12-12"
                />
            </div>            
            <div class="form-group">
                <label>Date de fin</label>
                <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="dateFin"
                            min-date="1000-12-12"
                />
            </div>
            
            <input type="submit" value="Enregistrer" class="btn btn-success mr-2"/>
            <a @click="$router.go(-1)" class="btn btn-light">Retour</a>

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
        data(){
            return{
                idAsParams : this.$route.params.idAs,
                idAs_actuelle:this.$store.getters.getUserAnnee.idAs,
                libelle:'1er Trimestre',
                dateDebut:new Date(),
                dateFin:new Date(),
                locale: {
                lang: 'fr', // or 'en', 'es', 'de',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], // you can surcharge weekDays too
               },
            }
        },
        methods:{
           
            enregistrer(){
                const data = {
                    libelle: this.libelle,
                    dateDebut: this.dateDebut,
                    dateFin: this.dateFin,
                    idAs: this.idAsParams
                }
                
                HTTP.post('/trimestre',data).then((response)=>{
                  if(response.data.msgFailed){
                          this.$swal(response.data.msgFailed,{icon:'error'})
                  }else if(response.data.msg200){
                          if(this.idAsParams==this.idAs_actuelle){
                              this.$router.replace({name:'anneeScolaireListe'})
                              this.$swal(response.data.msg200,{icon:'success'})
                          }else{
                              this.$router.replace({name:'trimestre',params:{anneeScolaire:this.idAsParams}})
                              this.$swal(response.data.msg200,{icon:'success'})
                          }
                     }
                })
            }
        }
    }
</script>




<!--template>
    <div>
        <form @submit.prevent="enregistrer()">
            <label>Libellé</label>
            <br>
            <select v-model='libelle'>
                <option value="" disabled>Veuillez choisir le trimestre</option>
                <option value="1er Trimestre">1er Trimestre</option>
                <option value="2ème Trimestre">2ème Trimestre</option>
                <option value="3ème Trimestre">3ème Trimestre</option>
            </select>
            <br>
            <label>Date de début</label>
            <input type="date" v-model="dateDebut"/>
            <br>
            <label>Date de fin</label>
            <input type="date" v-model="dateFin"/>
            <br>
            <input type="submit" value="Enregistrer"/>
        </form>
    </div>
</template>

<script>
import {HTTP} from '../../../../http-constants'

export default {
    data(){
        return{
            idAsParams : this.$route.params.idAs,
            idAs_actuelle:this.$store.getters.getUserAnnee.idAs,
            libelle:'',
            dateDebut:new Date(),
            dateFin:new Date(),
        }
    },
    methods:{
        enregistrer(){
                const data = {
                    libelle: this.libelle,
                    dateDebut: this.dateDebut,
                    dateFin: this.dateFin,
                    idAs: this.idAsParams
                }
                HTTP.post('/trimestre',data).then((response)=>{
                    console.log(response)
                    if(this.idAsParams==this.idAs_actuelle){
                        this.$router.replace({name:'anneeScolaireListe'})
                    }else{
                        this.$router.replace({name:'trimestre',params:{anneeScolaire:this.idAsParams}})
                    }
                })
            }
    }
}
</script-->