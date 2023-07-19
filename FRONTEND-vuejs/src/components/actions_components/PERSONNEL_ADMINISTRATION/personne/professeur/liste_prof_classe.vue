<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <div class="row">
                    <div class="col-md-4">
                      <div class="form-group row">
                        <div class="col-sm-9">
                            <select v-model="idClasse" class="form-control">
                                <option disabled value="">-- Veuillez choisir la classe --</option>
                                <option v-for="c in classes" :key="c.id" :value="c.id">
                                    {{c.text}}
                                </option>  
                            </select>
                        </div>
                            <div class="col-sm-3">
                                <button class="btn btn-info mr-2" @click="Afficher()"><i class="ti-eye"></i></button>
                            </div>
                      </div>
                    </div>
            </div>

              <vs-table 
                search
                :max-items="descriptionItems[0]"
                pagination
                :data="listes"
                :description-items="descriptionItems"
                description-title="Enregistrements"
                description-connector="dans"
                description-body="Pages"
                id="table"
               >
                    <template slot="header">
                            <h3>
                                Profs/classe
                            </h3>
                    </template>
                    <template slot="thead">
                            <vs-th>Id</vs-th>
                            <vs-th>Nom et Prénom(s)</vs-th>
                            <vs-th>Classe de </vs-th>
                            <vs-th>Nom de la matière</vs-th>
                            <vs-th>Action</vs-th>
                     </template>

                    <template slot-scope="{data}" id='vs_td'>
                
                        <vs-tr :key="indextr" v-for="(tr,indextr) in data" >

                            <vs-td>{{data[indextr].idProf}}</vs-td>
                            <vs-td>{{data[indextr].nomPrenom}}</vs-td>
                            <vs-td>{{data[indextr].libelleClasse}}</vs-td>                           
                            <vs-td>{{data[indextr].nomMatiere}}</vs-td>
                            <vs-td>
                                <vs-button @click="Supprimer(data[indextr].idProf,data[indextr].idClasse,data[indextr].codemat)" color="red">
                                        Supprimer
                                </vs-button>
                            </vs-td>
                        </vs-tr>
                    </template>
              </vs-table>    
                    </div>
                 </div>
                </div>
            </div>            
          </div>
      </div>
    </div>
  </template>
  <script>
import {HTTP} from '../../../../../http-constants'
import NavHaut from '../../../includes/Menu_haut.vue'
import NavGauche from '../../../includes/Menu_gauche.vue'

    export default{
        components:{NavGauche,NavHaut},
        data(){
            return{
                listes:[],
                descriptionItems:[7,14,21],
                classes:[],
                idClasse:''
            }
        },
        methods:{
            ListeProfClasse(){
                HTTP.get('/edt/liste/ProfClasse').then((response)=>{
                    this.listes=response.data
                })
            },
            listeClasse(){
                HTTP.get('/professeur/listeClasse').then((response)=>{
                    this.classes = response.data.result
                })
            },
            Afficher(){
                const data={idClasse:this.idClasse}
                HTTP.post('/edt/liste/ProfClassePOST',data).then((response)=>{
                    this.listes=response.data    
                })
            },
            Supprimer(idProf,idClasse,codemat){
                console.log(idProf,idClasse,codemat)
               this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                    buttons:{
                             cancel:{text:"Annuler",value:false,visible:true,closeModal:true,className:""},
                             confirm:{text:"Ok",value:true,visible:true,closeModal:true,className:""}
                      }
                    }).then((willDelete)=> {
                        if(willDelete){
                                HTTP.delete(`/edt/effacer/profClasse/${idProf}/${idClasse}/${codemat}`)
                                .then(response=>{
                                    if(response.data.msg200){
                                        this.$swal(response.data.msg200,{icon:"success"}).then(()=>{
                                            window.location.href='/liste_Profs_classe'
                                        })
                                    }
                            }) 
                        }
                    })
            }
        },
        mounted(){
             this.ListeProfClasse()
             this.listeClasse()
        }
    }
</script>


