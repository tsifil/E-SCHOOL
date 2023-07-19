<template>
    <div>
        <liste_tuteurVue/>
    </div>
</template>
<script>
import liste_tuteurVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/tuteur/liste_tuteur.vue';

export default {
    components:{liste_tuteurVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>