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
               <h4 class="card-title">Editer</h4>
               
     <form class="forms-sample" 
            v-for="t in trimestre" 
            :key="t.idTrimestre" 
            @submit.prevent="modifier(t.libelle,t.dateDebut,t.dateFin)">

         <div class="form-group">
             <label>Libellé</label>
             <input v-model='t.libelle' class="form-control" readonly/>
         </div>
         <div class="form-group">
             <label>Date de début</label>
             <VueDatePicker
                         class="form-control"
                         format="YYYY-MM-DD"
                         :locale="locale"
                         @onClose="isVisible = false"
                         v-model="t.dateDebut"
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
                         v-model="t.dateFin"
                         min-date="1000-12-12"
             />
         </div>
         
         <input type="submit" value="Enregistrer la modification" class="btn btn-success mr-2"/>
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
             idTrimestre: this.$route.params.idTrimestre,
             trimestre:[],
             idAsParams : this.$route.params.idAs,
             idAs_actuelle:this.$store.getters.getUserAnnee.idAs,
             libelle:'1er Trimestre',
             dateDebut:new Date(),
             dateFin:new Date(),
             locale: {
             lang: 'fr', // or 'en', 'es', 'de',
             weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            },
         }
     },
     methods:{
        Editer(){
            HTTP.get(`/editer/trimestre/${this.idTrimestre}`).then((response)=>{
                this.trimestre = response.data
            })
        },        
        modifier(libelle,dateDebut,dateFin){
            const data = {
                 libelle:libelle,
                 dateDebut:dateDebut,
                 dateFin:dateFin,
                 idTrimestre:this.idTrimestre
             }

             HTTP.post('/modifierTrimestre',data).then((response)=>{
               if(response.data.msgFailed){
                       this.$swal(response.data.msgFailed,{icon:'error'})
               }else if(response.data.msg200){
                      this.$swal(response.data.msg200,{icon:'success'})
                  }
             })
         }
     },
     mounted(){
        this.Editer()
     }
 }
</script>


