<template>
    <div>
        <consultationVue/>
    </div>
</template>
<script>
import consultationVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/notes/consultation_evaluations.vue';
export default {
    components:{consultationVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>