<template>
    <div>
        <absenceVue/>
    </div>
</template>
<script>
import absenceVue from '../../../../components/actions_components/PARENT/absence/absence.vue';
export default {
    components:{absenceVue},
    async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
}
</script>