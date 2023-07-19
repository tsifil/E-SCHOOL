<template>
    <div>
<div class="col-md-12 grid-margin transparent">
    <div class="row">
        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-tale">
            <div class="card-body" v-for='n in nbrRet' :key="n.nbrRet">
                <p class="mb-4">Nombre de retard</p>
                    <p class="fs-30 mb-2">{{n.ret}}</p>
                    </div>
        </div>
        </div>

        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-dark-blue">
            <div class="card-body" v-for='n in nbrJus' :key="n.absJus">
                <p class="mb-4">Absence justifiée</p>
                <p class="fs-30 mb-2">{{n.absJus}}</p>
            </div>
        </div>
        </div>

        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-light-danger">
            <div class="card-body" v-for='n in nbrInj' :key="n.absInj">
                <p class="mb-4">Absence injustifiée</p>
                <p class="fs-30 mb-2">
                    {{n.absInj}}
                </p>
            </div>
        </div>
        </div>
        </div>
        </div>
        <table class="table table-bordered">
                        <thead>
                          <tr bgcolor="skyblue">
                              <th>Date</th>
                              <th>Matiere</th>
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
</template>
<script>
import {HTTP} from '../../../../http-constants'
    export default{
        async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
        data(){
            return{
                idAs:this.$store.getters.getUserAnnee.idAs,
                numMatriculeParams:this.$route.params.numMatricule,
                listeAbsences:[],
                nbrInj:[],
                nbrJus:[],
                nbrRet:[]
            }
        },
        methods:{
            AfficherAbs(){
                HTTP.get(`/afficher/Absence/${this.idAs}/${this.numMatriculeParams}`)
                .then((response)=>{
                   if(response.data.msg404){
                      this.listeAbsences=''
                   }else if(response.data.msg200){
                      this.listeAbsences=response.data.msg200
                   }
                })
            },
            AbsInjustifiee(){
                HTTP.get(`/nombre/AbsenceInjustifiee/${this.idAs}/${this.numMatriculeParams}`)
                .then((response)=>{
                   this.nbrInj=response.data
                })
            },
            AbsJustifiee(){
                HTTP.get(`/nombre/AbsenceJustifiee/${this.idAs}/${this.numMatriculeParams}`)
                .then((response)=>{
                   this.nbrJus=response.data
                })
            },
            Retard(){
                HTTP.get(`/nombre/retard/${this.idAs}/${this.numMatriculeParams}`)
                .then((response)=>{
                   this.nbrRet=response.data
                })
            }
        },
        mounted(){
                this.AbsJustifiee()
                this.AfficherAbs()
                this.AbsInjustifiee()
                this.Retard()
            }
}
</script>