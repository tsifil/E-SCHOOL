<template>
    <div>
        <DashboardVue/>
    </div>
</template>
<script>
import DashboardVue from '../../../components/actions_components/PROFESSEUR/Dashboard.vue';
export default {
    components:{DashboardVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>