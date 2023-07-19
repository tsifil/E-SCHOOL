<template>
    <div>
        <inscriptionVue/>
    </div>
</template>

<script>
import inscriptionVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/inscription.vue';

export default {
    components:{inscriptionVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }

}
</script>