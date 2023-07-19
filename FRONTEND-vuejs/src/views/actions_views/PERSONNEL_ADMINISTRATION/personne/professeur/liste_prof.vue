<template>
    <div>
        <liste_profVue/>
    </div>
</template>
<script>
import liste_profVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/professeur/liste_prof.vue';
export default {
    components:{liste_profVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>