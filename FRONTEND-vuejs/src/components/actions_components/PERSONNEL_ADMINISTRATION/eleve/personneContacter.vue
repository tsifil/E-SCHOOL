<template>
    <div>
        <br><br>
        <form v-for="i in infoPersonne" :key="i.idPers">
            <label>Nom et Prénom(s) :   {{(i.sexe=='Masculin')?'Mr '+ i.nomPrenom : 'Mme ' + i.nomPrenom}}</label>
            <hr>
            <br>
            <label>Profession :       {{i.profession}}</label>
            <hr>
            <br>
            <label>Adresse :          {{i.adresse}}</label>
            <hr>
            <br>
            <label>Contact  :       {{i.tel}}</label>
        </form>
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
                infoPersonne:[]
            }
        },
        methods:{
            Personne(){
                HTTP.get(`/personne/contacterUrgence/${this.idAs}/${this.numMatriculeParams}`)
                .then((response)=>{
                    this.infoPersonne=response.data
                })
            }
        },
        mounted(){
            this.Personne()
        }
    }
</script>