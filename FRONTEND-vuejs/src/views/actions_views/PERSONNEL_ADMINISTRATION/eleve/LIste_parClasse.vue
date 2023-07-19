<template>
    <div>
        <ListeParClasse/>
    </div>
</template>

<script>
import ListeParClasse from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/LIste_parClasse.vue'

    export default{
        components:{ListeParClasse},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>