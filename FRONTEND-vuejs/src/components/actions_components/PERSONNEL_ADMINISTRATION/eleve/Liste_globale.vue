<template>
    <div>
       <label>Classe*</label>
       <select v-model="idClasse">
            <option disabled value="">Veuillez Choisir la classe</option>
            <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                {{l.libelleClasse}}
            </option>
        </select>
        <button @click="affichage='classe'">Voir</button>
       <label>Date d'inscription</label>
       <input type="date" v-model="dateInscription" @keyup.exact="affichage='dateInscr'"/>
       <br><br>
       <table border="1">
          <th>N</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Nom d'usage</th>
          <th>N matricule</th>
          <!--th>Photo</th-->
          <th>Classe</th>
          <th>Date d'inscription</th>
          <th>Actions</th>
          <tr v-for="(lg,i) in TableauInscriptionFiltrer" :key="lg.numMatricule">
             <td>{{i+1}}</td>
             <td>{{ lg.nom }}</td>
             <td>{{ lg.prenom }}</td>
             <td>{{ lg.nomUsage }}</td>
             <td>{{ lg.sexe == 'Masculin' ? lg.numMatricule+'G' : lg.numMatricule+'F'}}</td>
             <td>{{ lg.libelleClasse }}</td>
             <td>{{ moment(lg.dateInscription).format('YYYY/MM/DD') }}</td>
             <td><router-link :to="{name:'DetailEleveInscrit',params:{numMatricule:lg.numMatricule,idAs:lg.idAs,idClasse:lg.idClasse}}">Detail</router-link></td>
            </tr>
       </table>
    </div>
</template>

<script>
import {HTTP} from '../../../../http-constants'
import moment from 'moment'
export default{
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
    data(){
        return{
            ListeIncrit:[],
            idAs:this.$store.getters.getUserAnnee.idAs,
            listeClasse:[],
            idClasse:'',
            dateInscription:moment().format("YYYY-MM-DD"),
            affichage:''
        }
    },
    methods:{
        ListeGlobale(){
            HTTP.get(`/listeGlobale/${this.idAs}`).then((response)=>{
                this.ListeIncrit = response.data
                this.affichage = ''
            })
        },
        ListeParClasse(){
            HTTP.get(`/listeParClasse/${this.idAs}/${this.idClasse}`).then((response)=>{
                 //this.listeParClasse = response.data
                 this.ListeIncrit = response.data
                 this.affichage = ''
            })
        },
        ListeClasse(){
                 
                 HTTP.get('/listeClasse').then((response)=>{
                    this.listeClasse = response.data
                 })
            }
    },
    mounted(){
        this.ListeGlobale()
        this.ListeClasse()         
    },
    computed:{
        TableauInscriptionFiltrer(){
            if(this.affichage === "classe"){
                return this.ListeParClasse()
                 //return this.ListeIncrit
            }/*else if(this.affichage === "dateInscr"){

            }*/else{
                return this.ListeIncrit
            }
        }
    }
}
</script>


<style>
#img{
    height: 30px;
    width: 20%
}
</style>