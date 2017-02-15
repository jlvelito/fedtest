/*global $ */
/*global document */
/*global console */
/*global window */
$(document).ready(function () {
    "use strict";
    /*definición de variables globales a usarse*/
    var number = [],
        number_2 = [],
        myNumbers,
        myNumbers_2;

    // Evitando que se envien los formularios al hacer enter en los inputs
    $('form').submit(function (event) {
        event.preventDefault();
    });


    // Validación para el primer input, solo se permiten números y espacios
    $('.digitSpaces').keypress(function (evt) {
        var theEvent = evt || window.event,
            key = theEvent.keyCode || theEvent.which,
            regex = /[0-9 ]|\./;
        key = String.fromCharCode(key);
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) {
                theEvent.preventDefault();
            }
        }
    });

    // Primer input evaluando números cuando se da el desenfoque del input
    $('#numbers').on('blur', function () {
        // Nuestro elemento
        var el = $(this);
        // Evitando que un espacio en blanco se convierta en un elemento del array
        myNumbers = el.val().replace(/\s+/g, " ");
        // Eliminando espacios demás al inicio y final
        myNumbers = myNumbers.trim();
        // Convirtiendo el string en un array
        number = myNumbers.split(" ");
        // Eliminando repetidos y ordenando de menor a mayor
        number = $.unique(number).sort(function (a, b) {return a - b});
        // Eliminando el value del input (Limpiando) y además los elementos en la lista para reiniciarla
        el.val('');
        $('#order').html('');
        // Procesamiento del array
        $.each(number, function (key, value) {
            // Agregando elementos a la lista
            $('#order').append('<li class="col-md-1 col-xs-2" data-key="' + key + '"><span>' + value + '</span></li>');
            $('#order > li').each(function (i, element) {
                // Agregandolos con un delay para el efecto
                $(element).delay(i * 200).queue(function (next) {
                    $(this).addClass('active');
                    next();
                });
            });
        });
    });

    // Segundo input no necesitamos validación debido a que es un number además en este se hace con un botón
    $('#evaluator').on('click', function () {
        // Definiendo el elemento a usar
        var el = $('#numbers_2');
        // Proceso similar al anterior donde preparamos nuestro array
        myNumbers_2 = el.val().replace(/\s+/g, " ");
        myNumbers_2 = myNumbers_2.trim();
        // Ahora no convertimos sino que agregamos
        number_2.push(myNumbers_2);
        // Procesamiento del array / repetidos / sorting
        number_2 = $.unique(number_2).sort(function (a, b) {return a - b});
        // Limpieza de elementos
        $('#order_2').html('');
        el.val('');
        // Procesamiento del array
        $.each(number_2, function (key, value) {
            // Agregando elementos a la lista
            $('#order_2').append('<li class="col-md-1 col-xs-2" data-key="' + key + '"><span>' + value + '</span></li>');
            // Agregando clase
            $('#order_2 > li').each(function (i, element) {
                $(element).delay(i * 200).queue(function (next) {
                    $(this).addClass('active');
                    next();
                });
            });
        });
    });
});
