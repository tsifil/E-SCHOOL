<template>
    <div>
        <matiere_eleveVue/>
    </div>
</template>
<script>
import matiere_eleveVue from '../../../../components/actions_components/PARENT/matiere/matiere_eleve.vue';
export default {
    components:{matiere_eleveVue},
    async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
}
</script>