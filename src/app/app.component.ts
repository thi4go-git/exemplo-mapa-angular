import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'exemplo-mapa-angular';

  chave: string = 'minha chave de API Maps';

  latitude: number = -16.728335131289096;
  longitude: number = -49.30219346611459;
  endereco: string = '';
  coordenadaObtida: string = '';


  mostrarLocalizacaoNoMapa() {
    if (this.latitude == 0 || this.longitude == 0 ||
      this.latitude == undefined || this.longitude == undefined) {
      alert("Informe a latitude e longitude!")
    } else {
      const mapElement = document.getElementById("mostra-localizacao");//referencia ao ID da div que mostrará
      if (mapElement) {//Verifica se existe a DIV com id map no HTML
        let loader = new Loader({
          apiKey: this.chave
        })
        loader.load().then(() => { //faz aparecer o map na div definida HTML = mostra-localizacao"
          //nesse exemplo: <div class="full" id="map"></div
          const localizacao = { lat: this.latitude, lng: this.longitude };
          //CArrega a lozalização1 através das cordenadas
          const localizacaoMapa = new google.maps.Map(mapElement, {
            center: localizacao,
            zoom: 16,
          });
          //Marca a localização no mapa com alfinete
          const marcarLocalizacaoNoMapa = new google.maps.Marker({
            position: localizacao,
            map: localizacaoMapa,
            title: "Minha Localização",
          });

        });
      }
    }
  }


  obterCoordenadasDoEndereco() {
    if (this.endereco == null ||
      this.endereco == undefined) {
      alert("Informe o endereço: (Nome rua, Nº rua, Bairro, Cidade) ")
    } else {
      const mapElement = document.getElementById("obter-coordenadas");
      if (mapElement) {
        let loader = new Loader({
          apiKey: this.chave
        })
        loader.load().then(() => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: this.endereco }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results != null) {
                const localizacao = results[0].geometry.location;
                this.coordenadaObtida = '' + localizacao;
                const localizacaoMapa = new google.maps.Map(mapElement, {
                  center: localizacao,
                  zoom: 16,
                });
                const marcarLocalizacaoNoMapa = new google.maps.Marker({
                  position: localizacao,
                  map: localizacaoMapa,
                  title: "Localização Obtida",
                });
              }
            } else {
              console.error("Geocodificação falhou devido a: " + status);
            }
          });
        });
      }
    }
  }




}
