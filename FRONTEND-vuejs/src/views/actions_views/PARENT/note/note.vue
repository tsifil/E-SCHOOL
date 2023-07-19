<template>
    <div>
        <noteVue/>
    </div>
</template>
<script>
import noteVue from '../../../../components/actions_components/PARENT/note/note.vue';
export default {
    components:{noteVue},
    async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
}
</script>