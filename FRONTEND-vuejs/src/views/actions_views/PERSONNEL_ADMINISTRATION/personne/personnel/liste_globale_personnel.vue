<template>
    <div>
        <liste_globale_personnelVue/>
    </div>
</template>

<script>
import liste_globale_personnelVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/personnel/liste_globale_personnel.vue';

export default {
    components:{liste_globale_personnelVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>