<template>
    <div>
        <bulletin_adminVue/>
    </div>
</template>
<script>
import bulletin_adminVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/Bulletin_note/bulletin_admin.vue';
export default {
    components:{bulletin_adminVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>