<template>
    <div>
        <consultation_evaluationVue/>
    </div>
</template>
<script>
import consultation_evaluationVue from '../../../../components/actions_components/PROFESSEUR/notes/consultation_evaluation.vue';

export default {
    components:{consultation_evaluationVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>