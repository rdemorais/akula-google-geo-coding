'use strict';

var AkulaGoogleGeoCoding = (function() {

    var formatter = [];

    AkulaGoogleGeoCoding.prototype.cons = {
        PAIS: 0,
        PAIS_SIGLA: 1,
        ESTADO: 3,
        ESTADO_SIGLA: 4,
        MUNICIPIO: 5,
        MUNICIPIO_SIGLA: 6,
        BAIRRO: 7,
        LOGRADOURO: 8,
        ENDERECO_FORMATADO: 9
    };

    AkulaGoogleGeoCoding.prototype.get = function(term) {
        return formatter[term];
    };

    function AkulaGoogleGeoCoding(geoCodeLocation) {
        formatter[this.cons.ENDERECO_FORMATADO] = geoCodeLocation.formatted_address;
        if(geoCodeLocation !== undefined && geoCodeLocation.address_components !== undefined) {
            var componentesEndereco = geoCodeLocation.address_components;

            for (var i = 0; i < componentesEndereco.length; i++) {
                var componente = componentesEndereco[i];
                var tipos = componente.types;
                for (var j = 0; j < tipos.length; j++) {
                    var tipo = tipos[j];
                    switch(tipo) {
                        case 'country':
                            formatter[this.cons.PAIS] = componente.long_name;
                            formatter[this.cons.PAIS_SIGLA] = componente.short_name; 
                            break;
                        case 'administrative_area_level_1':
                            formatter[this.cons.ESTADO] = componente.long_name;
                            formatter[this.cons.ESTADO_SIGLA] = componente.short_name;
                            break;
                        case 'locality':
                            formatter[this.cons.MUNICIPIO] = componente.long_name;
                            formatter[this.cons.MUNICIPIO_SIGLA] = componente.short_name;
                            break;
                        case 'sublocality':
                            formatter[this.cons.BAIRRO] = componente.long_name;
                            break; 
                        case 'sublocality_level_3':
                            formatter[this.cons.LOGRADOURO] = componente.long_name;
                            break;
                        default:

                    }
                }
            }
        }
    }

    return AkulaGoogleGeoCoding;
})();
