<template>
    <div>
        <nouveauVue/>
    </div>
</template>
<script>
import nouveauVue from '../../../../components/actions_components/PROFESSEUR/absence/nouveau.vue';

export default {
  components:{nouveauVue},
  async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }  
}
</script>