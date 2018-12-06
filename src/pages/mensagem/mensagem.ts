import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensagem } from '../../model/mensagem';

/**
 * Generated class for the MensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {


  formGroup : FormGroup;//armazena formulario
                        //necessario improt ReactiveFormsModule em app.module.ts


    mensagens: Mensagem[] = new Array(); //Armazena as mensagens


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private fireStore : AngularFirestore, //uso database firestone
     private formBuilder : FormBuilder) //uso formulario
      {
        //inicia o formulario

        this.formGroup = this.formBuilder.group({

          usuario : ['' ,[Validators.required]] ,
          mensagem : ['' ,[Validators.required]],
          id :['']
        });

  }

  ionViewDidLoad() {
    this.getList();
  }

  add(){
    //criando um ID paara a coleção
    let id = this.fireStore.createId();
    //Atribui ID ao campo id do formgroup
    this.formGroup.controls['id'].setValue(id);
    //cria a coleção
    this.fireStore.doc(`mensagem/${id}`)
    .set(this.formGroup.value).then(()=>{
      console.log("Cadastrado com sucasso")})
      .catch(error =>{
        console.log("Erro ao cadastrar");
        console.log(error);
      });
       
   }

   getList(){
    this.fireStore.collection<any>("mensagem")
    .valueChanges()
    .subscribe(response =>{
      this.mensagens = response;
    });

   }

}
