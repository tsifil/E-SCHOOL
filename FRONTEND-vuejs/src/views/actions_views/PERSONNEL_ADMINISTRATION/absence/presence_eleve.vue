<template>
    <div>
        <presence_eleveVue/>
    </div>
</template>
<script>
import presence_eleveVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/absence/presence_eleve.vue';
export default {
    components:{presence_eleveVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
    }
    
}
</script>