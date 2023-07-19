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
                <form @submit.prevent="Modifier(l.telephone,l.idPers)" v-for="l in liste" :key="l.idContact">
                    <div class="form-group">
                          <label>Identifiant</label>
                          <input v-model="l.idPers" class="form-control" readonly/>
                    </div>
                    <div class="form-group">
                          <label>Nom et prénom(s)</label>
                          <input v-model="l.nomPrenom" class="form-control" readonly/>
                    </div>
                    <div class="form-group">
                        <label>Telephone</label>
                        <input type="number" class="form-control" v-model="l.telephone"/>
                    </div>
                    <input type='reset' class="btn btn-danger mr-2" value="Reinitialiser"/>
                    <input type="submit" class="btn btn-success mr-2" value="Enregistrer"/>
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
          liste:[],
          idContact:this.$route.params.idContact,
        }
    },
    methods:{
        Liste(){
                HTTP.get(`/editer/contact/${this.idContact}`).then((response)=>{
                     this.liste = response.data
                })
        },
        Modifier(telephone,idPers){
                const data = {
                    idContact:this.idContact,
                    telephone:telephone,
                    idPers:idPers
                }
                HTTP.post('/modifierContact',data).then((response)=>{
                    if(response.data.msg200){
                        this.$swal(response.data.msg200,{icon:'success'})
                        //this.$router.replace({name:'VoirContact',params:idPers})
                    }
                })
        }
    },
    mounted(){
        this.Liste()
    }
}
</script>

