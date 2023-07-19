<template>
    <div class="container-scroller">
        <NavHaut/>  
        <div class="container-fluid page-body-wrapper">
        <NavGauche/>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
                <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                <form @submit.prevent="Ajouter()">
                    <div class="form-group">
                          <label>Nom et prénom(s)*</label>
                          <selection v-model="idPers" :options="personne"/>
                    </div>

                  <div class="form-group">
                        <label>Téléphone</label>
                        <input type="number" 
                        class="form-control" 
                        v-model.trim="$v.telephone.$model"
                        :class="{'is-invalid':$v.telephone.$error, 'is-valid':!$v.telephone.$invalid}"
                        />

                        <div class="valid-feedback">Votre numéro téléphone est valide !!!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.telephone.required">Veuillez remplir ce champ obligatoire</span> 
                            <span v-if="!$v.telephone.minLength">Le numéro téléphone doit comporter au moins {{ $v.telephone.$params.minLength.min }} chiffres</span> 
                            <span v-if="!$v.telephone.maxLength">Le numéro téléphone doit avoir au maximum {{ $v.telephone.$params.maxLength.max }} chiffres</span> 
                        </div>

                    </div>
                    <a @click='$router.go(-1)' class="btn btn-warning mr-2">Retour</a>
                    <input type="submit" class="btn btn-success mr-2" value="Enregistrer"/>
                  </form>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import { required, minLength, maxLength} from 'vuelidate/lib/validators'

export default{
    components:{NavHaut,NavGauche},
    data(){
        return{
          personne:[],
          idPers:this.$route.params.idPers==0?'':this.$route.params.idPers,
          telephone:''
        }
    },
  validations: {
      telephone:{
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      idPers:{
        required
      }
   },
    methods:{
        Personne(){
           HTTP.get('/personneParent/contact').then((response)=>{
              this.personne = response.data
           })
        },
        Ajouter(){
            this.$v.$touch()
            if(this.$v.$invalid){
                console.log("corriger l'erreur")
            }else{
              const data = {
                idPers:this.idPers,
                telephone:this.telephone
              }
                HTTP.post('/ajouterContact',data).then((response)=>{
                    console.log(response.data)
                    this.$swal('Insertion a réussi.',{icon:'success'})
                })
            }
       }
    },
    mounted(){
      this.Personne()
    }
}
</script>

  <!--select v-model="idPers" class="form-control">
                                    <option value="" disabled>Veuillez sélectionnez le nom correspondant</option>
                                    <option v-for="p in personne" :key="p.idPers" :value="p.idPers">
                                          {{p.idPers}}  {{ }} {{ }} {{p.nomPrenom}}
                                    </option>
                            </select-->
