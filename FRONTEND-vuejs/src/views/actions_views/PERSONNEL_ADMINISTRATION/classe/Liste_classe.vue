<template>
<div>
    <ListeClasse/>
</div>
</template>

<script>
import ListeClasse from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/classe/Liste_classe.vue'
    
    export default{
        components:{ListeClasse},
                async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>