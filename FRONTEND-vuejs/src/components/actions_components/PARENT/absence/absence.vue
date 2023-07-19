<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">

                  <div class="row">

                      <div class="col-md-4">
                              <div class="form-group row">
                                <label class="col-sm-6 col-form-label">Nom d'élève</label>
                                <div class="col-sm-12">
                                  <selection v-model="numMatricule" :options="listeEnfant" :settings="{width:'100%'}"></selection>
                                </div>
                              </div>
                      </div>                          
                      </div>
                      <button @click="AfficherAbs()" class="btn btn-info mr-2">Voir l'absence</button>
                  </div>
              </div>
            </div>
        </div>
        
        <div class="col-lg-12 grid-margin stretch-card" v-if="listeAbsences!=''">
                <div class="card">
                  <div class="card-body">

<div class="col-md-12 grid-margin transparent">
    <div class="row">
        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-tale">
            <div class="card-body" v-for="n in nbrRet" :key="n.nbrRet">
                <p class="mb-4">Nombre de retard</p>
                    <p class="fs-30 mb-2">{{n.ret}}</p>
                    </div>
        </div>
        </div>

        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-dark-blue">
            <div class="card-body" v-for="n in nbrJus" :key="n.absJus">
                <p class="mb-4">Absence justifiée</p>
                    <p class="fs-30 mb-2">{{n.absJus}}</p>
                    </div>
        </div>
        </div>

        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-light-danger">
            <div class="card-body" v-for="n in nbrInj" :key="n.absInj">
                <p class="mb-4">Absence injustifiée</p>
                <p class="fs-30 mb-2">{{n.absInj}}</p>
            </div>
        </div>
        </div>

        </div>
        </div>

                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr bgcolor="skyblue">
                              <th>Date</th>
                              <th>Matière</th>
                              <th>Type d'absence</th>
                              <th>Etat</th>
                              <th>Trimestre</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in listeAbsences" :key="l.idAbsence">
                                <td>{{moment(l.dateAbs).format("YYYY-MM-DD")}}</td>   
                                <td>{{l.nomMatiere}}</td>   
                                <td>{{l.typeAbsence}}</td>   
                                <td>{{(l.motif=='')?'INJUSTIFIEE':'JUSTIFIEE / ' + ' ' + 'Motif :' + l.motif}}</td>   
                                <td>{{l.libelle}}</td>   
                           </tr>
                        </tbody>
                      </table>
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
import NavHaut from '../../includes/parent/Menu_haut.vue'
import NavGauche from '../../includes/parent/Menu_gauche.vue'
    export default{
        components:{NavHaut,NavGauche},
        async created(){
                    if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire) {
                            this.$router.push('/')
                    }else{
                        this.nomUsage = this.$store.getters.getParent.nomUsage
                        this.annee_scolaire = this.$store.getters.getAnneeSco.libelle
           }
        },
        data(){
            return{
                idAs:this.$store.getters.getAnneeSco.idAs,
                idPers:this.$store.getters.getParent.idPers,
                listeEnfant:[],
                listeAbsences:[],
                numMatricule:'',
                nbrInj:[],
                nbrJus:[],
                nbrRet:[]
            }
        },
        methods:{
            Enfant(){
                HTTP.get(`/parent/listeEnfant/${this.idAs}/${this.idPers}`)
                .then((response)=>{
                    this.listeEnfant = response.data.result
                    this.numMatricule = response.data.numMatricule
                })
            },
            NombreRetard(){
              const data={idAs:this.idAs,numMatricule:this.numMatricule}
                HTTP.post('/nombre/retard',data)
                .then((response)=>{
                   this.nbrRet=response.data
                })
            },
            AbsInjustifiee(){
               const data={idAs:this.idAs,numMatricule:this.numMatricule}
                HTTP.post('/nombre/AbsenceInjustifiee',data)
                .then((response)=>{
                   this.nbrInj=response.data
                })
            },
            AbsJustifiee(){
                const data={idAs:this.idAs,numMatricule:this.numMatricule}
                HTTP.post('/nombre/AbsenceJustifiee',data)
                .then((response)=>{
                   this.nbrJus=response.data
                })
            },
            AfficherAbs(){
                const data = {idAs:this.idAs,numMatricule:this.numMatricule  }
                HTTP.post('/afficher/Absence',data).then((response)=>{
                   if(response.data.msg404){
                      this.listeAbsences=''
                   }else if(response.data.msg200){
                      this.listeAbsences=response.data.msg200
                      this.AbsInjustifiee()
                      this.AbsJustifiee()
                      this.NombreRetard()
                   }
                })
            },
        },
        mounted(){
            this.Enfant()
        }
    }
</script>