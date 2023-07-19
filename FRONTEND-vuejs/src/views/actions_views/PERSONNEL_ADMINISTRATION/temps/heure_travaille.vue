<template>
    <div>
        <heure_travaille/>
    </div>
</template>
<script>
import heure_travaille from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/temps/heure_travaille'
export default {
    components:{heure_travaille},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>