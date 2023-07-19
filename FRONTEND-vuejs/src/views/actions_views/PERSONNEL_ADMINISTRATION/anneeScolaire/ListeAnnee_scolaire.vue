<template>
    <div>
        <ListeAnneeSco/>
    </div>
</template>

<script>
import ListeAnneeSco from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/anneeScolaire/ListeAnnee_scolaire.vue'

    export default{
        components:{ListeAnneeSco},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>