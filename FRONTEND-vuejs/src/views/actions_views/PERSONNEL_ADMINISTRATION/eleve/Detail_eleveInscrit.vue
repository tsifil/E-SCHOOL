<template>
    <div>
        <DetailEleveInscrit/>
    </div>
</template>

<script>
import DetailEleveInscrit from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/Detail_eleveInscrit.vue'

    export default{
        components:{DetailEleveInscrit},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
    }
</script>