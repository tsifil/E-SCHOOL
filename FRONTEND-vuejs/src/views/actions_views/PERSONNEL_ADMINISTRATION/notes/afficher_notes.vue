<template>
    <div>
        <afficher_notes/>
    </div>
</template>
<script>
import afficher_notes from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/notes/afficher_notes.vue';
export default {
    components:{afficher_notes},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
}
</script>