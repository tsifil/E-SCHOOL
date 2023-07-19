<template>
    <div>
        <edit_trimestreVue/>
    </div>
</template>
<script>
import edit_trimestreVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/trimestre/edit_trimestre.vue';
export default {
    components:{edit_trimestreVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>