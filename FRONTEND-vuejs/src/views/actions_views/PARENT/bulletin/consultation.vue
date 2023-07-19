<template>
    <div>
        <consultation/>
    </div>
</template>
<script>
import consultation from '../../../../components/actions_components/PARENT/bulletin/consultation';
export default {
    components:{consultation},
    async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
}
</script>