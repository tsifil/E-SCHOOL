<template>
    <div>
        <ajouter_edt/>
    </div>
</template>
<script>
import ajouter_edt from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/temps/ajouter_edt'
export default {
    components:{ajouter_edt},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>