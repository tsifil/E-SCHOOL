<template>
    <div>
        <voir_notes/>
    </div>
</template>
<script>
import voir_notes from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/notes/voir_notes.vue';
export default {
    components:{voir_notes},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>