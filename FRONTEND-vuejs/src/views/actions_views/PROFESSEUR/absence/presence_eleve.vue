<template>
    <div>
        <presence_eleveVue/>
    </div>
</template>
<script>
import presence_eleveVue from '../../../../components/actions_components/PROFESSEUR/absence/presence_eleve.vue';
export default {
    components:{presence_eleveVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>