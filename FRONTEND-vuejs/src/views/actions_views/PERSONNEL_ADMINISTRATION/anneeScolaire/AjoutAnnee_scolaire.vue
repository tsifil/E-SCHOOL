<template>
    <div>
        <AnneeSco/>
    </div>
</template>

<script>
import AnneeSco from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/anneeScolaire/AjoutAnnee_scolaire.vue'
    export default{
        components:{AnneeSco},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>