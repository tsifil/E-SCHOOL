<template>
    <div>
        <edtVue/>
    </div>
</template>
<script>
import edtVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/temps/edt.vue';
export default {
    components:{edtVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>