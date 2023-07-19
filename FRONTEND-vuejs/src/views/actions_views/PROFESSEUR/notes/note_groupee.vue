<template>
    <div>
        <note_groupeeVue/>
    </div>
</template>

<script>
import note_groupeeVue from '../../../../components/actions_components/PROFESSEUR/notes/note_groupee.vue';
export default {
    components:{note_groupeeVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>