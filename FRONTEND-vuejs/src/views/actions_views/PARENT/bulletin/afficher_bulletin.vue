<template>
    <div>
        <AfficherBulletin/>
    </div>
</template>
<script>
import AfficherBulletin from '../../../../components/actions_components/PARENT/bulletin/afficher_bulletin';
export default {
    components:{AfficherBulletin},
    async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
}
</script>