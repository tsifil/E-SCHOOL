<template>
    <div>
        <editerAnnee_scolaireVue/>
    </div>
</template>
<script>
import editerAnnee_scolaireVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/anneeScolaire/editerAnnee_scolaire.vue';
export default {
    components:{editerAnnee_scolaireVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
    }
}
</script>