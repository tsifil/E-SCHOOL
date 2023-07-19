<template>
    <div>
        <liste_prof_classe/>
    </div>
</template>
<script>
import liste_prof_classe from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/professeur/liste_prof_classe.vue';
export default {
    components:{liste_prof_classe},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>