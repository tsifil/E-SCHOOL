<template>
    <div>
        <ListeGlobale/>
    </div>
</template>

<script>
import ListeGlobale from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/Liste_globale.vue'

    export default{
        components:{ListeGlobale},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>