<template>
    <div>
        <DetailEleve/>
    </div>
</template>

<script>
import DetailEleve from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/Detail_eleve.vue'

export default {
    components:{DetailEleve},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>