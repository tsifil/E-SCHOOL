<template>
    <div>
        <EleveListe_InscritsVue/>
    </div>
</template>
<script>
import EleveListe_InscritsVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/EleveListe_Inscrits.vue';

export default {
    components:{EleveListe_InscritsVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>