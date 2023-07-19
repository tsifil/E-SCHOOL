<template>
    <div>
      <form @submit.prevent="Envoyer()">
        <label>Objet:</label>
        <textarea v-model="objet"></textarea>
        <br>
        <label>Joindre fichier</label>
        <input type="file" @change="onFileChange($event)"/>
        <br>
        <label>Classe</label>
        <select v-model="idClasse">
            <option value="" disabled>-- Veuillez choisir la classe --</option>
            <option v-for="c in classes" :key="c.id" :value="c.id">{{c.text}}</option>
        </select>
        <br>

         <!--div class="block block-rounded">
            <div class="block-header block-header-default">
              <h3 class="block-title">Dropzone</h3>
            </div>
            <div class="block-content block-content-full">
              <h2 class="content-heading">Asynchronous File Uploads</h2>
              <div class="row">
                <div class="col-lg-4">
                  <p class="text-muted">
                    Drag and drop sections for your file uploads
                  </p>
                </div>
                <div class="col-lg-8 col-xl-5">
                  <form class="dropzone" action=""></form>
                </div>
              </div>
            </div>
          </div-->

        <input type="submit" value="Envoyer"/>
      </form>
    </div>
</template>
<script>
import { HTTP } from '../../../../http-constants';
import moment from 'moment';
export default {
    data(){
        return{
            datePub:moment().format("YYYY-MM-DD"),
            file:'',
            objet:'',
            idProf:this.$store.getters.getProf.idProf,
            idClasse:'',
            classes:[]
        }
    },
    methods:{
      onFileChange(event){
                    this.file = event.target.files[0]
      },
      Classe(){
            HTTP.get('/professeur/listeClasse').then((response)=>{
            this.classes = response.data
        })
     },
      Envoyer(){
        const data = new FormData();
              data.append("datePub",this.datePub)
              data.append("objet",this.objet)
              data.append("file",this.file)
              data.append("idProf",this.idProf)
              data.append("idClasse",this.idClasse)                        
            HTTP.post("/envoyer/devoir",data).then((response)=>{
                console.log(response.data)
            })
        }
    },
    mounted(){
      this.Classe()
    }
} 
</script>