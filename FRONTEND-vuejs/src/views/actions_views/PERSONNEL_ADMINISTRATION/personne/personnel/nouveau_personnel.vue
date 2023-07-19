<template>
    <div>
        <nouveau_personnelVue/>
    </div>
</template>

<script>
import nouveau_personnelVue from '../../../../../components/actions_components/PERSONNEL_ADMINISTRATION/personne/personnel/nouveau_personnel.vue';

export default {
    components:{nouveau_personnelVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>