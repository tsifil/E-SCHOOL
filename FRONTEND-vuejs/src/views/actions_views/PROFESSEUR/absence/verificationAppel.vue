<template>
    <div>
        <verificationAppelVue/>
    </div>
</template>
<script>
import verificationAppelVue from '../../../../components/actions_components/PROFESSEUR/absence/verificationAppel.vue';
export default {
    components:{verificationAppelVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>