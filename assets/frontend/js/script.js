
$(document).scroll(function() { 
    var obj_act_top = $(this).scrollTop();
});

// VOLVER ARRIBA

$(document).ready(function() {

    var obj_act_top = $(this).scrollTop();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
            $("nav.navbar").removeClass('navbar-fondo');

        } else {
            $('#back-to-top').fadeOut();
            $("nav.navbar").addClass('navbar-fondo');

        }

    });

    $('a#back-to-top').click(function () {

        $('body,html').animate({
            scrollTop: 0
        }, 500);

        return false;

    });

    if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn();
        $("nav.navbar").removeClass('navbar-fondo');

    } else {
        $('#back-to-top').fadeOut();
        $("nav.navbar").addClass('navbar-fondo');

    }

    var owl = $('.owl-carousel');    
    $('#contentMain').show();
    owl.owlCarousel({
        center: true,
        loop:   true,
        autoplay:   true,
        autoplayTimeout:    3000,
        autoWidth:  true,
        dots:   false,
        items: 3,
    });

    $('.fancybox').fancybox({
        autoSize: true,
        fitToView: true,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 4,
        helpers: {
            overlay: {
              locked: false
            }
        }
    });

    $('.fancybox-gallery').fancybox({
        showCloseButton: false,
        padding: 5,
        width: '450',
        autoSize: false,
    });  
    $('a.owl-carousel-product-left').click(function(event){
        event.preventDefault();
        owl.trigger('prev.owl.carousel', [300]);
    })
    
    $("a.owl-carousel-product-right").click(function(event){
        event.preventDefault();
        owl.trigger('next.owl.carousel', [300]);
    });

});
$(document).on('click','[data-action="quote-shipping"]',function () {
    var cod_post = $('[name="cod_postal"]').val(),
        inpt_this = $(this),
        shipping_id = $(this).attr('data-shipping'),
        total_pagar =   parseFloat($('input[name="total_pago"]').val()),
        store = $('#store').val();
        var symbol_temp = $("#symbol").val();
        $("#section-costo-envio").html('');
        $("#section-costo-envio").removeClass("mt-4");        
        var descuento = parseFloat($('input[name="descuento_cupon"]').val()).toFixed(2);
    $.ajax({
        url: base_url + 'frontend/ajax/shippingMoto',
        type: 'POST',
        dataType: 'json',
        data: {
            codigo_postal: cod_post,
            store:store,
            shipping_id:shipping_id
        },
        beforeSend: function() {
            inpt_this.attr('disabled','').prepend('<i class="fa fa-spin fa-spinner"></i> ');
            $('.confirmar').attr('disabled','');
        }
    })
    .done(function(dataJson) {
        var isHeadingGastronomy = $("input#heading_store").val();
        var orderPreparation = $("input#heading_store").attr('data-preparation');

        var preparationTime = '';

        if (isHeadingGastronomy == '1') {
            preparationTime = '<p> Su pedido estará listo dentro de: ' + orderPreparation +'</p>';
        }

        if (dataJson.success) {

            html = ''+
            '<div class="alert alert-warning text-left mt-2"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+ 
                '<p>Costo de envío: '+$('[name="symbol"]').val()+' '+dataJson.price+' </p>'+
                preparationTime+
            '</div>'+
            '<input type="hidden" name="costo_envio" value="'+dataJson.price+'">'+
            '';
            $('#calcularEnvios').html(html);            
            $("#section-costo-envio").addClass("mt-4");
            $("#section-costo-envio").html('<span>Entrega </span><span>' + $("#symbol").val() +parseFloat(dataJson.price).toFixed(2)+'</span>');            
            if(descuento > 0)
            {
                if(Number.isInteger((total_pagar+parseFloat(dataJson.price)) - descuento)){
                    $("#section-costo-total").text($("#symbol").val() + '' + parseFloat((total_pagar+parseFloat(dataJson.price)) - descuento).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text($("#symbol").val() + '' + (parseFloat(((total_pagar+parseFloat(dataJson.price)) - descuento).toFixed(2))).toLocaleString('en'));                    
                }
            }else{
                if(Number.isInteger(total_pagar+parseFloat(dataJson.price))){
                    $("#section-costo-total").text($("#symbol").val() + '' + parseFloat(total_pagar+parseFloat(dataJson.price)).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text($("#symbol").val() + '' + (parseFloat((total_pagar+parseFloat(dataJson.price)).toFixed(2))).toLocaleString('en'));                    
                }                
            }
            
        }else{
            html = ''+
            '<div class="alert alert-warning text-left mt-2"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+ 
                '<p>Tu código postal no está dentro del radio de envío</p>'+
                preparationTime+
            '</div>';
            '';
            if(descuento > 0){
                $("#section-cupon").addClass("mt-4");
                $("#section-cupon").html('<span>Descuento </span><span>' + $("#symbol").val() +parseFloat(descuento).toFixed(2)+'</span>');                
                if(Number.isInteger(total_pagar - descuento)){
                    $("#section-costo-total").text($("#symbol").val() + '' + parseFloat(total_pagar - descuento).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text($("#symbol").val() + '' + (parseFloat((total_pagar - descuento).toFixed(2))).toLocaleString('en'));                    
                }                
            }else{
                $("#section-cupon").html('');
                $("#section-cupon").removeClass("mt-4");
                if(Number.isInteger(total_pagar)){
                    $("#section-costo-total").text(symbol_temp + '' + parseFloat(total_pagar).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text(symbol_temp + '' + (parseFloat(total_pagar.toFixed(2))).toLocaleString('en'));
                }
            }  
            $('#calcularEnvios').html(html);
        }
        inpt_this.removeAttr('disabled').find('i.fa').remove();
        $('.confirmar').removeAttr('disabled');
    })
    .fail(function() {
    })
    .always(function() {
    });
});

function consultaEnvio(event) {
    event.preventDefault();
    var target = $(event.target);

    var codigoPostal = $('input[name="codigo_postal"]').val();

    if (codigoPostal == '') {
        var htm = '* Ingrese su código postal';
        $("span.message-postal-code").html(htm);

    } else {
        var htm = '';
        $("span.message-postal-code").html(htm);
        $.ajax({
            url: base_url + 'frontend/ajax/consultaCodigoPostal',
            type: 'POST',
            dataType: 'json',
            data: {
                enviar_form: '1',
                codigo_postal: codigoPostal,
            },
            beforeSend: function() {
                target.html('<i class="fa fa-spin fa-spinner"></i> CALCULAR ENVÍO');
                target.attr('disabled', '');
            }
        })
        .done(function(dataJson) {
            target.html('CALCULAR ENVÍO');

            if (dataJson.success) {

                var htm = '<div class="alert alert-success">'+
                    '<p><strong>El producto será entregado en las próximas X días/horas.</strong></p>'+
                    '<ul class="list-unstyled mb-0">'+
                        '<li><strong>Sucursal:</strong> ' + dataJson.data.sucursal.name + '</li>'+
                        '<li><strong>Dirección:</strong> ' + dataJson.data.sucursal.adress + '</li>'+
                        '<li><strong>Teléfono:</strong> ' + dataJson.data.sucursal.telephone + '</li>'+
                    '</ul>'+
                '</div>';

                totalPedido(dataJson.data.total, 0);

                $("div.shipping-detail").html(htm);

            } else {
                var htm = '<div class="form-group display-box-subsidiaries">'+
                    '<label>Solo podrá retirar su pedido de las siguientes sucursales:</label>'+
                    '<div class="list-group">';

                    $.each(dataJson.data.sucursales, function(index, value) {
                        htm += ''+
                        '<input type="radio" name="id_sucursal" value="'+ value.id_subsidiary +'" id="Radio'+ value.id_subsidiary +'" />'+
                        '<label class="list-group-item" for="Radio'+ value.id_subsidiary +'"><strong>Sucursal:</strong> ' + value.name + '<br/><strong>Dirección:</strong> ' + value.adress + ' <br/><strong>Teléfono:</strong> ' + value.telephone + '</label>';
                    });

                htm += '</div>'+
                '</div>';

                totalPedido(dataJson.data.total, 0);

                $("div.shipping-detail").html(htm);

            }

            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            target.html('CALCULAR ENVÍO');
            target.removeAttr('disabled');
            console.log("complete");
        });

    }

}

function eliminar_producto(event, id,url) {
    event.preventDefault();

    $.ajax({
        type: "POST",
        url: base_url + 'frontend/ajax/removeItemCart',
        data: {
            id: id,
            store:url
        },
        dataType: 'json',
        cache: false,
        success: function(dataJson) {
            $('tr#grilla_producto_' + id).remove();
            $("div#calculadorEnviosContent").html('');

            if ($("#tabla-pedidos tbody tr").length) {
                //calculosCarrito(dataJson);
                $(".cart-items-total").text('$' + parseFloat(dataJson.data.total).toFixed(2));
                $(".cart-items-badge").text(dataJson.data.num_products);

                $("span#total_pagar").html(parseFloat(dataJson.data.total).toFixed(2));
                $('[name="total_pago"]').val(parseFloat(dataJson.data.total).toFixed(2));

            } else {
                location.reload();
            }

        },
        error: function () {
            
        }
    });

}

function calcularSubtotalPedido(input,changeValue) {
    var elemento = $(input);
    var qty = parseInt(elemento.val());    
    var precio_unitario = parseFloat(elemento.attr('data-price'));

    if (qty > 0 && $.isNumeric(qty)) {
        $.ajax({
            url: base_url + 'frontend/ajax/updateItemCart',
            type: 'POST',            
            data: {
                cantidad: elemento.val(),
                rowid: elemento.attr('id'),
                variacion: elemento.attr('data-variations'),
                store:elemento.attr('data-store'),
            },
            dataType: 'json',
            beforeSend: function () {
                elemento.attr('readonly', '');
            },
            success: function (dataJson) {
                if (dataJson.success) {
                    elemento.removeAttr('readonly');
                    $("div#calculadorEnviosContent").html('');                
                    elemento.val(dataJson.data.stock);
                    qty = parseInt(dataJson.data.stock);
                    precio_unitario = precio_unitario * qty;                
                    elemento.blur();                
                    $(".cart-items-total").text(dataJson.data.symbol + '' + parseFloat(dataJson.data.total).toFixed(2));
                    $(".cart-items-badge").text(dataJson.data.num_products);                
                    if(Number.isInteger(precio_unitario)){
                        elemento.closest('tr').find('td .cart-price').text(dataJson.data.symbol + '' + parseFloat(precio_unitario).toLocaleString('en')+".00");
                    }else{
                        elemento.closest('tr').find('td .cart-price').text(dataJson.data.symbol + '' + (parseFloat(precio_unitario.toFixed(2))).toLocaleString('en'));
                    }
                    if(Number.isInteger(dataJson.data.total)){                    
                        $("#total_pagar").html(parseFloat(dataJson.data.total).toLocaleString('en')+".00");
                    }else{                    
                        $("#total_pagar").html((parseFloat(dataJson.data.total.toFixed(2))).toLocaleString('en'));
                    }                
                    //$("#total_pagar").html(parseFloat(dataJson.data.total).toFixed(2));
                    $('[name="total_pago"]').val(parseFloat(dataJson.data.total).toFixed(2));
                } else {
                    elemento.val(1);
                    swal('Error', 'El producto no cuenta con stock disponible', 'error');
                }
            },
            error: function () {
                console.log("error");
            }
        });

    }

}

function totalPedido(totalPedido, costoEnvio) {

    totalPedido = parseFloat(totalPedido);
    costoEnvio = parseFloat(costoEnvio);

    $('input[name="total_pago"]').val(totalPedido.toFixed(2));

    var totalCompra = totalPedido + costoEnvio;

    if (costoEnvio > 0) {
        var htm = '<h2 align="right">'+
        '<p style="font-size:16px;">COSTO DE ENVÍO:</p>'+
        '$ <span id="total_envio">' + costoEnvio.toFixed(2) + '</span></h2>';

        $("#section-costo-envio").html(htm);

        var htm2 = '<h2 align="right">'+
        '<p style="font-size:16px;">TOTAL A PAGAR:</p>'+
        '$ <span id="total_envio">' + totalCompra.toFixed(2) + '</span></h2>';

        $("div#section-costo-total").html(htm2);

    } else {
        $("div#section-costo-envio").html('');
        $("div#section-costo-total").html('');
    }

}

$(document).on('change', 'select#metodo_pago', function(event) {
    var metodoPago = $(this).val();
    var selectEntrega = $("select#metodo_pago");
    var metodoEntrega = selectEntrega.val();

    /*if (metodoPago == '2') {
        selectEntrega.find('option[value="1"]').removeAttr('disabled');
    } else {
        selectEntrega.find('option[value="1"]').prop('disabled', true);
    }*/

    // selectEntrega.val('');
    total = parseFloat($('input[name="total_pago"]').val());

    $("#total_pagar").html(total.toFixed(2));
    $("div#numberWhatsapp").html('');
    $("#form-solicitar").html('');
    $('.confirmar').removeAttr('disabled');    
});

function consultaMercadoEnvios(event) {
    //    event.preventDefault();
    var target = $(event.target);

    var codigoPostal = $('input[name="codigo_postal"]').val();

    if (codigoPostal == '') {
        var htm = '* Ingrese su código postal';
        $("span.message-postal-code").html(htm);

    } else {
        $.ajax({
            url: base_url + 'frontend/ajax/consultaMercadoEnvios',
            type: 'POST',
            dataType: 'json',
            data: {
                enviar_form: '1',
                codigo_postal: codigoPostal,
            },
            beforeSend: function() {
                target.html('<i class="fa fa-spin fa-spinner"></i> CALCULAR ENVÍO');
                target.attr('disabled', '');
            }
        })
        .done(function(dataJson) {

            if (dataJson.success) {

                var precioEnvio = dataJson.data.response.response.options[0].base_cost;
                var tiempoEnvio = dataJson.data.response.response.options[0].estimated_delivery_time.date;
                var nombreEnvio = dataJson.data.response.response.options[0].name;

                var d = tiempoEnvio.substr(0, 10);
                d = d.split('-');
                d.reverse();

                var htm = '<div class="alert alert-success">'+
                    '<input type="hidden" name="costo_envio" value="'+precioEnvio+'"/>'+
                    '<p><strong>Detalle de envío</strong></p>'+
                    '<ul class="list-unstyled mb-0">'+
                        '<li><strong>Tipo de envío:</strong> ' + nombreEnvio + '</li>'+
                        '<li><strong>Costo de envío:</strong> $' + precioEnvio + '</li>'+
                        '<li><strong>Fecha estimada de entrega:</strong> ' + d.join('/') + '</li>'+
                    '</ul>'+
                '</div>';

                totalPedido(dataJson.data.total, precioEnvio);

                $("div.shipping-detail").html(htm);

            } else {
                var htm = '* No se puede procesar su envío en estos momentos';
                $("span.message-postal-code").html(htm);
                $('input[name="codigo_postal"]').val('');

            }

            console.log("success");

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            target.html('CALCULAR ENVÍO');
            target.removeAttr('disabled');
            console.log("complete");
        });

    }

}

$(document).on('click', '.btn-toggle-categories', function(event) {
    event.preventDefault();
    $("#accordion").toggleClass('d-lg-block');
    $("#accordion").toggleClass('d-none');
});

function alternarCategoria(event, id_blog_categoria) {
	event.preventDefault();
  $('.category-selector[data-category!="'+id_blog_categoria+'"]').hide();
  $('.category-selector[data-category="'+id_blog_categoria+'"]').show();
};

$(document).on('click', '[data-action="open-whatsapp"]', function(event) {
    event.preventDefault();
    $('#whatsappDetails').fadeToggle();
});

function initCardPayPlan() {
    $('.input-card-method-pay').removeClass('active');
    $('[data-action="btn-pay-plan"]').removeClass('button_plan_mp');
    $('[data-action="btn-pay-plan"]').removeClass('button_plan_pagos360_card');
    $('[data-action="btn-pay-plan"]').removeClass('button_plan_pagos360_cbu');
}
$(document).on('click', '[data-action="input-mercado-pago"]', function(event) {
    event.preventDefault();
    initCardPayPlan()
    let period = $(this).attr('data-period');
    $(this).addClass('active');
    $('#input-period').val(period);
    $(`[data-action="btn-pay-plan"][data-period=${period}]`).addClass('button_plan_mp');
});
$(document).on('click', '[data-action="input-pagos360-card"]', function(event) {
    event.preventDefault();
    initCardPayPlan()
    let period = $(this).attr('data-period');
    $(this).addClass('active');
    $(`[data-action="btn-pay-plan"][data-period=${period}]`).addClass('button_plan_pagos360_card');
});
$(document).on('click', '[data-action="input-pagos360-cbu"]', function(event) {
    event.preventDefault();
    initCardPayPlan()
    let period = $(this).attr('data-period');
    $(this).addClass('active');
    $(`[data-action="btn-pay-plan"][data-period=${period}]`).addClass('button_plan_pagos360_cbu');
});
$(document).on('click', '.button_plan_pagos360_card', function(event) {
    $('.form-input-period').val($(this).attr('data-period'));
    $('.form-input-amount').val($(this).attr('data-amount'));
    $('#pagos360ModalCard').modal('show');
});
$(document).on('click', '.button_plan_pagos360_cbu', function(event) {
    $('.form-input-period').val($(this).attr('data-period'));
    $('.form-input-amount').val($(this).attr('data-amount'));
    $('#pagos360ModalCbu').modal('show');
});

$(document).on('click', '.button_plan_mp', function (event) {
    event.preventDefault();
    const button = $(this);
    const period = $("#input-period").val();
    const email = $("#input-email").val();
    let cantidad = $("#input-amount-monthly").val();
    if (period == "annual") cantidad = $("#input-amount-annual").val();
    
    swal({
        title: "Advertencia",
        text: "Esta acción provocará que el plazo vigente de su plan actual finalice y empiece con su nuevo plan. Le recomendamos esperar a que su plan termine antes de comprar otro.",
        type: "warning",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#c9dae1",
        showCancelButton: true,
        confirmButtonColor: "#78cbf2",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
        disableButtonsOnConfirm: false,
        showLoaderOnConfirm: false,
        confirmLoadingButtonColor: '#DD6B55',
        html:true,
    }, function(response) {
        if (response) {
            swal.close();
            $.ajax({
                url: base_url + 'frontend/private/ajax_private/create_mp_suscription',
                type: 'POST',
                dataType: 'json',
                data: {
                    email: email,
                    frequency: period,
                    amount: cantidad,
                },
                beforeSend: () => {
                    button.prop('disabled', true);
                }
            }).done(function (response) {
                if (response.success) {
                    window.open(response.data, '_blank').focus();
                } else {
                    swal('Error', response.message, 'error');
                }
            }).fail(function () {
                console.log('Error');
            }).always(function () {
                button.prop('disabled', false);
            });
            
        }
    });
});

$(document).on('click', '[data-action="button_des_mp"]', function (event) {
    event.preventDefault();
    swal({
        title: "Advertencia",
        text: "¿Seguro que desea desuscribirse? Se dejará de facturarle y su periodo de plan activo finalizará cuando acaben los días restantes de su suscripción.",
        type: "warning",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#c9dae1",
        showCancelButton: true,
        confirmButtonColor: "#78cbf2",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
        disableButtonsOnConfirm: false,
        showLoaderOnConfirm: false,
        confirmLoadingButtonColor: '#DD6B55',
        html:true,
    }, function(response) {
        if (response) {
            swal.close();
            $.ajax({
                url: base_url + 'frontend/private/web_private/cancel_mp_suscription',
                type: 'POST',
                dataType: 'json',
            })
            .done(function(data) {
                if (data.success) {
                    window.location.reload();
                }
            })
            .fail(function() {
                console.log(data.message);
            })
            .always(function() {
                console.log("complete");
            });
        }
    });
});

$(document).on('submit', 'form.formPagos360', function(event) {
    event.preventDefault();
    let form = $(this);
    let data = form.serializeArray();

    swal({
        title: "Advertencia",
        text: "Esta acción provocará que el plazo vigente de su plan actual finalice y empiece con su nuevo plan. Le recomendamos esperar a que su plan finalice antes de comprar otro.",
        type: "warning",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#c9dae1",
        showCancelButton: true,
        confirmButtonColor: "#78cbf2",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
        disableButtonsOnConfirm: false,
        showLoaderOnConfirm: false,
        confirmLoadingButtonColor: '#DD6B55',
        html:true,
    }, function(confirm) {
        if (confirm) {
            swal.close();
            $.ajax({
                url: base_url + 'frontend/private/ajax_private/generateAdhesion',
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    form.find('button').attr('disabled', true);
                }
            })
            .done(function(dataJson) {
                if(dataJson.success) {
                    swal({
                        title: dataJson.title,
                        text: dataJson.message,
                        type: 'success'
                    }, function () {
                    window.location.reload();
                });
                } else {
                    form.find('button').removeAttr('disabled');
                    swal(dataJson.title, dataJson.message, 'error');
                }
                console.log("success");
            })
            .fail(function(xhr) {
                console.log("error");console.log(xhr);
            })
            .always(function() {
                console.log("complete");
            });  
            
        }
    });      
});
$(document).on('click', '[data-action="button_des_pagos360"]', function (event) {
    event.preventDefault();
    let button = $(this);
    swal({
        title: "Advertencia",
        text: "¿Seguro que desea desuscribirse? Se dejará de facturarle y su periodo de plan activo finalizará cuando acaben los días restantes de su suscripción.",
        type: "warning",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#c9dae1",
        showCancelButton: true,
        confirmButtonColor: "#78cbf2",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
        disableButtonsOnConfirm: false,
        showLoaderOnConfirm: false,
        confirmLoadingButtonColor: '#DD6B55',
    }, function(ok) {
        if (ok) {
            swal.close();
            $.ajax({
                url: base_url + 'frontend/private/ajax_private/unsubscribePagos360',
                type: 'POST',
                dataType: 'json',
                beforeSend: function() {
                    button.attr('disabled', true);
                }
            })
            .done(function(dataJson) {
                if(dataJson.success) {
                    swal({
                            title: dataJson.title,
                            text: dataJson.message,
                            type: 'success'
                        }, function () {
                        window.location.reload();
                    });
                } else {
                    button.removeAttr('disabled');
                    swal(dataJson.title, dataJson.message, 'error');
                }
                console.log("success");
            })
            .fail(function(xhr) {
                console.log("error");console.log(xhr);
            })
            .always(function() {
                console.log("complete");
            });
        }
    });
});

