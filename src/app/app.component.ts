import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'credit-card-validation';

  creditCardName: string = ""
  creditCardNumber: string = ""
  creditCardExpiration: string = ""
  creditCardCvc: string = ""
  cardIconSource: string = "";
  cardType: string = "Crédito";

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {

  }
 
  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      NomeCartao: ['', Validators.required],
      NumeroCartao: ['',Validators.required],
      DataValidade: ['',Validators.required],
      CodigoSeguranca: ['',Validators.required],
      CardType: ['C']
    })

    this.secondFormGroup = this.fb.group({
      Logradouro: ['', Validators.required],
      Bairro: ['', Validators.required],
      Municipio:['', Validators.required],
      Estado:['', Validators.required]
    })
  }

  setCreditCardName() {
    this.creditCardName = this.firstFormGroup.get('NomeCartao').value;
    this.creditCardName = this.creditCardName.toUpperCase();
    this.firstFormGroup.get('NomeCartao').setValue(this.creditCardName)
  }

  rotateCreditCard() {
      const creditCardBack = document.getElementById('card-back');
      const creditCardFront = document.getElementById('card-front');
      creditCardBack.style.transform = 'rotateY(0)';
      creditCardFront.style.transform = 'rotateY(180deg)';
  }

  rotateBackCreditCard(){
    const creditCardBack = document.getElementById('card-back');
    const creditCardFront = document.getElementById('card-front');
    creditCardBack.style.transform = 'rotateY(180deg)';
    creditCardFront.style.transform = 'rotateY(0)';
  }

  setCreditCardNumber() {
    this.creditCardNumber = this.firstFormGroup.get('NumeroCartao').value;
    this.creditCardNumber = this.creditCardNumber.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    this.getCardIcon();
  }

  setCreditCardExpiration() {
    this.creditCardExpiration = this.firstFormGroup.get('DataValidade').value;
    const mes = this.creditCardExpiration.slice(0, 2);
    const ano = this.creditCardExpiration.slice(2);
    if(this.creditCardExpiration)
    this.creditCardExpiration = `${mes}/${ano}`;
  }

  setCreditCardCvc() {
    this.creditCardCvc = this.firstFormGroup.get('CodigoSeguranca').value;
  }

  getCardIcon() {
    const numeroLimpo = this.firstFormGroup.get('NumeroCartao').value.replace(/\s+/g, '');
    const padraoVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const padraoMastercard = /^5[1-5][0-9]{14}$/;

    if (padraoVisa.test(numeroLimpo)) {
      this.cardIconSource = 'assets/img/visaicon.png'
    }
    else if (padraoMastercard.test(numeroLimpo)) {
      this.cardIconSource = 'assets/img/mastercardicon.png'
    }
    else {
      this.cardIconSource = ''
    }
  }

  setCreditCardType(){
    if(this.firstFormGroup.get('CardType').value == 'C'){
      this.cardType = 'Crédito'
    } else {
      this.cardType = 'Débito'
    }
  }

  resetCardInfo(){
    this.creditCardName = ''
    this.creditCardNumber = ''
    this.creditCardExpiration = '' 
    this.creditCardCvc = ''
    this.cardIconSource = ''

  }

}
