<template>
    <div>
        <professeur/>
    </div>
</template>
<script>
import professeur from '../../../../components/actions_components/PARENT/professeur/professeur.vue';
export default {
    components:{professeur},
    async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
}
</script>