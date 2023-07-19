<template>
    <div>
        <consultation_moyennesVue/>
    </div>
</template>
<script>
import consultation_moyennesVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/notes/consultation_moyennes.vue';
export default {
    components:{consultation_moyennesVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>