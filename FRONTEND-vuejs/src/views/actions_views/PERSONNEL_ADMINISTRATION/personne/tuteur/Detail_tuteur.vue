<template>
    <div>
        <Detail_tuteurVue/>
    </div>
</template>

<script>
import Detail_tuteurVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/tuteur/Detail_tuteur.vue';
export default {
    components:{Detail_tuteurVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>