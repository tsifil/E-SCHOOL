<template>
    <div>
        <consultationVue/>
    </div>
</template>
<script>
import consultationVue from '../../../../components/actions_components/PROFESSEUR/absence/consultation.vue';

export default {
  components:{consultationVue},
  async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>