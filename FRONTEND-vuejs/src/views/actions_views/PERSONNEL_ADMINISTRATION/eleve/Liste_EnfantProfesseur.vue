<template>
    <div>
        <ListeEnfantProfesseur/>
    </div>
</template>

<script>
import ListeEnfantProfesseur from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/Liste_EnfantProfesseur.vue'

    export default{
        components:{ListeEnfantProfesseur},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>