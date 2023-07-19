<template>
    <div class="hero bg-body-extra-light">
    <div class="hero-inner">
      <div class="content content-full text-center">
        <h1 class="fw-bold mb-2">
          ZAZA<span id="textCol">TIANA</span> FORT-DAUPHIN
        </h1>
        <h1 class="h4 fw-medium text-muted mb-5">
            Bienvenue dans le kit de démarrage.
        </h1>
      </div>

   <div id='actions'>

        <vs-button  :to="{name:'connecter_personnel_administration'}" size='large' color="danger" type="gradient" icon="lock" class="mr-2"> PERSONNEL D'ADMINISTRATION</vs-button>
        <vs-button  :to="{name:'connecter_professeur'}" size='large' color="danger" type="gradient" icon="lock"  class="mr-2"> PROFESSEUR</vs-button>
        <vs-button  :to="{name:'connecter_parent'}" size='large' color="danger" type="gradient" icon="lock"  class="mr-2"> PARENT</vs-button>

    </div>


    </div>

     
  </div>
</template>

<style>
#actions{
  justify-content:center;
  display:flex;
  align-items:center;
}
  #textCol{
    color:#c72a75;
  }
</style>