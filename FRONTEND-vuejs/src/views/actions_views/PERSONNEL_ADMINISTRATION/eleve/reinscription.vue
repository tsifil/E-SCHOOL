<template>
    <div>
        <Reinscription/>
    </div>
</template>

<script>
import Reinscription from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/reinscription'
export default {
    components:{Reinscription},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>