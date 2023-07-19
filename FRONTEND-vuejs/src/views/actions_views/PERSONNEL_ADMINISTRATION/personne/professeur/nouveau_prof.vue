<template>
    <div>
        <nouveau_profVue/>
    </div>
</template>
<script>
import nouveau_profVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/professeur/nouveau_prof.vue';
export default {
    components:{nouveau_profVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>