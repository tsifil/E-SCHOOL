<template>
    <div>
        <detail_listeVue/>
    </div>
</template>

<script>
import detail_listeVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/personnel/detail_liste.vue';

export default {
    components:{detail_listeVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>