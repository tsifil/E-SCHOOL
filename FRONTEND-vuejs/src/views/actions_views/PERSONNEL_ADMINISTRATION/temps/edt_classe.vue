<template>
    <div>
        <edtClasseVue/>
    </div>
</template>
<script>
import edtClasseVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/temps/edt_classe.vue';
export default {
    components:{edtClasseVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>