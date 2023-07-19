<template>
    <div>
        <nouveau_evaluationVue/>
    </div>
</template>

<script>
import nouveau_evaluationVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/evaluation/liste.vue';

export default {
    components:{nouveau_evaluationVue},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>