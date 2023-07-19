<template>
    <div>
        <nouveau_tuteurVue/>
    </div>
</template>

<script>
import nouveau_tuteurVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/tuteur/nouveau_tuteur.vue';

export default {
    components:{nouveau_tuteurVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>