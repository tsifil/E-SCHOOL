<template>
  <div class="container-scroller">
    <NavHaut/>
    <div class="container-fluid page-body-wrapper">
      <NavGauche/>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
           
            <div class="col-md-12 grid-margin transparent">
              <div class="row">
                <div class="col-md-3 mb-4 stretch-card transparent">
                  <div class="card card-tale">
                    <div class="card-body">
                      <p class="mb-4">ELEVES</p>
                      <p class="fs-30 mb-2">{{nbrEleve}}</p>
                    </div>
                  </div>
                </div>

              
                 <div class="col-md-3 mb-4 stretch-card transparent">
                 
                  <div class="card card-light-danger">
                    <div class="card-body">
                      <p class="mb-4">ELEVES INSCRITS</p>
                      <p class="fs-30 mb-2">{{nbrEleveInscrit}}</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 mb-4 stretch-card transparent">
                  <div class="card card-light-blue">
                    <div class="card-body">
                      <p class="mb-4">PROFESSEURS</p>
                      <p class="fs-30 mb-2">{{nbrProf}}</p>
            
                    </div>
                  </div>
                </div>

                <div class="col-md-3 mb-4 stretch-card transparent">
                  <div class="card card-dark-blue">
                    <div class="card-body">
                      <p class="mb-4">CLASSES</p>
                      <p class="fs-30 mb-2">{{nbrClasse}}</p>
                 
                    </div>
                  </div>
                </div>

              </div>
              
            </div>
          </div>

      <div class="row">
        <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                    <canvas id='myChart' width="100" height="70"></canvas>
                   
                </div>
              </div>
          </div>
         <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">


              <vs-table 
                :max-items="descriptionItems[0]"
                pagination
                :data="nbrs"
                :description-items="descriptionItems"
                description-title="Enregistrements"
                description-connector="dans"
                description-body="Pages"
                class="table table-hover"
               >
                    
                    <template slot="thead">
                            <vs-th>Classe</vs-th>
                            <vs-th>Total d'élève</vs-th>
                     </template>

                    <template slot-scope="{data}" id='vs_td'>
                
                        <vs-tr :key="indextr" v-for="(tr,indextr) in data" >
                            <vs-td >{{data[indextr].libelleClasse}}</vs-td>
                            <vs-td>{{data[indextr].total}}</vs-td>
                            <br><br><br><br>
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
  </div>
</template>

<script>

import NavHaut from '../includes/Menu_haut.vue'
import NavGauche from '../includes/Menu_gauche.vue'
import {HTTP} from '../../../http-constants'
import Chart from 'chart.js'

export default {
  components:{NavHaut,NavGauche},
  async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
  data(){
    return{
       nbrs:[],
       idAs:this.$store.getters.getUserAnnee.idAs,
       nbrEleve:'',
       nbrEleveInscrit:'',
       nbrProf:'',
       nbrClasse:'',
       descriptionItems:[4,8,12]
    }
  },
  methods:{
   
    NombreClasse(){
        HTTP.get('/nombre/classe')
        .then((response)=>{
          this.nbrClasse=response.data.nbrClasse
        })
    },
    NombreProf(){
      HTTP.get('/nombre/professeur').then((response)=>{
        this.nbrProf=response.data.nbrProf
      })
    },
    NombreEleve(){
        HTTP.get('/nombreEleve').then((response)=>{
            this.nbrEleve=response.data.nbrEleve
        })
    },
    NombreEleveInscrit(){
        HTTP.get(`/nombre/eleveIncsrit/${this.idAs}`)
        .then((response)=>{
            this.nbrEleveInscrit=response.data.nbrEleveInscrit
        })
    },
    NombreEleveClasse(){
          HTTP.get(`/nombreEleve/classe/${this.idAs}`).then((response)=>{
            this.nbrs=response.data
        })
    }
  },
  mounted(){

    HTTP.get(`/platGraph/${this.idAs}`).then((response)=>{
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx,{
      type:'bar',
      data:{
        labels:['Fille','Garcon'],
        datasets:[
          {
            label:'# eleves',
            data:[response.data.feminin,response.data.masculin],
            backgroundColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        
      ],
      borderWidth: 1,
          }]
      },
      options:{
        scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
        }
      }
    }

    )
    myChart

    })

    this.NombreEleveClasse()
    this.NombreEleve()
    this.NombreEleveInscrit()
    this.NombreProf()
    this.NombreClasse()
  }
}

</script> 
