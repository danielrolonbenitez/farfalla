// fuctions -------------------------------------------------
var code_city = '';

function metodopagoActivar(elemento) {
    event.preventDefault();
    var id_payment_method = elemento.attr('data-id');
    var name = elemento.html();
    $.ajax({
        url: base_url + 'frontend/private/ajax_private/metodo_pago_activar',
        type: 'POST',
        dataType: 'json',
        data: {id_payment_method:id_payment_method},
        beforeSend: function()
        {
            elemento.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
            elemento.attr('disabled','');
            elemento.removeClass('activar');
            elemento.closest('div.card').removeClass('border-0')
        },
    })
    .done(function(data) {
        if (data.success)
        {
            elemento.html('DESACTIVAR');
            elemento.removeAttr('disabled');
            elemento.addClass('desactivar');
            elemento.closest('div.card').addClass('border-active');
            if (id_payment_method != 5 && id_payment_method != 7)
            {
                elemento.parent().append('<a href="#" data-id="'+id_payment_method+'" class="credentials">Actualizar credenciales</a>')
            }
            if (id_payment_method == 1)
            {
                $('#modal_mercadopago').modal('show');
            }
            if (id_payment_method == 4)
            {
                $('#modal_paypal').modal('show');
            }
        } else {
            swal('Aviso', data.message, data.type);
            elemento.html('ACTIVAR');
            elemento.removeAttr('disabled');
            elemento.addClass('activar');
            elemento.closest('div.card').addClass('border-0')
        }
    })
    .fail(function() {
        elemento.html('ACTIVAR');
        elemento.removeAttr('disabled');
        elemento.addClass('activar');
        elemento.closest('div.card').addClass('border-0')

        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function metodopagoDesactivar(elemento) {
    event.preventDefault();
    var id_payment_method = elemento.attr('data-id');
    var name = elemento.html();
    $.ajax({
        url: base_url + 'frontend/private/ajax_private/metodo_pago_desactivar',
        type: 'POST',
        dataType: 'json',
        data: {id_payment_method:id_payment_method},
        beforeSend: function()
        {
            elemento.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
            elemento.attr('disabled','');
            elemento.removeClass('desactivar');
            elemento.closest('div.card').removeClass('border-active')
        },
    })
    .done(function(data)
    {
        if (data.success)
        {
            elemento.html('ACTIVAR');
            elemento.removeAttr('disabled');
            elemento.addClass('activar');
            elemento.closest('div.card').addClass('border-0')
            elemento.parent().find('a.credentials').remove();
        }
    })
    .fail(function() {
        elemento.html('DESACTIVAR');
        elemento.removeAttr('disabled');
        elemento.addClass('desactivar');
        elemento.closest('div.card').addClass('border-active')
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function metodoenvioActivar(elemento) {

    var id_shipping = elemento.attr('data-id');
    var name = elemento.html();

    if (id_shipping == 7) {
        $('#aex').removeClass('color-aex');
    } else if (id_shipping == 8) {
        $('#moto').removeClass('color-aex');
    } else if (id_shipping == 10) {
        $('#uber').removeClass('color-aex');
    } else if (id_shipping == 11){
        $('#correo').removeClass('color-aex');
    } else if (id_shipping == 12){
        $('#ues').removeClass('color-aex');
    } else if (id_shipping == 12){
        $('#ues').removeClass('color-aex');
    }

    if (id_shipping == 2) {

        $("div#whatsappURU").modal('show');

        $.ajax({
            url: base_url + 'frontend/private/ajax_private/metodo_envio_desactivar',
            type: 'POST',
            dataType: 'json',
            data: {id_shipping:6},
            beforeSend: function()
            {
                elemento.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
                elemento.attr('disabled','');
                elemento.removeClass('desactivar');
                elemento.closest('div.card').removeClass('border-active');
                elemento.parent().find('a.credentials').remove();
            },
        })
        .done(function(data)
        {
            if (data.success)
            {
                elemento.html('ACTIVAR');
                elemento.removeAttr('disabled');
                elemento.addClass('activar');
                elemento.closest('div.card').addClass('border-0');
            }
        })
        .fail(function() {
            elemento.html('DESACTIVAR');
            elemento.removeAttr('disabled');
            elemento.addClass('desactivar');
            elemento.closest('div.card').addClass('border-active')
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    }

    $.ajax({
        url: base_url + 'frontend/private/ajax_private/metodo_envio_activar',
        type: 'POST',
        dataType: 'json',
        data: {
            id_shipping: id_shipping,
        },
        beforeSend: function()
        {
            elemento.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
            elemento.attr('disabled','');
            elemento.removeClass('activar');
            elemento.closest('div.card').removeClass('border-0')
        },
    })
    .done(function(data)
    {
        if (data.success)
        {
            elemento.html('DESACTIVAR');
            elemento.removeAttr('disabled');
            elemento.addClass('desactivar');
            elemento.closest('div.card').addClass('border-active');

            if (id_shipping != '10' && id_shipping != '14') {
                elemento.parent().append('<a href="#" data-id="'+id_shipping+'" class="credentials">Actualizar credenciales</a>')
                //  } else if (id_shipping == 11) {
                //  elemento.parent().append('<a href="#" data-id="'+id_shipping+'" class="credentials">Administrar códigos de envío</a>')
            } else {
                if(id_shipping != '14'){
                    elemento.parent().append('<a href="#" style="font-size: 14px;margin-top: 10px;" data-id="10" class="guia-uber-flash">¿Cómo funciona?</a>');
                }
            }

            if (id_shipping == 3)
            {
                // $('#modal_fedex').modal('show');
            }

            if (id_shipping == 4)
            {
                $('#modal_dhl').modal('show');
            }

            if (id_shipping == 5)
            {
                $('#modal_ups').modal('show');
            }

            if (id_shipping == 11) {
                $("#modal_correo_uruguayo").modal('show');
            }

            if ($.inArray(id_shipping, ['2', '6']) !== -1) {
                elemento.parent().append('<br/><a href="#modalMetodoEnvioEdicion" data-toggle="modal" data-target="#modalMetodoEnvioEdicion" class="btn btn-link text-danger text-unstyled"><i class="fa fa-edit text-danger"></i> Editar</a>');
            }

        }

    })
    .fail(function() {
        elemento.html('ACTIVAR');
        elemento.removeAttr('disabled');
        elemento.addClass('activar');
        elemento.closest('div.card').addClass('border-0')
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function metodoenvioDesactivar(elemento) {

    var id_shipping = elemento.attr('data-id');
    var name = elemento.html();

    if (id_shipping == 7) {
        $('#aex').addClass('color-aex');
    } else if (id_shipping == 8) {
        $('#moto').addClass('color-aex');
    } else if (id_shipping == 10) {
        $('#uber').addClass('color-aex');
    } else if (id_shipping == 12) {
        $('#ues').addClass('color-aex');
    } else if (id_shipping == 12) {
        $('#ues').addClass('color-aex');
    }

    $.ajax({
        url: base_url + 'frontend/private/ajax_private/metodo_envio_desactivar',
        type: 'POST',
        dataType: 'json',
        data: {
            id_shipping: id_shipping,
        },
        beforeSend: function()
        {
            elemento.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
            elemento.attr('disabled','');
            elemento.removeClass('desactivar');
            elemento.closest('div.card').removeClass('border-active');
            elemento.parent().find('a.credentials').remove();
            elemento.parent().find('.guia-uber-flash').remove();
        },
    })
    .done(function(data)
    {
        if (data.success)
        {
            elemento.html('ACTIVAR');
            elemento.removeAttr('disabled');
            elemento.addClass('activar');
            elemento.closest('div.card').addClass('border-0');
            if (elemento.closest('div.card-body').find('a.guia-uber-flash').length > 0) {
                elemento.closest('div.card-body').find('a.guia-uber-flash').remove();
            }
            if ($.inArray(id_shipping, ['2', '6'])) {
                $('a[href="#modalMetodoEnvioEdicion"]').remove();
            }
        }
    })
    .fail(function() {
        elemento.html('DESACTIVAR');
        elemento.removeAttr('disabled');
        elemento.addClass('desactivar');
        elemento.closest('div.card').addClass('border-active')
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}
function credenciales(elemento) {
    event.preventDefault();
    var id_payment_method = elemento.attr('data-id');
    $.ajax({
            url: base_url + 'frontend/private/ajax_private/get_credenciales_pago',
            type: 'POST',
            dataType: 'json',
            data: {id_payment_method:id_payment_method},
        })
        .done(function(data)
        {
            if (data.success)
            {
                switch (id_payment_method) {
                    case '1':
                        var title = "Mercadopago";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Cliente_id</label><input type="text" name="client_id" class="form-control" value="'+(data.credendiales.client_id ? data.credendiales.client_id:'')+'" required></div>'+
                        '<div class="form-group"><label>Cliente_secret</label><input type="text" name="secret_key" class="form-control" value="'+(data.credendiales.secret_key ? data.credendiales.secret_key:'')+'" required></div>';
                    break;
                    case '2':
                        var title = "Todopago";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Cliente_id</label><input type="text" name="client_id" class="form-control" value="'+(data.credendiales.client_id ? data.credendiales.client_id:'')+'" required></div>'+
                        '<div class="form-group"><label>Secret_key</label><input type="text" name="secret_key" class="form-control" value="'+(data.credendiales.secret_key ? data.credendiales.secret_key:'')+'" required></div>';
                    break;
                    case '3':
                        var title = "Payu";
                        var htm ='<input type="hidden" name="id_payment_method" value="' + id_payment_method + '">'+
                        '<div class="form-group">' +
                            '<label>Merchant ID</label>' +
                            '<input type="text" name="merchant_id" class="form-control" value="' + (data.credendiales.merchant_id ? data.credendiales.merchant_id : '') + '" required />' +
                        '</div>' +
                        '<div class="form-group">'+
                            '<label>API Key</label>'+
                            '<input type="text" name="secret_key" class="form-control" value="' + (data.credendiales.secret_key ? data.credendiales.secret_key : '') + '" required />'+
                        '</div>'+
                        '<div class="form-group">' +
                            '<label>accountId</label>' +
                            '<input type="text" name="client_id" class="form-control" value="' + (data.credendiales.client_id ? data.credendiales.client_id : '') + '" required />' +
                        '</div>';
                    break;
                    case '4':
                        var title = "Paypal";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Email</label><input type="text" name="email_paypal" class="form-control" value="'+(data.credendiales.email_paypal ? data.credendiales.email_paypal:'')+'" required></div>';
                    break;
                    case '6':
                        var title = "Credenciales por Datos Bancarios";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Nombre del titular/Banco/ Número de cuenta/Sucursal</label><textarea rows="3" name="name_banca" class="form-control" required>'+(data.credendiales.name_banca ? data.credendiales.name_banca:'')+'</textarea></div>';
                    break;
                    case '8':
                        var title = "Credenciales de pagopar";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group">'+
                            '<label>TOKEN PÚBLICO</label>'+
                            '<input type="text" name="token_public" class="form-control" value="'+(data.credendiales.token_public ? data.credendiales.token_public:'')+'" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>TOKEN PRIVADO</label>'+
                            '<input type="text" name="token_private" class="form-control" value="'+(data.credendiales.token_private ? data.credendiales.token_private:'')+'" required>'+
                        '</div>'+
                        '';
                    break;
                    case '10':
                        var title = "Credenciales de Dlocal";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group">'+
                            '<label>x_login</label>'+
                            '<input type="text" name="login_dlocal" class="form-control" value="'+(data.credendiales.login_dlocal ? data.credendiales.login_dlocal:'')+'" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>x_trans_key</label>'+
                            '<input type="text" name="trans_key_dlocal" class="form-control" value="'+(data.credendiales.trans_key_dlocal ? data.credendiales.trans_key_dlocal:'')+'" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>Secret Key</label>'+
                            '<input type="text" name="secret_key" class="form-control" value="'+(data.credendiales.secret_key ? data.credendiales.secret_key:'')+'" required>'+
                        '</div>'+
                        '';
                    break;
                }

                $('#modal_credential_pago').find('#title').html(title);
                $('#modal_credential_pago').find('#form_credentials_pago').html(htm);
            }else{
                switch (id_payment_method) {
                    case '1':
                        var title = "Mercadopago";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Cliente_id</label><input type="text" name="client_id" class="form-control" required></div>'+
                        '<div class="form-group"><label>Cliente_secret</label><input type="text" name="secret_key" class="form-control" required></div>';
                    break;
                    case '2':
                        var title = "Todopago";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Cliente_id</label><input type="text" name="client_id" class="form-control" required></div>'+
                        '<div class="form-group"><label>Secret_key</label><input type="text" name="secret_key" class="form-control" required></div>';
                    break;
                    case '3':
                        var title = "Payu";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Cliente_id</label><input type="text" name="client_id" class="form-control" required></div>'+
                        '<div class="form-group"><label>Secret_key</label><input type="text" name="secret_key" class="form-control" required></div>';
                    break;
                    case '4':
                        var title = "Paypal";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Correo de paypal</label><input type="email" name="email_paypal" class="form-control" required></div>';
                    break;
                    case '6':
                        var title = "Credenciales por Datos Bancarios";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group"><label>Nombre de Banco / N° de CBU o N° Cuenta</label><textarea rows="3" name="name_banca" class="form-control" required></textarea></div>';
                    break;
                    case '10':
                        var title = "Credenciales de Dlocal";
                        var htm ='<input type="hidden" name="id_payment_method" value="'+id_payment_method+'">'+
                        '<div class="form-group">'+
                            '<label>x_login</label>'+
                            '<input type="text" name="login_dlocal" class="form-control" value="" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>x_trans_key</label>'+
                            '<input type="text" name="trans_key_dlocal" class="form-control" value="" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>Secret Key</label>'+
                            '<input type="text" name="secret_key" class="form-control" value="" required>'+
                        '</div>'+
                        '';
                    break;
                }

                $('#modal_credential_pago').find('#title').html(title);
                $('#modal_credential_pago').find('#form_credentials_pago').html(htm);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    $('#modal_credential_pago').modal('show');
}
function actualizar_credenciales_pago() {
    event.preventDefault();
    var form_credentials = $('#form_credentials_pago').serialize();

    $.ajax({
    url: base_url + 'frontend/private/ajax_private/actualizar_credenciales_pago',
    type: 'POST',
    dataType: 'json',
    data: form_credentials,
    beforeSend: function()
    {
        $('#modal_credential_pago #send').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
        $('#modal_credential_pago #send').attr('disabled','')
    },
    })
    .done(function(data)
    {
        if (data.success)
        {
            $('#modal_credential_pago #send').html('Actualizar');
            $('#modal_credential_pago #send').removeAttr('disabled');
            $('#modal_credential_pago').modal('hide');
        }else{
            $('#modal_credential_pago #send').html('Actualizar');
            $('#modal_credential_pago #send').removeAttr('disabled');
            $('#modal_credential_pago #errorFrom').html('<div class="alert alert-block alert-danger fadeIn"><button data-dismiss="alert" class="close close-sm" type="button"><i class="fa fa-times"></i></button> No deje campos vacios</div>');
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function credenciales_envio(elemento) {
    event.preventDefault();

    var id_shipping = elemento.attr('data-id'),
        code = elemento.attr('data-code');
        store = elemento.attr('data-store');
        $('#modal_credential_envio').find('#form_credentials_envio').html('');
        $('[data-section="tolpit-moto"]').addClass('d-none');
        $('[data-section="toolpit-ues"]').addClass('d-none');

    $.ajax({
        url: base_url + 'frontend/private/ajax_private/get_credenciales_envio',
        type: 'POST',
        dataType: 'json',
        data: {
            id_shipping: id_shipping
        },
        beforeSend: function() {
            $("#modal_credential_envio").find('.modal-dialog').removeClass('modal-md');
            $("#modal_credential_envio").find('.modal-dialog').removeClass('modal-lg');
            $('#modal_credential_envio').find('#form_credentials_envio').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
            $('#modal_credential_envio').find('#form_credentials_envio').addClass('text-center');
        },
        })
        .done(function(data)
        {
            $('#modal_credential_envio').find('#send').removeClass('d-none');
            $('#modal_credential_envio').find('#form_credentials_envio').find('span.spinner-border').remove();
            $('#modal_credential_envio').find('#form_credentials_envio').removeClass('text-center');

            if (data.success) {

                switch (id_shipping) {
                    case '1':

                        var htmOperativas = '';

                        if (data.oca_operatives.length > 0) {

                            $.each(data.oca_operatives, function(index, item) {

                                htmOperativas += '' +
                                '<tr>'+
                                    '<td>'+
                                        '<input type="text" name="operativa_name[]" placeholder="Envío a domicilio" required value="' + item.name + '" class="form-control"/>'+
                                    '</td>'+
                                    '<td>'+
                                        '<input type="text" name="operativa_number[]" placeholder="123456" required value="' + item.operative + '" class="form-control"/>'+
                                    '</td>'+
                                    '<td>'+
                                        '<select name="operativa_type[]" class="form-control" required>'+
                                            '<option value="">Seleccionar</option>'+
                                            '<option value="1" ' + (item.mode == '1' ? 'selected' : '') + '>Puerta a Sucursal</option>'+
                                            '<option value="2" ' + (item.mode == '2' ? 'selected' : '') + '>Puerta a Puerta</option>'+
                                            '<option value="3" ' + (item.mode == '3' ? 'selected' : '') + '>Sucursal a Puerta</option>'+
                                            '<option value="4" ' + (item.mode == '4' ? 'selected' : '') + '>Sucursal a Sucursal</option>'+
                                        '</select>'+
                                    '</td>'+
                                    '<td align="right" width="50">'+
                                        '<a class="btn btn-sm btn-danger text-white" data-action="delete-service-oca"><i class="fa fa-trash-alt"></i></a>'+
                                    '</td>'+
                                '</tr>';

                            });

                        } else {

                            htmOperativas = ''+
                            '<tr>'+
                                '<td>'+
                                    '<input type="text" name="operativa_name[]" placeholder="Envío a domicilio" required value="" class="form-control"/>'+
                                '</td>'+
                                '<td>'+
                                    '<input type="text" name="operativa_number[]" placeholder="123456" required value="" class="form-control"/>'+
                                '</td>'+
                                '<td>'+
                                    '<select name="operativa_type[]" class="form-control" required>'+
                                        '<option value="">Seleccionar</option>'+
                                        '<option value="1">Puerta a Sucursal</option>'+
                                        '<option value="2">Puerta a Puerta</option>'+
                                        '<option value="3">Sucursal a Puerta</option>'+
                                        '<option value="4">Sucursal a Sucursal</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td align="right" width="50">'+
                                    '<a class="btn btn-sm btn-danger text-white" data-action="delete-service-oca"><i class="fa fa-trash-alt"></i></a>'+
                                '</td>'+
                            '</tr>';

                        }

                        var title = "Oca";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group">'+
                            '<label>CUIT (con guiones)</label>'+
                            '<input type="text" placeholder="Ejem. 32-23521458-1" name="client_id" class="form-control" value="'+(data.credendiales.cuit_oca ? data.credendiales.cuit_oca:'')+'" required />'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>Código postal de Origen <span data-toggle="tooltip" data-placement="bottom" title="Tener en cuenta que el campo '+"'"+'Código postal de origen'+"'"+' solo necesitas completarlo si quieres que OCA retire los productos desde tu dirección. Esto tiene un costo a menos que realices 5 envíos juntos a direcciones diferentes en cada retiro." class="text-warning far fa-question-circle"></label>'+
                            '<input type="text" placeholder="----" name="postal_code" class="form-control" value="'+(data.credendiales.postal_code_oca ? data.credendiales.postal_code_oca : '')+'" required />'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label>Operativas <span data-toggle="tooltip" data-placement="bottom" title="Los números de operativa de OCA son códigos que te brinda OCA directamente una vez que dan de alta tu cuenta para que puedas empezar a operar, y sirven para identificar el tipo de envío que hagas." class="text-warning far fa-question-circle"></label>'+
                            '<div class="table-responsive">'+
                                '<table data-table="operatives-oca" class="table table-striped">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<td>Servicio</td>'+
                                            '<td>Operativa</td>'+
                                            '<td>Modalidad</td>'+
                                            '<td></td>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody>'+
                                        htmOperativas +
                                    '</tbody>'+
                                '</table>'+
                            '</div>'+
                            '<a href="#" onclick="addService(event)" class="btn btn-light"><i class="fa fa-plus"></i> Agregar Servicio</a>'+
                        '</div>';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/48/¿cómo-integrar-oca-a-mi-tienda.html?');
                        $("#modal_credential_envio").find('.modal-dialog').addClass('modal-lg');
                    break;
                    case '2':
                        var title = "Whatsapp uruguay";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group"><label>Whatsapp uruguay</label><input type="number" name="whatsapp_arg" class="form-control" placeholder="+ codigo pais + codigo area + numero (todo junto)" value="'+(data.credendiales.whatsapp_arg ? data.credendiales.whatsapp_arg:'')+'" required></div>';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/99/¿cómo-configurar-las-entregas-mediante-whatsapp.html?');
                    break;
                    case '3':
                        var title = "FedEx";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group"><label>Key <span data-toggle="tooltip" data-placement="bottom" title="Está bajo el nombre de '+"'"+'Autentication Key'+"'"+' cuando solicites tus claves de producción. Es importante tenerlo anotado." class="text-warning far fa-question-circle"></span></label><input type="text" name="fedex_key" class="form-control" placeholder="Key FedEx Api" value="'+(data.credendiales.fedex_key ? data.credendiales.fedex_key:'')+'" required></div>'+
                        '<div class="form-group"><label>Account Number <span data-toggle="tooltip" data-placement="bottom" title="Está bajo el nombre de '+"'"+'FedEx Shipping Account Number'+"'"+' y te llegará por correo." class="text-warning far fa-question-circle"></span></label><input type="text" name="account_number" class="form-control" placeholder="Número de cuenta FedEx" value="'+(data.credendiales.account_number ? data.credendiales.account_number:'')+'" required></div>'+
                        '<div class="form-group"><label>Meter Number <span data-toggle="tooltip" data-placement="bottom" title="Está bajo el mismo nombre y te aparece al solicitar tus claves de producción o por correo." class="text-warning far fa-question-circle"></span></label><input type="text" name="meter_number" class="form-control" placeholder="Número de Medidor FedEx" value="'+(data.credendiales.meter_number ? data.credendiales.meter_number:'')+'" required></div>'+
                        '<label>Password FedEX <span data-toggle="tooltip" data-placement="bottom" title="Está bajo el mismo nombre y te llegará por correo." class="text-warning far fa-question-circle"></span></label><div class="input-group"><input id="txtPassword" type="password" name="password" class="form-control" placeholder="Contraseña de FedEx" value="'+(data.credendiales.password ? data.credendiales.password:'')+'" required><div class="input-group-append"><button id="show_password" class="btn btn-primary btn-private p-2" type="button" onclick="mostrarPassword()"><span class="fa fa-eye-slash icon"></span> </button></div></div><hr><h6 class="font-weight-bold">Datos de origen para el envío</h6>'+
                        '<div class="form-group"><label>Calle</label><input type="text" name="street" class="form-control" placeholder="Calle" value="'+(data.credendiales.street ? data.credendiales.street:'')+'" required></div>'+
                        '<div class="form-group"><label>Ciudad</label><input type="text" name="city" class="form-control" placeholder="Ciudad" value="'+(data.credendiales.city ? data.credendiales.city:'')+'" required></div>'+
                        '<div class="form-group"><label>Código de provincia</label><input type="text" name="province_code" class="form-control" placeholder="Código de provincia ejemplo: VA" value="'+(data.credendiales.province_code ? data.credendiales.province_code:'')+'" required></div>'+
                        '<div class="form-group"><label>Código de país</label><input type="text" name="country_code" class="form-control" placeholder="Código de país ejemplo: US" value="'+(data.credendiales.country_code ? data.credendiales.country_code:'')+'" required></div>'+
                        '<div class="form-group"><label>Código de postal</label><input type="text" name="code_postal" class="form-control" placeholder="Código de postal" value="'+(data.credendiales.code_postal ? data.credendiales.code_postal:'')+'" required></div>';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/98/¿como-integrar-fedex-a-mi-tienda.html?');

                    break;

                    case '4':
                        var title = "Dhl";
                        var htm ='<p>No disponible</p>';
                        $('#modal_credential_envio').find('#send').addClass('d-none');
                    break;

                    case '5':
                        var title = "Ups";
                        var htm ='<p>No disponible</p>';
                        $('#modal_credential_envio').find('#send').addClass('d-none');
                    break;

                    case '6':
                        var title = "Whatsapp resto del mundo";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group"><label>Whatsapp mundo</label><input type="number" name="whatsapp_mun" class="form-control" placeholder="+ codigo pais + codigo area + numero (todo junto)" value="'+(data.credendiales.whatsapp_mun ? data.credendiales.whatsapp_mun:'')+'" required></div>';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/99/¿cómo-configurar-las-entregas-mediante-whatsapp.html?');

                    break;

                    case '7':
                        var title = "AEX";
                        $('#errorFrom').html('');
                        code_city = (data.credendiales.codigo_ciudad ? data.credendiales.codigo_ciudad:'');
                        var type_currenci_id= (data.credendiales.type_currency_id ? data.credendiales.type_currency_id:'');

                        var htm =
                            '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                            '<div class="form-group">'+
                                '<label>clave_publica</label>'+
                                '<input type="text" data-action="sear-city" id="clave_publica" name="clave_publica" class="form-control" placeholder="Ingrese su clave publica" value="'+(data.credendiales.clave_publica ? data.credendiales.clave_publica:'')+'" required>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label>clave_privada</label>'+
                                '<input type="text" data-action="sear-city" id="clave_privada" name="clave_privada" class="form-control" placeholder="Ingrese su clave privada" value="'+(data.credendiales.clave_privada ? data.credendiales.clave_privada:'')+'" required>'+
                            '</div>'+
                            '<hr>'+
                            '<h6 class="font-weight-bold">Remitente</h6>'+
                            '<div class="row">'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<input class="form-control" type="hidden" name="code_client" value="'+code+'">'+
                                        '<label>Personeria </label>'+
                                        '<select class="form-control" name="personeria">'+
                                            '<option value="">Seleccione...</option>'+
                                            '<option value="F" '+(data.credendiales.personality =='F' ? 'selected':'')+' >Física</option>'+
                                            '<option value="J" '+(data.credendiales.personality =='J' ? 'selected':'')+' >Jurídica</option>'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<label>Tipo de documento </label>'+
                                        '<select class="form-control" name="type_document">'+
                                            '<option value="">Seleccione...</option>'+
                                            '<option value="RUC" '+(data.credendiales.document_type =='RUC' ? 'selected':'')+' >RUC</option>'+
                                            '<option value="CIP" '+(data.credendiales.document_type =='CIP' ? 'selected':'')+'>Cédula de identidad personal</option>'+
                                            '<option value="PAS" '+(data.credendiales.document_type =='PAS' ? 'selected':'')+'>Pasaporte</option>'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<label>N° de documento </label>'+
                                        '<input class="form-control" type="text" name="document_number" value="'+(data.credendiales.document_number ? data.credendiales.document_number:'')+'" >'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<label>Fecha de nacimiento </label>'+
                                        '<input class="form-control" type="date" name="birth_date" value="'+(data.credendiales.birth_date ? data.credendiales.birth_date:'')+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<hr>'+
                            '<h6 class="font-weight-bold">Pickup</h6>'+
                            '<div class="row d-none" data-section="section-pickup" >'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<input class="form-control" type="hidden" name="code_pickup" value="'+store+'" >'+
                                        '<label>Calle principal</label>'+
                                        '<input class="form-control" type="text" name="calle_principal" value="'+(data.credendiales.calle_principal ? data.credendiales.calle_principal:'')+'" >'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<label>Número casa </label>'+
                                        '<input class="form-control" type="number" name="numero_casa" value="'+(data.credendiales.numero_casa ? data.credendiales.numero_casa:'')+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row d-none" data-section="section-pickup">'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<label>Calle transversal </label>'+
                                        '<textarea class="form-control" name="calle_transversal">'+(data.credendiales.calle_transversal ? data.credendiales.calle_transversal:'')+'</textarea>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-md-6">'+
                                    '<div class="form-group">'+
                                        '<label>Ciudad </label>'+
                                        '<select class="form-control" name="city_code" id="select-city">'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '';
                        coin(type_currenci_id);
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/97/¿como-integrar-aex-a-mi-tienda.html?');

                    break;

                    case '8':
                        var title = 'Envío personalizado';
                        var html = '';
                        $('#errorFrom').html('');
                        $('[data-section="tolpit-moto"]').removeClass('d-none');
                        htm =''+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                                '<div class="form-group">'+
                                    '<label>Carga todos los códigos postales de tu zona de reparto</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div id="cod_post_price"></div>'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<div class="form-group">'+
                                    '<a href="#" name="whatsapp_mun" data-action="cod-price" ><i class="fa fa-plus"></i> Nuevo registro</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://www.nextiendas.com/wellcome/ayuda/knowledge/details/74/¿cómo-configurar-los-envíos-personalizados.html?');

                    break;

                    case '10':
                        var title = "Uber";
                        var html = '';
                        $('#errorFrom').html('');
                        htm =''+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                                '<div class="form-group">'+
                                    '<label>Agregar por lo menos un código postal</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div id="uber_cod"></div>'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<div class="form-group">'+
                                    '<a href="#" name="whatsapp_mun" data-uber="cod-price" ><i class="fa fa-plus"></i> Nuevo registro</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/52/¿cómo-integrar-uber-flash-a-mi-tienda.html?');

                    break;

                    case '11':
                        var title = "Correo Uruguayo";
                        var html = '';
                        $('#errorFrom').html('');
                        htm = ''+
                        '<div class="row">' +
                            '<div class="col-md-12">' +
                                '<input type="hidden" name="id_shipping" value="' + id_shipping + '"/>'+
                                '<div class="form-group">' +
                                    '<label>Usuario</label>' +
                                    '<input class="form-control" type="text" name="username" value="' + (data.credendiales.ahiva_username ? data.credendiales.ahiva_username : '') + '"/>'+
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label>Contraseña</label>' +
                                    '<input class="form-control" type="text" name="password" value="' + (data.credendiales.ahiva_password ? data.credendiales.ahiva_password : '') + '"/>' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label>Cuenta</label>' +
                                    '<input class="form-control" type="number" name="account" value="' + (data.credendiales.ahiva_account ? data.credendiales.ahiva_account : '') + '"/>' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label>Sub cuenta</label>' +
                                    '<input class="form-control" type="number" name="subaccount" value="' + (data.credendiales.ahiva_subaccount ? data.credendiales.ahiva_subaccount : '') + '"/>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '';
                    break;

                    case '12':
                        var title = "UES";
                        var html = '';

                        $('#errorFrom').html('');
                        $('[data-section="toolpit-ues"]').removeClass('d-none');

                        htm =''+
                            '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="cliente">Cliente</label>'+
                                        '<input id="cliente" class="form-control" type="text" name="cliente" value="'+ ( data.credendiales.cliente ? data.credendiales.cliente : '' )+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="token">Token</label>'+
                                        '<input id="token" class="form-control" type="text" name="token" value="'+(data.credendiales.token ? data.credendiales.token : '')+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="select_ues">Tipos de servicio</label>'+
                                        '<select id="select_ues" class="form-control" name="select_ues">'+
                                            '<option value="2110" '+ ( data.credendiales.services == '2110'? 'selected' : '' ) +'>UES Estandar (24 Horas)</option>'+
                                            '<option value="12176" '+ (  data.credendiales.services == '12176'? 'selected' : '') +'>UES 3 Dias (72 Horas) </option>'+
                                            '<option value="2519" '+ (  data.credendiales.services == '2519'? 'selected' : '') +'>Entrega en Pick Up    </option>'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '';
                        break;
                    case '13':
                        var title = "Enviopack";
                        var html = "";

                        $('#errorFrom').html('');

                        htm =''+
                            '<input type="hidden" name="id_shipping" value="' + id_shipping + '">'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="cliente">API KEY</label>'+
                                        '<input id="cliente" class="form-control" type="text" name="cliente" value="'+ ( data.credendiales.cliente ? data.credendiales.cliente : '' )+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="token">SECRET KEY</label>'+
                                        '<input id="token" class="form-control" type="text" name="token" value="'+(data.credendiales.token ? data.credendiales.token : '')+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                        '';
                        $("#modal_credential_envio").find('a.watch-tutorial').attr('href','https://nextiendas.com/wellcome/ayuda/knowledge/details/50/¿cómo-integrar-enviopack-con-mi-tienda.html?');

                        break;
                }

                $('#modal_credential_envio').find('#title').html(title);
                $('#modal_credential_envio').find('#form_credentials_envio').html(htm);
                $('[data-action="sear-city"]').click();

            } else {

                switch (id_shipping) {
                    case '1':
                        var title = "Oca";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group"><label>Cliente_id</label><input type="text" name="client_id" class="form-control" required></div>'+
                        '<div class="form-group"><label>Secret_key</label><input type="text" name="secret_key" class="form-control" required></div>';
                    break;
                    case '2':
                        var title = "Whatsapp uruguay";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group"><label>Whatsapp uruguay</label><input type="text" name="whatsapp_arg" class="form-control" required></div>';
                    break;
                    case '6':
                        var title = "Whatsapp";
                        var htm ='<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                        '<div class="form-group"><label>Ingresa tú numero de Whatsapp en formato internacional</label><input type="text" name="whatsapp_mun" class="form-control" required></div>';
                    break;
                    case '8':
                        var title = "Envío propio";
                        var html = '';
                        $('#errorFrom').html('');
                        $('[data-section="tolpit-moto"]').removeClass('d-none');
                        htm =''+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                                '<div class="form-group">'+
                                    '<label>Carga todos los códigos postales de tu zona de reparto</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div id="cod_post_price"></div>'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<div class="form-group">'+
                                    '<a href="#" name="whatsapp_mun" data-action="cod-price" >Nuevo registro</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '';
                    break;
                    case '10':
                        var title = "Uber";
                        var html = '';
                        $('#errorFrom').html('');
                        htm =''+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                                '<div class="form-group">'+
                                    '<label>Agregar por lo menos un código postal</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div id="uber_cod"></div>'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<div class="form-group">'+
                                    '<a href="#" name="whatsapp_mun" data-uber="cod-price" ><i class="fa fa-plus"></i> Nuevo registro</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '';
                    break;
                    case '12':
                        var title = "UES";
                        var html = '';
                        $('#errorFrom').html('');
                        $('[data-section="toolpit-ues"]').removeClass('d-none');
                        htm =''+
                            '<input type="hidden" name="id_shipping" value="'+id_shipping+'">'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="cliente">Cliente</label>'+
                                        '<input id="cliente" class="form-control" type="text" name="cliente" value="">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="token">Token</label>'+
                                        '<input id="token" class="form-control" type="text" name="token" value="">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<div class="form-group">'+
                                        '<label for="select_ues">Tipos de servicio</label>'+
                                        '<select id="select_ues" class="form-control" name="select_ues">'+
                                            '<option value="2110" >UES Estandar (24 Horas)</option>'+
                                            '<option value="12176" >UES 3 Dias (72 Horas) </option>'+
                                            '<option value="2519" >Entrega en Pick Up    </option>'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '';
                    break;
                }

                $('#modal_credential_envio').find('#title').html(title);
                $('#modal_credential_envio').find('#form_credentials_envio').html(htm);

            }

            if (id_shipping == '8') {
                if (data.credendiales) {
                    motoPropia(data.credendiales);
                }
            } else if (id_shipping == '10') {
                if (data.credendiales) {
                    uberFlash(data.credendiales);
                }
            }

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    $('#modal_credential_envio').modal('show');
}
function coin(type_currenci_id) {
    $.ajax({
        url: base_url + 'frontend/private/ajax_private/coin',
        type: 'POST',
        dataType: 'json',
        data: {

        },
        beforeSend: function()
        {
            $('select#type_currency').attr('disabled','');
        },
    })

    .done(function(data)
    {
        $('#type_currency').removeAttr('disabled');
        var html_currency='';
        $.each(data, function (index, Element) {
            html_currency +='<option value="'+Element.type_currency_id+'" '+(type_currenci_id == Element.type_currency_id ? 'selected':'')+' >'+Element.name+'</option>';
        });
        $('#type_currency').html(html_currency);
    })
  }
$(document).on('click change','[data-action="sear-city"]',function () {
    var clave_publica = $('#clave_publica').val(),
        clave_privada = $('#clave_privada').val(),
        codigo_sesion = 'elfiko2020';
    if (clave_publica && clave_privada && codigo_sesion) {
        $.ajax({
            url: base_url + 'frontend/private/ajax_private/AEXCity',
            type: 'POST',
            dataType: 'json',
            data: {
                value:2,
                clave_publica:clave_publica,
                clave_privada:clave_privada,
                codigo_sesion:codigo_sesion,
            },
        })
        .done(function(data)
        {
            if (data.codigo == 0) {

                html_select='';
                html_select +='<option value=""> Seleccione..</option>';
                $.each(data.datos, function (index, Element) {
                    html_select +='<option value="'+Element.codigo_ciudad+'" '+(code_city == Element.codigo_ciudad ? 'selected':'')+'>'+Element.departamento_denominacion+' ('+Element.pais_denominacion+')</option>';
                });
                $('#select-city').html(html_select);
                $('[data-section="section-pickup"]').removeClass('d-none');
            }
        })
    }

});
function actualizar_credenciales_envios() {
    event.preventDefault();
    var form_credentials = $('#form_credentials_envio').serialize();

    $.ajax({
    url: base_url + 'frontend/private/ajax_private/actualizar_credenciales_envios',
    type: 'POST',
    dataType: 'json',
    data: form_credentials,
    beforeSend: function()
    {
        $('#modal_credential_envio #send').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
        $('#modal_credential_envio #send').attr('disabled','')
    },
    })
    .done(function(data)
    {
        if (data.success)
        {
            $('#modal_credential_envio #send').html('Actualizar');
            $('#modal_credential_envio #send').removeAttr('disabled');
            $('#modal_credential_envio').modal('hide');
        }else{
            $('#modal_credential_envio #send').html('Actualizar');
            $('#modal_credential_envio #send').removeAttr('disabled');
            $('#modal_credential_envio #errorFrom').html('<div class="alert alert-block alert-danger fadeIn"><button data-dismiss="alert" class="close close-sm" type="button"><i class="fa fa-times"></i></button> No deje campos vacios</div>');
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}
$(document).on('change','#paso-1 .form-control',function () {
    if($(this).val() !='')
    {
            $(this).closest('.form-group').removeClass('has-error');
    }else{
            $(this).closest('.form-group').addClass('has-error');
    }
});
$(document).on('change','#paso-2 .form-control',function () {
    if($(this).val() !='')
    {
        $(this).closest('.form-group').removeClass('has-error');
    }else{
        $(this).closest('.form-group').addClass('has-error');
    }
});
$(document).on('change','#paso-3 .form-control',function () {
    if($(this).val() !='')
    {
        $(this).closest('.form-group').removeClass('has-error');
    }else{
        $(this).closest('.form-group').addClass('has-error');
    }
});


$(document).on('click', '.btn-paso-1', function(event) {
    event.preventDefault();
    var status = true;
    var buton = $(this).attr('data-target');
    var status_email = false;
    var email = $('#paso-1 input[name="email"]').val();
    var password = $('#paso-1 input[name="password"]').val();
    var re_password = $('#paso-1 input[name="re_password"]').val();
    var terms = $('#paso-1 input[name="terms"]');
    var token = $('#g-recaptcha-response').val();
    if(token){
        $('#token').val(token);
    }
    var email_valid = false;

    $("#paso-1 .form-control").each(function(index) {
        var attr = $(this).attr('required');
        if (typeof attr !== typeof undefined && attr !== false) {
            if ($(this).val()=="" || $(this).val() == null) {
                $(this).closest('.form-group').addClass('has-error');
                status = false;
            }
        }
    });
    if(status)
    {
        $.ajax({
            type: "POST",
            url: base_url + 'frontend/ajax/validationEmail',
            data: {email:email},
            dataType: "json",
        }).done(function (data)
        {
            if(data.success){
                status_email = false;
            }else{
                status_email = true;
            }

                if(!status_email)
                {
                    $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Este email ya esta en uso</div>');
                    $('#paso-1 input[name="email"]').closest('.form-group').addClass('has-error');

                }else{
                    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                    if (emailRegex.test(email)) {
                        email_valid = true;
                    } else {
                        email_valid = false;
                    }

                    if(email_valid)
                    {
                        if(password == re_password)
                        {

                            if($(terms).is(':checked'))
                            {
                                $("fieldset").hide();
                                $(buton).show();
                                $('#errorForm').html('');
                                $('#steps').text($('[name="paso_2_title"]').val());
                            }else{
                                $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Acepter los Términos y Condiciones</div>');
                            }

                        }else{
                            $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Las contraseñas no coinciden</div>');
                            $('#paso-1 input[name="password"]').closest('.form-group').addClass('has-error');
                            $('#paso-1 input[name="re_password"]').closest('.form-group').addClass('has-error');
                            $('#paso-1 input[name="password"]').val('');
                            $('#paso-1 input[name="re_password"]').val('');

                        }
                    }else{
                        $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Ingrese un correo valido</div>');
                        $('#paso-1 input[name="email"]').closest('.form-group').addClass('has-error');

                    }


                }

        }).fail(function () {
            console.log('error');
        });
    }else{
        $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Debe completar todos los campos obligatorios</div>');
    }

});

$(document).on('click', '.btn-paso-2', function(event) {
    event.preventDefault();
    var buton = $(this).attr('data-target');
    var status_selected = false;
    if($("#paso-2 .button_plan").hasClass('selected-plan')){
        status_selected = true;
    }

    if (status_selected) {
        $("fieldset").hide();
        $(buton).show();
        $('#errorForm').html('');
        $('#steps').text( $('[name="paso_3_title"]').val());
    }else{
        $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Debes seleccionar un plan</div>');
    }
});
$(document).on('click', '.btn-submit', function(event) {
    event.preventDefault();
    var status = true;

    $("#paso-3 .form-control").each(function(index) {
        var attr = $(this).attr('required');
        if (typeof attr !== typeof undefined && attr !== false) {
            if ($(this).val()=="" || $(this).val() == null) {
                $(this).closest('.form-group').addClass('has-error');
                status = false;
            }
        }
    });
    if (status) {
        $('#errorForm').html('');
        $('button#case_new').click();
    }else{
        $("#errorForm").html('<div class="alert alert-danger text-center"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Debe completar todos los campos obligatorios</div>');
    }
});

$(document).on('click', '.btn-previous', function(event) {
    event.preventDefault();
    var buton = $(this).attr('data-target');
    $('#errorForm').html('');

    if(buton == '#paso-1'){
        $('#steps').text('REGISTRA TU STORE');
    }
    if(buton == '#paso-2')
    {
        $('#steps').text($('[name="paso_2_title"]').val());
    }
    $("fieldset").hide();
    $(buton).show();
});

function mostrarPassword(){
    var cambio = $('#txtPassword').attr('type');
    if(cambio == "password"){
        $('#txtPassword').attr('type','text')
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        $('#txtPassword').attr('type','password')
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

function changeShippingMethod(shipping, whatsapp = 0, address='') {
    var html='';

    var isHeadingGastronomy = $("input#heading_store").val();
    var orderPreparation = $("input#heading_store").attr('data-preparation');

    $('#numberWhatsapp').html(html);
    $('#calcularEnvios').html(html);
    $("#form-solicitar").html('');
    $("#section-costo-envio").html('');
    $("#section-costo-envio").removeClass("mt-4");
    var total_pago_temp = parseFloat($('input[name="total_pago"]').val());
    var symbol_temp = $("#symbol").val();
    if(Number.isInteger(total_pago_temp)){
        $("#section-costo-total").text(symbol_temp + '' + parseFloat(total_pago_temp).toLocaleString('en')+".00");
    }else{        
        $("#section-costo-total").text(symbol_temp + '' + (parseFloat(total_pago_temp.toFixed(2))).toLocaleString('en'));
    }    
    $("#section-cupon").html('');
    $("#section-cupon").removeClass("mt-4");

    var descuento = parseFloat($('input[name="descuento_cupon"]').val()).toFixed(2);

    if (shipping!=11) {
        $('[name="localidad"]').removeClass('d-none');
        $('[name="localidad_select"]').addClass('d-none');
        $('[name="localidad_select"]').removeAttr('required');
        $('[name="localidad_select"]').html('');
    }

    if (descuento > 0) {
        jQuery("#section-cupon").addClass("mt-4");
        jQuery("#section-cupon").html(`<div class="d-flex flex-column">
                <span>Cupón de descuento</span>
                <small>${jQuery('input[name="nombre_cupon"]').val()}</small>
            </div>
            <div class="d-flex align-items-center gap-5">
                <span class="text-discount">(${jQuery("#symbol").val()}${Number(descuento).toFixed(2)})</span>
                <button type="button" class="btn btn-sm btn-danger" data-action="delete-discount" title="Eliminar cupón"><i class="fa fa-trash-alt"></i></button>
            </div>`);
    }

    switch (shipping) {
        case '1':
            html += '';
            html = '' +
            '<div class="mt-2 mb-2">' +
                '<p align="center">' +
                    '<i class="fa fa-spin fa-spinner fa-2x"></i>' +
                '</p>' +
            '</div>';
            $('#calcularEnvios').html(html);
            loadServicesOCA();
            break;
        case '2':
            if (whatsapp) {
                if (isHeadingGastronomy == '1') {
                    html = '<div class="alert alert-warning" role="alert" style="display:none;">Whatsapp de contacto: '+whatsapp+'<br/> Su pedido estará listo dentro de: <strong>'+ orderPreparation +'</strong></div>';
                } else {
                    html = '<div class="alert alert-warning" role="alert" style="display:none;">Whatsapp de contacto: '+whatsapp+'</div>';
                }
                $('#numberWhatsapp').html(html);
                $('#numberWhatsapp div.alert').fadeIn();
            }
            break;
        case '6':
            if (whatsapp) {
                html = '<div class="alert alert-warning" role="alert" style="display:none;">Whatsapp de contacto: '+whatsapp+'</div>';
                $('#numberWhatsapp').html(html);
                $('#numberWhatsapp div.alert').fadeIn();
            }
            break;
        case '14':
            if (address) {
                html = '<div class="alert alert-warning" role="alert" style="display:none;">Dirección de la tienda: '+address+'</div>';
                $('#numberWhatsapp').html(html);
                $('#numberWhatsapp div.alert').fadeIn();
            } else {
                html = '<div class="alert alert-warning" role="alert" style="display:none;">Puede preguntar la dirección de la tienda al Whatsapp de contacto: '+whatsapp+'</div>';
                $('#numberWhatsapp').html(html);
                $('#numberWhatsapp div.alert').fadeIn();
            }
            break;
        case '3':
                html +=
                        '<h5>Código Postal</h5>'+
                        '<div class="form-group">'+
                            '<input placeholder="Ingrese el código postal" id="postal_code" class="cart-form-input w-50" value="" name="postal_code"/>'+
                        '</div>'+
                        '<h5>Código de estado o provincia</h5>'+
                        '<div class="form-group">'+
                            '<input placeholder="Ingrese el código de estado o provincia, ejemplo: VA" class="cart-form-input w-50" value="" id="province_code" name="province_code"/>'+
                        '</div>'+
                        '<h5>Código del país</h5>'+
                        '<div class="form-group">'+
                            '<div class="d-flex">'+
                                '<input id="country_code" placeholder="Ingrese el código del país, ejemplo: US" class="cart-form-input w-50 mr-4" value="" name="country_code"/>'+
                                '<button type="button" onClick="calcularFedex(event,this);" class="btn angulo-item-button">Calcular</button>'+
                            '</div>'+
                        '</div>'+
                        '<div id="selectService"></div>';
                $('#calcularEnvios').html(html);
            break;
        case '4':
                html += ''
                $('#calcularEnvios').html(html);
            break;
        case '5':
                html += ''
                $('#calcularEnvios').html(html);
            break;
        case '7':
                aexCity(shipping,whatsapp);
            break;
        case '8':
                $('.confirmar').attr('disabled','');
                html = ''+
                '<h5>Código Postal</h5>'+
                '<div class="input-group flex-column d-md-flex">'+
                    '<input type="text" class="cart-form-input w-50 mr-md-4" name="cod_postal" placeholder="Ingrese el código postal">'+
                    '<br><div class="input-group-append">'+
                        '<button data-action="quote-shipping" data-shipping="'+shipping+'" class="btn angulo-item-button" type="button" id="button-addon2" style="padding-bottom: 2px;padding-top: 2px;">Calcular</button>'+
                    '</div>'+
                '</div>'+
                '';
                $('#numberWhatsapp').html(html);
            break;
        case '10':
                html = ''+
                    '<h5>Whatsapp</h5>'+
                    '<div class="form-group">'+
                        '<input class="cart-form-input w-50" type="number" name="uber_telephono" placeholder="Ingrese su número de whatsapp" value="'+ $('#telephone').val() +'" required>'+
                    '</div>'+                    
                    '<h5>Dirección</h5>'+
                    '<div class="form-group">'+
                        '<input class="cart-form-input w-50" type="text" name="uber_direccion" placeholder="Ingrese su dirección" value="'+ $('#direccion').val() +'" required>'+
                    '</div>'+                    
                    '<h5>Indicaciones generales</h5>'+
                    '<div class="form-group">'+
                        '<textarea placeholder="Referencia" class="cart-form-input w-50" name="uber_description" id="description" cols="20" rows="5" required></textarea>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<div class="alert alert-warning" style=""><p style="white-space:pre-wrap;text-align:left;margin:0px">El costo se calcula con la dirección ingresada y será enviado vía whatsapp por el vendedor.</p></div>'+
                    '</div>'+
                '';
                $('#numberWhatsapp').html(html);
                $("#description").val($('#aclaracion').val());
            break;
        case '11':

            $('[name="localidad"]').val('');
            $('[name="localidad"]').addClass('d-none');
            $('[name="localidad_select"]').removeClass('d-none');
            $('[name="localidad_select"]').attr('required','');
            $('[name="localidad"]').removeAttr('required');
            html = ''+
            '<input type="text" name="cart-form-input w-50" class="form-control" placeholder="Ingrese el número de puerta" required/>'+
            '';
            $('#numberWhatsapp').html(html);
            ahivaLocalidades();
            checkPaqute();
            break;
        case '12':
            // $('.confirmar').attr('disabled','');
            total_pagar =   parseFloat($('input[name="total_pago"]').val());
            html = ''+
            '<div class="alert alert-warning text-left mt-2"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                '<p>Costo de envío: '+$('[name="symbol"]').val()+' '+200+'</p>'+
            '</div>'+
            '<input type="hidden" name="cart-form-input w-50 costo_envio" value="'+200+'">'+
            '';
            $('#calcularEnvios').html(html);
            $("#section-costo-envio").addClass("mt-4");
            $("#section-costo-envio").html('Costo de envío: <br>'+$("#symbol").val()+' '+200);
            if(descuento > 0)
            {
                if(Number.isInteger(total_pagar+parseFloat(200)- descuento)){
                    $("#section-costo-total").text($("#symbol").val() + '' + parseFloat(total_pagar+parseFloat(200)- descuento).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text($("#symbol").val() + '' + (parseFloat((total_pagar+parseFloat(200)- descuento).toFixed(2))).toLocaleString('en'));
                }
            }else{
                if(Number.isInteger(total_pagar+parseFloat(200))){
                    $("#section-costo-total").text($("#symbol").val() + '' + parseFloat(total_pagar+parseFloat(200)).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text($("#symbol").val() + '' + (parseFloat((total_pagar+parseFloat(200)).toFixed(2))).toLocaleString('en'));
                }
            }
            // $('#numberWhatsapp').html(html);
        break;
        case '13':
            html += '' +                
                '<div class="form-group">' +
                    '<select class="cart-form-input w-50 bg-light" disabled="" onchange="onChangeProvinciaEnviopack(event);" id="province_federal" name="province_federal">'+
                        '<option value="" selected="selected">Provincia</option>'+
                    '</select>'+
                '</div>' +
                '<div class="form-group">' +
                    '<select disabled class="cart-form-input w-50 bg-light" disabled="" required id="location_federal" name="location_federal">'+
                        '<option value="" selected="selected">Localidad</option>'+
                    '</select>'+
                '</div>' +
                '<br>' +
                '<div class="form-group">'+
                    '<h5>Código Postal</h5>'+
                    '<div class="d-flex">'+
                    '<input placeholder="Ingrese el código postal" id="postal_code_enviopack" class="cart-form-input w-50 mr-4" value="" name="postal_code" required/>'+
                    '<button type="button" onClick="calcularEnviopack(event,this);" class="btn angulo-item-button">Calcular</button>'+
                    '</div>'+
                '</div>';
            $('div#numberWhatsapp').html(html);
            loadProvincesEnvioPack();
        break;
    }
    updateCartCosts();
}

function loadProvincesEnvioPack() {
    var store_id = $('input[name="session_store_id"]').val();
    var dataRequest = {store_id: store_id, enviar_form: '1'};

    $.post(base_url + 'frontend/ajax/getProvincesEnvioPack', dataRequest, function(response, textStatus) {
        var htmType = '<option value="" selected="selected">Provincia</option>';

        var json = $.parseJSON(response);

        $.each(json.data.response, function(index, value) {
            htmType += '<option value="'+value.id+'">'+value.nombre+'</option>';
        });

        $("#province_federal").html(htmType);
        $("#province_federal").removeAttr('disabled');
    });
}

function onChangeProvinciaEnviopack(event) {
    var store_id = $('input[name="session_store_id"]').val();
    var provincia_id = $(event.target).val();

    $("select#location_federal").html('<option value="" selected="selected">Localidad</option>');
    $("select#location_federal").attr('disabled', '');

    if (provincia_id != '') {

        var dataRequest = {
            store_id: store_id,
            enviar_form: '1',
            provincia_id: provincia_id,
        };

        $.post(base_url + 'frontend/ajax/getLocationsEnvioPack', dataRequest, function(response, textStatus) {
            var htmType = '<option value="" selected="selected">Localidad</option>';

            var json = $.parseJSON(response);

            $.each(json.data.response, function(index, value) {
                htmType += '<option value="' + value.id + '">' + value.nombre + '</option>';
            });

            $("select#location_federal").html(htmType);
            $("select#location_federal").removeAttr('disabled');
        });

    }

}

function calcularEnviopack(event, element) {
    event.preventDefault();

    var store_id = $('input[name="session_store_id"]').val();
    var province = $('#province_federal').val();
    var postal_code = $('#postal_code_enviopack').val();

    $(element).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span> Espere por favor');
    $(element).attr('disabled','');

    const dataRequest = {
        enviar_form: '1',
        store_id: store_id,
        province: province,
        postal_code: postal_code,
    };

    $("#calcularEnvios").html('');

    $.post(base_url + 'frontend/ajax/presupuestoEnvioPack', dataRequest, function(response, textStatus) {
        var json = $.parseJSON(response);

        var envios_htm = '';
        var shipping_cost_default = 0;

        if (json.success) {

            envios_htm = '<h6 class="mt-2">Seleccionar Empresa de Correo</h6>'+
            '<input type="hidden" name="costo_envio" id="shipping_cost_default"/>'+
            '<ul class="list-group">';

            $.each(json.data, function(index, cotizacion) {

                if (index == 0) {
                    shipping_cost_default = parseFloat(cotizacion.valor);
                }

                envios_htm += '' +
                '<li class="list-group-item rounded-0">' +
                    '<div class="custom-control custom-checkbox">' +
                        '<input name="servicio_entrega" ' + (index == 0 ? 'checked' : '') + ' class="custom-control-input" id="customCheck'+index+'" type="radio" value="' + cotizacion.correo.id + '" action-service-shipping="change_service" data-value="' + cotizacion.valor + '">' +
                        '<label class="cursor-pointer d-block custom-control-label" for="customCheck'+index+'">' + cotizacion.correo.nombre + ' - Despacho: ' + (cotizacion.despacho == 'S' ? 'Sucursal' : 'Domicilio') + '<br /> $' + cotizacion.valor + ' - Envío: <strong>' + cotizacion.horas_entrega + 'hrs</strong></label>' +
                    '</div>' +
                '</li>';
            });

            envios_htm += '</ul>';

        } else {
            envios_htm = '' +
            '<div class="alert alert-warning mt-3">' +
                '<a href="#" class="close" data-dismiss="alert" data-target="alert">&times;</a> ' + json.data.message + 
            '</div>';
        }

        $("#calcularEnvios").html(envios_htm);
        $("#shipping_cost_default").val(shipping_cost_default);

        $(element).html('Calcular');
        $(element).removeAttr('disabled');
    });
}

function calcularFedex(event,element)
{
    event.preventDefault();
    var street = $('#direccion').val();
    var city = $('#ciudad').val();
    var postal_code = $('#postal_code').val();
    var province_code = $('#province_code').val();
    var country_code = $('#country_code').val();
    var store = $('#store').val();
    var metodo_pago = $('#metodo_pago').val();
    data = {
        street:street,
        city:city,
        postal_code:postal_code,
        province_code:province_code,
        country_code:country_code,
        store:store,
        metodo_pago:metodo_pago,
    }
    var htm = '';
    $.ajax({
        type: "POST",
        url: base_url + "frontend/ajax/apiFedexCotizacion",
        data: data,
        dataType: "JSON",
        beforeSend:function () {
            $(element).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Cargando</span>');
            $(element).attr('disabled','');
            $('#selectService').html('');
        }
    }).done(function (response) {
        if(response.success)
        {
            htm += '<input type="hidden" id="costo_envio" name="costo_envio" value=""/>'+
                    '<div class="form-group"><select name="select_service_fedex" class="form-control">';
            htm += '<option value="">Seleccione un Tipo de servico</option>'
            $.each(response.result, function (index, value) {
                htm += '<option data-price="'+value.TotalNetCharge+'" value="'+value.ServiceType+'">'+value.ServiceType+'</option>';
            });
            htm +='</select></div>';
            $('#selectService').html(htm);
        }else{
            swal('!Info¡','Para usar fedEx cague como mínimo 2 productos','warning');
        }
        $(element).html('Calcular');
        $(element).removeAttr('disabled');
    }).fail(function () {
        swal('!Error¡','Revise que sus códigos sean correctos al código postal','error');
        $(element).html('Calcular');
        $(element).removeAttr('disabled');
    });
}

$(document).on('change', 'input[action-service-shipping="change_service"]:checked', function(event) {
    var cost_shipping_service = $(this).attr('data-value');
    $("#shipping_cost_default").val(cost_shipping_service);
});

$(document).on('change','select[name="select_service_fedex"]',function (e) {
    var price_shipping = $(this).find('option:selected').data('price');
    var total_payed = $('#total_pagar').text();
    $('#costo_envio').val(parseFloat(price_shipping));
    totalPedido(parseFloat(total_payed), parseFloat(price_shipping));

})

$(document).on('change','#metodoEntrega',function () {
    var method = $(this).val();
    // console.log(method);
    // $.ajax({
    //     url: base_url + 'frontend/private/ajax_private/methodUPS',
    //     type: 'POST',
    //     dataType: 'json',
    //     data: {method:method},
    // })
    // .done(function(data)
    // {
    //     console.log(data);

    // })

});
$(document).on('change','input[name="codigo_sku"]',function (e) {
	e.preventDefault();
    var code = $(this).val();
    var product = $(this).attr('data-id');
    var input = $(this);
    if(code != ''){
        $.ajax({
            type: "POST",
            url: base_url + "frontend/private/ajax_private/findCode",
            data: {code:code,product:product},
            dataType: "JSON",
        }).done(function(response){
            if(response.success)
            {
                input.val('');
                swal('error','Este código ya existe','error');
            }
        }).fail(function () {
            console.log('error')
        });
    }
});

$(document).on('click','input[type="radio"][name="estrellas"]',function(e){
	e.preventDefault();
	var vote = $(this).val()
    var store_id = $(this).attr('data-id');
	$('input[type="radio"]').attr('disabled','');
	$.ajax({
		url: base_url + 'frontend/private/store/valoracionProduct',
		type: 'POST',
		dataType: 'json',
		data: {
			calificacion: vote,
			store_id: store_id
		},
		beforeSend:function(){

		}
	})
	.done(function(dataJson) {
		if(dataJson.success){
            swal({
                title: "Exitoso!",
                text: "La valoracion ha sido realizada!",
                type: "success"
            }, function() {
                location.reload();
            });

		}
	})
	.fail(function(){
		console.log('error')
	})
});


function aexCity(shipping,store) {
    var html = '',
        html_select ='';
    $('#calcularEnvios').html(html);
    $.ajax({
        url: base_url + 'frontend/private/ajax_private/AEXCity',
        type: 'POST',
        dataType: 'json',
        data: {
            shipping_id:shipping,
            store:store
        },
    })
    .done(function(data)
    {
        if (data.codigo == 0) {
            html_select='';
            html_select +='<option value=""> Ciudad de destino..</option>';
            $.each(data.datos, function (index, Element) {
                // console.log(Element);
                html_select +='<option value="'+Element.codigo_ciudad+'">'+Element.departamento_denominacion+' ('+Element.pais_denominacion+')</option>';
            });

            html += '' +
            '<div class="form-group">'+
                '<select class="form-control" id="aex_city_destination" name="aex_city_destination" data-shipping="'+shipping+'" data-store="'+store+'" required>'+
                    html_select+
                '</select>'+
            '</div>'+
            '<div class="form-group text-right">'+
                '<p> Tipo de moneda '+$('#type_currency').val()+' </p>'+
            '</div>'+
            '<div id="response_exclude"></div>'+
            '<div id="response_caculate"></div>';
            $('#calcularEnvios').html(html);
        }else{
            console.log('error');
        }

    })
}
// $(document).on('change','select#aex_type_package',function () {
//     var value = $(this).val();
//     $('[data-action="shipping-calculate"]').attr('data-package',value);
//     $('[data-action="request-service"]').attr('data-package',value);
// });
$(document).on('change','select#aex_city_destination',function () {
    $('[data-action="shipping-calculate"]').attr('data-destination',value);
    $('[data-action="request-service"]').attr('data-destination',value);
    var value = $(this).val();
    $('.confirmar').attr('disabled','');
    var destination = $(this).val(),
        package     = 'P',
        total_pagar =   parseFloat($('input[name="total_pago"]').val()),
        shipping    = $(this).attr('data-shipping'),
        store       = $(this).attr('data-store'),
        inpt_this   = $(this);
        code        = '',
        html        = '',
        html_exclude= '';
        total_pagar=parseFloat(total_pagar);
        $.ajax({
            url: base_url + 'frontend/private/ajax_private/shippingCalculate',
            type: 'POST',
            dataType: 'json',
            data: {
                shipping_id :shipping,
                store       :store,
                destination :destination,
                package     :package
            },
            beforeSend: function()
            {
                inpt_this.attr('disabled','').prepend('<i class="fa fa-spin fa-spinner"></i>');
            },
        })
        .done(function(data)
        {
            inpt_this.removeAttr('disabled').find('i.fa').remove();
            value ='';
            if (data.codigo == 0) {
                html_list = '';
                if (data.product_exclude.length > 0) {
                    html_li='';
                    $.each(data.product_exclude, function (indexInArray, valueOfElement) {
                        html_li +='<li>'+valueOfElement.codigo+'</li>'
                    });
                    html_list = 'Códigos de los productos que no se calcularon: '+
                    '<ul>'+
                        html_li+
                    '</ul>';

                }
                html_exclude += ''+
                '<div class="alert alert-warning text-left mt-2"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                    ''+data.datos[0].denominacion+' '+data.datos[0].descripcion+'<br>'+
                    '<p>Tiempo de entrega: '+data.datos[0].tiempo_entrega+'H</p>'+
                    html_list+
                '</div>';
                $("#response_exclude").html(html_exclude);
                $("#symbol").val();
                total_pagar = total_pagar + parseFloat(data.datos[0].costo_servicio);                
                if(Number.isInteger(total_pagar)){
                    $("#section-costo-total").text($("#symbol").val() + '' + parseFloat(total_pagar).toLocaleString('en')+".00");
                }else{        
                    $("#section-costo-total").text($("#symbol").val() + '' + (parseFloat((total_pagar).toFixed(2))).toLocaleString('en'));
                }                
                $("#calcule_aex").html($("#symbol").val()+' '+total_pagar);

                // $('[data-action="request-service"]').removeClass('d-none');
                $('.confirmar').removeAttr('disabled');
                formRequestService(
                    destination,
                    store
                );

            }else{
                swal('Informativo','La lista de productos no se pudo calcular','warning');
            }
        })
});
$(document).on('click','.confirmar',function () {
    // e.preventDefault();
    var status = true;
    $('#formCarrito .form-control').each(function(index) {
        var attr = $(this).attr('required');
        if (typeof attr !== typeof undefined && attr !== false && $(this).hasClass('d-none') != false) {
            if ($(this).val()=="" || $(this).val() == null) {
                $(this).closest('.form-group').addClass('has-error');
                status = false;
            }
        }
    });
    if (!status) {
        swal('Error','Complete todos los campos del formulario','error');
    }
});
$(document).on('change','#metodo_pago',function () {
    const totalPagar = Number(jQuery('input[name="total_pago"]').val());    
    const value = jQuery(this).val();
    const descuentoMetodoPago = jQuery("#descuento_metodo_pago");
    const descuentoMetodoPagoPorcentaje = jQuery("#descuento_metodo_pago_porcentaje");
    const descuentoMetodoPagoId = jQuery("#descuento_metodo_pago_id");
    const sectionDescuentoMetodoPago = jQuery("#section-descuento-metodo-pago");
    const store = $('#store').val();
    const moneda = jQuery("#symbol").val();
    const esServicio = jQuery('#service').length;

    descuentoMetodoPago.val('');
    descuentoMetodoPagoPorcentaje.val('');
    descuentoMetodoPagoId.val('');
    sectionDescuentoMetodoPago.addClass('d-none-important');
    sectionDescuentoMetodoPago.html('');

    if (esServicio > 0) {
        jQuery.ajax({
            url: base_url + 'frontend/private/ajax_private/getDiscountPaymentMethodByStore',
            type: 'GET',
            dataType: 'json',
            data: { payment_method: value, store_id: store, total: totalPagar }
        }).done(function(response) {
            if (response.success && response.data) {
                const data = response.data;
                const percentage = Number(data.percentage);
                const message = 'Pagando con ' + (data.all_payment_method ? 'todos los métodos de pago' : data.payment_method);
                descuentoMetodoPagoMonto = (totalPagar * percentage) / 100;
                if (Number(data.is_price_range)) {
                    html = `<div class="d-flex justify-content-end">
                        <div class="d-flex flex-column mr-2">
                            <span>Descuento</span>
                            <small>${percentage.toFixed(0)}% OFF para pedidos superiores a ${moneda}${Number(data.minimum_price).toFixed(2)}</small>
                            <small>${message}</small>
                        </div>
                        <span class="text-discount">(${moneda}${descuentoMetodoPagoMonto.toFixed(2)})</span>
                    </div>`;
                } else {
                    html = `<div class="d-flex justify-content-end">
                        <div class="d-flex flex-column mr-2">
                            <span>Descuento</span>
                            <small>${percentage.toFixed(0)}% OFF</small>
                            <small>${message}</small>
                        </div>
                        <span class="text-discount">(${moneda}${descuentoMetodoPagoMonto.toFixed(2)})</span>
                    </div>`;
                }
                sectionDescuentoMetodoPago.html(html);
                descuentoMetodoPago.val(descuentoMetodoPagoMonto);
                descuentoMetodoPagoPorcentaje.val(percentage);
                descuentoMetodoPagoId.val(data.id_discount_payment_method);
                sectionDescuentoMetodoPago.removeClass('d-none-important');
            }
        }).fail(function() {
            console.log("error");
        });
    }
    changePaymentMethod($("#metodo_pago"));
});
function changePaymentMethod(element) {
    var metodo_pago = $(element).val();
        store_id = $('#store').val();
        $('#inpNumber').html('');
    if (metodo_pago == 8) {

        $.ajax({
            url: base_url + 'frontend/private/ajax_private/totalCar',
            type: 'POST',
            dataType: 'json',
            data: {
                store_id:store_id,
            },
            beforeSend: function()
            {

            },
        })
        .done(function(data)
        {
			var currency = $('#symbol').val();            
            if (data < 1000) {
                swal('Informativo', ' El total de su compra debe ser mínimo de '+ currency +'1000 para pagar con Pagopar','warning');
                $("#metodo_pago option[value='']").attr("selected",true);
            }

        })
    }

    if (metodo_pago == 6) {
        var banco = $('#banco').val();
        var html = '<div class="alert alert-warning" style="display:none;"><p style="white-space:pre-wrap;text-align:left;margin:0px">'+banco+'</p></div>';
        $('#inpNumber').html(html);
        $('#inpNumber div.alert').fadeIn();
    }

    if(metodo_pago == 10)
    {
        var html = '';
        $.ajax({
            url: base_url + 'frontend/private/ajax_private/dlocalpayments',
            type: 'POST',
            dataType: 'json',
            data: {
                store_id:store_id,
            },
            beforeSend: function()
            {

            },
        })
        .done(function(dataJson)
        {
            if(dataJson.success)
            {
                html = '<input type="hidden" id="type_method" name="type_method" value="" /><select name="method_dlocal" class="form-control">';
                $.each(dataJson.data, function (index, value) {
                    html += '<option data-type="'+value.type+'" value="'+value.id+'">'+value.name+'</option>';
                });
                html += '</select></br>';
                $('#inpNumber').html(html);
            }
        })
    }

    updateCartCosts();
};
$(document).on('change','select[name="method_dlocal"]',function (e) {
    e.preventDefault();
    var valor = $(this).val();
    var attr = '';
    if(valor)
    {
        attr = $('option[value="'+valor+'"]').attr('data-type');
        $('#type_method').val(attr);
    }else{
        $('#type_method').val('');
    }
});
function formRequestService(destination_city,store) {
    var html    =   '',
        html_sender =   '',
        html_pickup =   '',
        html_delivery   =   '';

    html = ''+
    '<nav>'+
        '<div class="nav nav-tabs" id="nav-tab" role="tablist">'+
            '<a class="nav-link active" id="nav-destinatario-tab" data-toggle="tab" href="#nav-destinatario" role="tab" aria-controls="nav-destinatario" aria-selected="true">Destinatario</a>'+
            '<a class="nav-link" id="nav-entrega-tab" data-toggle="tab" href="#nav-entrega" role="tab" aria-controls="nav-entrega" aria-selected="false">Entrega</a>'+
        '</div>'+
    '</nav>'+
    '<div class="tab-content pt-3" id="nav-tabContent">'+
        '<div class="tab-pane fade show active" id="nav-destinatario" role="tabpanel" aria-labelledby="nav-destinatario-tab">'+
            '<div class="row">'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<label>Personeria </label>'+
                        '<select class="form-control" name="destinatario_personeria" required>'+
                            '<option value="">Seleccione...</option>'+
                            '<option value="F">Física</option>'+
                            '<option value="J">Jurídica</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<label>Tipo de documento </label>'+
                        '<select class="form-control" name="destinatario_type_document" required>'+
                            '<option value="">Seleccione...</option>'+
                            '<option value="RUC">RUC</option>'+
                            '<option value="CIP">Cédula de identidad personal</option>'+
                            '<option value="PAS">Pasaporte</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<label>Fecha de nacimiento </label>'+
                        '<input class="form-control" type="date" name="destinatario_date" required>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="tab-pane fade" id="nav-entrega" role="tabpanel" aria-labelledby="nav-entrega-tab">'+
            '<div class="row">'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<input class="form-control" type="hidden" name="entrega_code" value="'+store+'">'+
                        '<input class="form-control" type="hidden" name="destinatario_city" value="'+destination_city+'">'+
                        '<label>Número de casa </label>'+
                        '<input class="form-control" type="number" name="entrega_numero_casa" placeholder="Número de casa" required>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<label>Calle transversal </label>'+
                        '<input class="form-control" placeholder="Calle transversal" type="text" name="entrega_calle_transversal_1" required>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<label>Referencias </label>'+
                        '<textarea class="form-control" type="text" name="entrega_referencias" placeholder="Referencias" required></textarea>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="form-group">'+
                        '<label>Comentario </label>'+
                        '<textarea class="form-control" type="text" name="entrega_comentario" placeholder="Comentario" required></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="row">'+
        '<div class="col-md-12" id="response-condirmation">'+
        '</div>'+
    '</div>'+
    '';
    $("#form-solicitar").html(html);
}
$(document).on('click','[data-action="form-confirm"]',function () {
    var status = true ,
        inpt_this        = $(this),
        id_solicitud     = $('[name="id_solicitud"]').val(),
        id_tipo_servicio = $('[name="id_tipo_servicio"]').val(),

        shipping         = $('[data-action="shipping-calculate"]').attr('data-shipping'),
        store            = $('[data-action="shipping-calculate"]').attr('data-store'),

        destinatario_code           = $('#destinatario_code').val(),
        destinatario_type_document  = $('[name="destinatario_type_document"]').val(),
        destinatario_number_document= $('#dni').val(),
        destinatario_name           = $('#name').val(),
        destinatario_last_name      = $('#last_name').val(),
        destinatario_email          = $('#email').val(),
        destinatario_personeria     = $('[name="destinatario_personeria"]').val(),
        destinatario_date           = $('[name="destinatario_date"]').val(),
        destinatario_telephone      = $('#telephone').val();


    var entrega_codigo              = $('[name="entrega_code"]').val(),
        entrega_calle_principal     = $('#ciudad').val(),
        entrega_numero_casa         = $('[name="entrega_numero_casa"]').val(),
        entrega_calle_trasnversal   = $('[name="entrega_calle_transversal_1"]').val(),
        entrega_city                = $('[name="destinatario_city"]').val(),
        entrega_referencias         = $('[name="entrega_referencias"]').val(),
        entrega_comentario          = $('[name="entrega_comentario"]').val(),



    destinatario={
        "codigo": destinatario_code,
        "tipo_documento": destinatario_type_document,
        "numero_documento": destinatario_number_document,
        "nombre":destinatario_name,
        "apellido":destinatario_last_name,
        "email":destinatario_email,
        "personeria":destinatario_personeria,
        "fecha_nacimiento":destinatario_date,
        "telefonos":destinatario_telephone
    };
    entrega={
        "codigo":entrega_codigo,
        "calle_principal": entrega_calle_principal,
        "numero_casa": entrega_numero_casa,
        "calle_transversal_1": entrega_calle_trasnversal,
        "calle_transversal_2": "",
        "codigo_ciudad": entrega_city,
        "referencias": entrega_referencias,
        "Comentario": entrega_comentario,
    };
    confirmar = {
        "id_solicitud":id_solicitud,
        "id_tipo_servicio":id_tipo_servicio
    };
    $('#formCarrito .form-control').each(function(index) {
        var attr = $(this).attr('required');
        if (typeof attr !== typeof undefined && attr !== false) {
            if ($(this).val()=="" || $(this).val() == null) {
                $(this).closest('.form-group').addClass('has-error');
                status = false;
            }
        }
    });
    if (status) {
        $.ajax({
            url: base_url + 'frontend/private/ajax_private/confirmService',
            type: 'POST',
            dataType: 'json',
            data: {
                shipping_id :shipping,
                store       :store,
                destinatario    :destinatario,
                entrega         :entrega,
                confirmar       :confirmar
            },
            beforeSend: function()
            {
                inpt_this.attr('disabled','').prepend('<i class="fa fa-spin fa-spinner"></i>');
            },
        })
        .done(function(data)
        {
            inpt_this.removeAttr('disabled').find('i.fa').remove();
            value ='';
            if (data.codigo == 0) {
                html = '<div class="alert alert-warning text-left mt-2"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                    ''+data.datos[0].tipo_evento+'<br> Estado del envío: '+data.datos[0].estado+'<br>'+
                    value+
                '</div>';
                $('#response-condirmation').html(html);
                $('.confirmar').removeAttr('disabled');
            }
        })
    }else{
        swal('Error','Rellene los formularios','error');
    }


});
$(document).on('click','[data-action="cod-price"]',function (e) {
    e.preventDefault();
    var input_moto = $('#cod_post_price'),
        html_input = '',
        uniqueId = uniqid();
    html_input = ''+
    '<div class="row" data-id="'+uniqueId+'">'+
        '<div class="col-md-5">'+
            '<div class="form-group">'+
                '<input placeholder="Código postal" class="form-control" type="number" name="number_post['+uniqueId+'][]" >'+
            '</div>'+
        '</div>'+
        '<div class="col-md-5">'+
            '<div class="form-group">'+
                '<input placeholder="Precio de envío" class="form-control" type="number" name="price['+uniqueId+'][]" >'+
            '</div>'+
        '</div>'+
        '<div class="col-md-2">'+
            '<div class="form-group">'+
                '<a href="#" data-id="'+uniqueId+'" title="Eliminar" data-action="delete-codprice">'+
                    '<i class="fa fa-trash-alt icon-categories pt-2"></i>'+
                '</a>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '';
    input_moto.append(html_input);

});
$(document).on('click','[data-action="delete-codprice"]',function (e) {
    e.preventDefault();
    var data_id = $(this).attr('data-id');
    $('div[data-id="'+data_id+'"]').remove();
});
function uniqid() {
	var n = Math.floor(Math.random() * 11);
	var k = Math.floor(Math.random() * 1000000);
	var uniqueId = k;
	return uniqueId;
}
function motoPropia(data) {
    var input_moto = $('#cod_post_price'),
        html_input = '',
        contar     = 0;

    $('#cod_post_price div.row').each(function() {
        contar = contar + 1;
    });
    if (contar==0) {
        // console.log('vacio');
    }else{
        // console.log('lleno');
    }

    $.each(data, function (index, Element) {
        var uniqueId = uniqid();
        html_input = ''+
            '<div class="row" data-id="'+uniqueId+'">'+
                '<div class="col-md-5">'+
                    '<div class="form-group">'+
                        '<input placeholder="Código postal" class="form-control" type="number" name="number_post['+uniqueId+'][]" value="'+Element.postal_code+'" >'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<div class="form-group">'+
                        '<input placeholder="Precio de envío" class="form-control" type="number" name="price['+uniqueId+'][]" value="'+Element.price+'" >'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-2">'+
                    '<div class="form-group">'+
                        '<a href="#" data-id="'+uniqueId+'" title="Eliminar" data-action="delete-codprice">'+
                            '<i class="fa fa-trash-alt icon-categories pt-2"></i>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '';
        $('#cod_post_price').append(html_input);
    });
}

    function uberFlash(data) {

        var input_moto = $('#uber_cod'),
            html_input = '',
            contar     = 0;

        $('#uber_cod div.row').each(function() {
            contar = contar + 1;
        });
        if (contar==0) {
            // console.log('vacio');
        }else{
            // console.log('lleno');
        }

        $.each(data, function (index, Element) {
            var uniqueId = uniqid();
            html_input = ''+
                '<div class="row" data-id="'+uniqueId+'">'+
                    '<div class="col-md-5">'+
                        '<div class="form-group">'+
                            '<input placeholder="Código postal" class="form-control" type="number" name="uber_post['+uniqueId+'][]" value="'+Element.postal_code+'" >'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<div class="form-group">'+
                            '<input placeholder="Precio de envío" class="form-control" type="number" name="uber_price['+uniqueId+'][]" value="'+Element.price+'" >'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-2">'+
                        '<div class="form-group">'+
                            '<a href="#" data-id="'+uniqueId+'" title="Eliminar" data-action="delete-codprice">'+
                                '<i class="fa fa-trash-alt icon-categories pt-2"></i>'+
                            '</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '';
            $('#uber_cod').append(html_input);
        });

    }


    $(document).on('click','[data-uber="cod-price"]',function (e) {
        e.preventDefault();
        var input_moto = $('#uber_cod'),
            html_input = '',
            uniqueId = uniqid();
        html_input = ''+
            '<div class="row" data-id="'+uniqueId+'">'+
                '<div class="col-md-5">'+
                    '<div class="form-group">'+
                        '<input placeholder="Código postal" class="form-control" type="number" name="uber_post['+uniqueId+'][]" >'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<div class="form-group">'+
                        '<input placeholder="Precio de envío" class="form-control" type="number" name="uber_price['+uniqueId+'][]" >'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-2">'+
                    '<div class="form-group">'+
                        '<a href="#" data-id="'+uniqueId+'" title="Eliminar" data-delete="uber-codprice>'+
                            '<i class="fa fa-trash-alt icon-categories pt-2"></i>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '';
        input_moto.append(html_input);

    });
    $(document).on('click','[data-delete="uber-codprice"]',function (e) {
        e.preventDefault();
        var data_id = $(this).attr('data-id');
        $('div[data-id="'+data_id+'"]').remove();
    });
    function ahivaLocalidades() {
        var html ='';
        $.ajax({
            url: base_url + 'frontend/private/ajax_private/ahivaLocalidades',
            type: 'GET',
            dataType: 'json',
            data: {
            },
            beforeSend: function()
            {
                $('[name="localidad_select"]').attr('disabled','');
            },
        })
        .done(function(data)
        {

            if (data) {
                $('[name="localidad_select"]').removeAttr('disabled');
                html = '<option value="">Seleccione..</option>';
                $.each(data, function (index, element) {
                    html += '<option value="'+element.correoBanc+'">'+element.nombre+'</option>';
                });
                $('[name="localidad_select"]').html(html);
            }
        })
    }
    function checkPaqute() {
        var store_id = $('[name="store"]').val();
        var html = '';
        $.ajax({
            url: base_url + 'frontend/private/ajax_private/checkPaqute',
            type: 'POST',
            dataType: 'json',
            data: {
                store_id:store_id
            },
            beforeSend: function()
            {
            },
        })
        .done(function(data)
        {

            if (data.success) {
                html = ''+
                '<div class="alert alert-warning mt-4" style="">'+
                    '<p style="white-space:pre-wrap;text-align:left;margin:0px">'+data.text+'</p>'+

                    '<ul>';

                    $.each(data.data, function (index, element) {
                        html += '<li>'+element.referencia+'</li>';
                    });
                    html +='</ul>'+
                    '</div>'+
                '';
                $('#calcularEnvios').html(html);
            }else{

                $('[name="localidad"]').removeClass('d-none');
                $('[name="localidad_select"]').addClass('d-none');
                $('[name="localidad_select"]').removeAttr('required');
                $('[name="localidad_select"]').html('');
                $('#numberWhatsapp').html(html);
                swal(data.title,data.text,data.type);
                $("#metodoEntrega option[value='']").attr("selected",true);
            }
        })

    }
$(document).on('click','.apply-cupon',function (e) {
    e.preventDefault();
    var cupon = $('#cupon').val();
    var store = $('#store').val();
    var total_pagar = parseFloat($('input[name="total_pago"]').val());    
    costo_envio = parseFloat($('input[name="costo_envio"]').val());    
    jQuery('input[name="descuento_cupon"]').val('');
    jQuery('input[name="nombre_cupon"]').val('');
    jQuery('input[name="id_cupon"]').val('');
    jQuery("#section-cupon").html('');
    jQuery("#section-cupon").removeClass("mt-4");
    const esServicio = jQuery('#service').length;
    if (cupon != '' && cupon != null) {
        $.ajax({
            type: "POST",
            url: base_url + "frontend/ajax/getCodeCupon",
            data: {code:cupon,store:store},
            dataType: "json",
        }).done(function (response) {
            if (response.success) {
                const amount = Number(response.data.amount);
                const percent = (amount/100);
                const total = Number(total_pagar*percent).toFixed(2);
                jQuery("#section-cupon").addClass("mt-4");
                if (esServicio > 0) {
                    html = `<div class="d-flex justify-content-end gap-5">
                        <div class="d-flex flex-column">
                            <span>Cupón de descuento</span>
                            <small>${response.data.name}</small>
                        </div>
                        <div class="d-flex align-items-center gap-5">
                            <span class="text-discount">(${jQuery("#symbol").val()} ${total})</span>
                            <button type="button" class="btn btn-sm btn-danger" data-action="delete-discount" title="Eliminar cupón"><i class="fa fa-trash-alt"></i></button>
                        </div>
                    </div>`;
                } else {
                    html = `<div class="d-flex flex-column">
                        <span>Cupón de descuento</span>
                        <small>${response.data.name}</small>
                    </div>
                    <div class="d-flex align-items-center gap-5">
                        <span class="text-discount">(${jQuery("#symbol").val()} ${total})</span>
                        <button type="button" class="btn btn-sm btn-danger" data-action="delete-discount" title="Eliminar cupón"><i class="fa fa-trash-alt"></i></button>
                    </div>`;
                }
                jQuery('[data-block="apply-cupon"]').addClass('d-none-important');
                jQuery("#section-cupon").html(html);
                jQuery('input[name="descuento_cupon"]').val(total);
                jQuery('input[name="nombre_cupon"]').val(response.data.name);
                jQuery('input[name="id_cupon"]').val(response.data.id_cupon);
            } else {
                swal('Error',response.message,'error');
            }
            updateCartCosts();
        }).fail(function () {
            console.log('error');
        });
    } else {
        swal('Error','Ingrese un cupón','error');
        updateCartCosts();
    }
});

jQuery(document).on('click','[data-action="delete-discount"]',function (event) {
    event.preventDefault();
    const block = jQuery('[data-block="apply-cupon"]');
    jQuery("#section-cupon").html('');
    block.find('#cupon').val('');
    block.removeClass('d-none-important');
    jQuery('input[name="descuento_cupon"]').val('');
    jQuery('input[name="nombre_cupon"]').val('');
    jQuery('input[name="id_cupon"]').val('');
    updateCartCosts();
});

function addService(event) {
    event.preventDefault();

    var rowService = ''+
    '<tr>'+
        '<td>'+
            '<input type="text" name="operativa_name[]" placeholder="Envío a domicilio" required value="" class="form-control"/>'+
        '</td>'+
        '<td>'+
            '<input type="text" name="operativa_number[]" placeholder="123456" required value="" class="form-control"/>'+
        '</td>'+
        '<td>'+
            '<select name="operativa_type[]" required class="form-control">'+
                '<option value="">Seleccionar</option>'+
                '<option value="1">Puerta a Sucursal</option>'+
                '<option value="2">Puerta a Puerta</option>'+
                '<option value="3">Sucursal a Puerta</option>'+
                '<option value="4">Sucursal a Sucursal</option>'+
            '</select>'+
        '</td>'+
        '<td align="right" width="50">'+
            '<a class="btn btn-sm btn-danger text-white" data-action="delete-service-oca"><i class="fa fa-trash-alt"></i></a>'+
        '</td>'+
    '</tr>';
    $('table[data-table="operatives-oca"]').find('tbody').append(rowService);
}

function loadServicesOCA() {

    $.ajax({
        url: base_url + 'frontend/private/ajax_private/getServicesOCA',
        type: 'POST',
        dataType: 'json',
        data: {
            enviar_form: '1',
        },
    })
    .done(function(dataJson) {

        var htmOperativas = '';

        $.each(dataJson.data, function(index, value) {
            htmOperativas += '<option data-mode="' + value.mode + '" value="' + value.operative + '" >' + value.name + '</option>';
        });

        var htmServices = ''+
        '<div class="form-group">'+
            '<h5 for="operativa">Operativa</h5>'+
            '<select class="cart-form-input w-50" name="operativa" id="operativa">'+
                htmOperativas +
            '</select>'+
        '</div>'+
        '<div class="form-group">'+
            '<h5 for="cp_destino">Código Postal</h5>'+
            '<div class="d-flex">'+
                '<input type="number" class="cart-form-input w-50 mr-4" id="cp_destino" name="codigo_postal" placeholder="Ingrese el código postal" required>'+
                '<button type="button" class="btn angulo-item-button" data-action="calculate-oca">Calcular</button>'+
                '</div>'+
        '</div><br>'+
        '<input type="hidden" name="carrito" id="carrito" value="si">'+
        '<div class="form-group" id="select-sucursales" style="display:none;">'+
            '<label>Dirección de envío</label>'+
            '<select class="form-control" name="sucursal_direccion">'+
            '</select>'+
        '</div>'+        
        '<div id="cargando_webservice_producto_ficha" style="display:none;">'+
            '<div align="center" class="mt-2 mb-2">'+
                '<i style="margin-top:15px;" class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>'+
            '</div>'+
        '</div>'+
        '<div id="oca_webservice_response"></div>';

        $("#calcularEnvios").html(htmServices);

        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

};

$(document).on('click', 'a[data-action="delete-service-oca"]', function(event) {
    event.preventDefault();
    var elementTarget = $(this);
    elementTarget.closest('tr').remove();
});

$(document).on('click', 'button[data-action="calculate-oca"]', function(event) {
    event.preventDefault();
    $("#oca_webservice_response").html('');
    $("#cargando_webservice_producto_ficha").show();

    /*DATOS*/

    var postal = $("#cp_destino").val();
    var operative = $("#operativa").val();

    /*DATOS*/    
    var sucursales = [];
    var operativa = $("#operativa").val();
    var existe_sucursal_oca = false;

    var operative_mode = $("#operativa").find('option[value="' + operativa + '"]').attr('data-mode');    

    if (operativa != '') {
        var store_id = $('input[name="session_store_id"]').val();

        $.ajax({
            url: base_url + 'frontend/private/ajax_private/costosEnviosPostal',
            type: 'POST',
            data: {
                carrito: '1',
                cp_destino: postal,
                operativa: operative,
                store_id: store_id,
                mode: operative_mode,
            },
            dataType: 'json',
            success: function (data) {
                $("#cargando_webservice_producto_ficha").hide();

                if(data.estado) {

                    html_document = '<ul class="list-group" style="margin-top:15px;">';

                    if(typeof data.oca[0].Oca_Sucursal !== 'undefined'){

                        if(data.oca[0].Oca_Sucursal.length>0) {
                        
                            //sucursal = data.oca[0].Oca_Sucursal[0].Provincia+', '+data.oca[0].Oca_Sucursal[0].Localidad+', '+data.oca[0].Oca_Sucursal[0].Calle+' - '+data.oca[0].Oca_Sucursal[0].Numero
                            
                            sucursales = data.oca[0].Oca_Sucursal;
                            //DESCOMENTAR
                            //html_document += '<li class="list-group-item">Sucursal <b class="pull-right">'+sucursal+'</b></li>';
                            //$("#sucursal_entrega").val(sucursal);

                            if (operative_mode == "1" || operative_mode == "4") {
                                var htm = '';

                                $.each(sucursales,function(key,value){
                                    htm = htm + '<option value="'+(value.Calle).trim()+', '+(value.Descripcion).trim()+', '+(value.Localidad).trim()+', N° '+(value.Numero).trim()+'">'+(value.Calle).trim()+', '+(value.Descripcion).trim()+', '+(value.Localidad).trim()+', N° '+(value.Numero).trim()+'</option>';
                                })

                                $("#select-sucursales select").html(htm);
                                
                                $("#select-sucursales").show();

                                var value = $("#select-sucursales select").val();

                                $("#sucursal_entrega").val(value);
                            }

                            existe_sucursal_oca = true;

                        } else {
                            existe_sucursal_oca = false;
                        }
                    } else {
                      existe_sucursal_oca = true;
                    }

                    if (typeof modo_entrega !== 'undefined' && modo_entrega == 4) {
                      html_document += '<li class="list-group-item">Plazo de entrega <b class="pull-right">24 Hrs</b></li>';
                    } else {
                        html_document += '<li class="list-group-item">Plazo de entrega <b class="pull-right">'+data.oca[0].PlazoEntrega+' Días hábiles</b></li>';
                    }

                    var precio = data.oca[0].Precio;
                    var precio_total = data.oca[0].Total;

                    if (typeof modo_entrega !== 'undefined' && modo_entrega == 4) {
                        html_document += '<li class="list-group-item">Precio <b class="pull-right">$117+Iva</b></li>';
                    }else{
                        html_document += '<li class="list-group-item">Precio <b class="pull-right">$'+precio+'+Iva</b></li>';
                    }

                    html_document += '<li class="list-group-item">Serv. Adicionales <b class="pull-right">'+data.oca[0].Adicional+'</b></li>';

                    if (typeof modo_entrega !== 'undefined'&&modo_entrega==4){
                        html_document += '<li class="list-group-item">Total <b class="pull-right" id="total_costo_envio">$117+Iva</b></li>';
                    } else {
                        html_document += '<li class="list-group-item">Total <b class="pull-right" id="total_costo_envio">$'+formatNumber(precio_total)+'+Iva</b></li>';
                    }

                    html_document += '</ul>';

                    if(typeof modo_entrega !== 'undefined'&&modo_entrega==4){
                        html_document += '<input type="hidden" name="costo_envio" id="costo_envio" value="90">';
                    }else{
                        html_document += '<input type="hidden" name="costo_envio" id="costo_envio" value="'+formatNumber(precio_total)+'">';
                    }                                        
                    if ($('input[name="total_pago"]').length > 0) {

                        var costo_total_carrito = $('input[name="total_pago"]').val();
                        costo_total_carrito = parseInt(costo_total_carrito);

                        if (typeof modo_entrega !== 'undefined' && modo_entrega == 4) {
                            var costo_envio = 117;
                        } else {
                            var costo_envio = data.oca[0].Total;
                        }                        

                        if (typeof modo_entrega !== 'undefined' && modo_entrega == 4) {                            
                            costo_envio = costo_envio*1;
                            costo_envio = Math.round(costo_envio*1.21);
                        } else {                            
                            costo_envio = Math.round(costo_envio*1.21);
                        }                        

                        $("#total_carrito_envio").text(costo_total_carrito);
                        $('#formulario_comprar').find('button[type="submit"]').prop('disabled', false);

                        $("#costo_envio").val(costo_envio);
                        $("#section-costo-envio").addClass("mt-4");
                        $("#section-costo-envio").html('<span>Entrega </span><span>' + $("#symbol").val() +Number(costo_envio).toFixed(2)+'</span>');
                        if(Number.isInteger(costo_envio + costo_total_carrito)){
                            $("#section-costo-total").text($("#symbol").val() + '' + parseFloat(costo_envio + costo_total_carrito).toLocaleString('en')+".00");
                        }else{        
                            $("#section-costo-total").text($("#symbol").val() + '' + (Number((costo_envio + costo_total_carrito).toFixed(2))).toLocaleString('en'));
                        }
                    }

                } else {
                    html_document = '<div class="alert alert-danger">Imposible calcular costo de envío.</div>';
                }

                if(typeof modo_entrega !== 'undefined'&&modo_entrega==4){
                    $("#info_envio_detalle_elockers").html(html_document);
                }

                if (existe_sucursal_oca) {
                    $("#oca_webservice_response").html(html_document);
                } else {
                    $("#oca_webservice_response").html('<br><span class="text-danger">No se encontre una sucursal OCA para el CP : '+postal+'</span>');
                }

            },
            complete: function() {
                var operativa = $("#operativa").val();
                var operative_mode = $("#operativa").find('option[value="' + operativa + '"]').attr('data-mode');

                if (operative_mode == "2" || operative_mode == "3") {
                    $("#sucursal_entrega").val('');
                    $("#select-sucursales select").html('<option value="">Ninguno</option>');
                    $("#select-sucursales").hide();
                }

            },
            error:function() {
                console.log('error');
            }
        });
    }
});

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
/*
$(document).on('click', '[data-action="show-orders-list"]', function(event) {
    event.preventDefault();
    $('#advanced-filters-orders').show();
});*/
function onChangeOrder(event) {
    var select = $(event.target);
    var order = select.val();
    select.closest('form')[0].submit();
}

window.onload = function(){//window.addEventListener('load',function(){...}); (for Netscape) and window.attachEvent('onload',function(){...}); (for IE and Opera) also work
    $(".fancybox.template").fancybox({       
        "title"  : function(){        
        return '<form action="'+$(this).attr("data-fancybox-title")+'" method="POST" enctype="multipart/form-data" class="col-md-6 post-fancy"> <input id="idtemplate" name="idtemplate" type="hidden" value="'+$(this).attr("rel")+'"> <button type="submit"class="btn btn-primary btn-private-selecction activar">SELECCIONAR</button></form>' 
         }
     });

     $(".fancybox.template-active").fancybox({       
        "title"  : function(){        
        return '<a href="'+$(this).attr("rel")+'" class="btn button-profile btn-primary btn-padding-private mb-0">PERSONALIZAR</a>  ' 
         }
     });       
}


jQuery('.input-letters').keypress(function(tecla) {
    var event = tecla.charCode || tecla.keyCode;
    var re = /^[a-zÑñ áÁéÉíÍóÓúÚ]+$/i;
    return re.test(String.fromCharCode(event));
});

jQuery(document).on('click', '[data-action="view-discounts"]', function() {
    const button = jQuery(this);
    const payment_method = Number(button.data('payment-method'));
    const modal = jQuery('#discount-modal');
    const modalBody = modal.find('.modal-body');
    const moneda = jQuery("#symbol").val();
    const totalPagar = Number(jQuery('input[name="total_pago"]').val());
    modalBody.html('');

    let discountTotal = 0;
    const discounts = discountsPaymentMethods.filter(element => (Number(element.id_payment_method) === payment_method || Number(element.all_payment_method)));
    if (discounts.length > 0) {
        discounts.forEach(element => {
            discountTotal = totalPagar * (1 - Number(element.percentage) / 100);
            modalBody.append(`<div class="card" data-discount="${element.id_discount_payment_method}">
                <div class="discount-banner">${(Number(element.all_payment_method) ? 'Todos los métodos de pago' : '<span class="text-capitalize">'+element.payment_method+'</span>')} ${Number(element.percentage).toFixed(0)}% OFF</div>
                <div class="card-body card-body-discount text-dove-gray-500">
                    <p>
                        <strong>${Number(element.percentage).toFixed(0)}% de descuento</strong> ${Number(element.all_payment_method) ? 'con todos los medios de pago' : 'pagando con ' + element.payment_method}
                        ${(Number(element.is_price_range) ? '<strong>superando los ' + moneda + ' ' + Number(element.minimum_price).toFixed(2) + '</strong>' : '')}
                    </p>
                    <p class="font-weight-bold mb-0">
                        Total:
                        <span class="original-discount-price">${moneda} ${totalPagar.toFixed(2)}</span>
                        <span class="discount-price">${moneda} ${discountTotal.toFixed(2)}</span>
                    </p>
                    <small class="text-muted">El descuento será aplicado sobre el costo total de la compra (sin envío) al finalizar la misma.</small>
                </div>
            </div>`);
        });
        modal.modal('show');
    }
});

function updateCartCosts() {
    const totalPagar = Number(jQuery('input[name="total_pago"]').val());
    const costoEnvio = Number(jQuery('input[name="costo_envio"]').val());
    const descuentoCupon = Number(jQuery('input[name="descuento_cupon"]').val());
    const descuentoMetodoPago = Number(jQuery("#descuento_metodo_pago").length > 0 ? jQuery("#descuento_metodo_pago").val() : 0);
    const moneda = jQuery("#symbol").val();

    let totalCompra = (totalPagar - descuentoCupon - descuentoMetodoPago);
    totalCompra = totalCompra <= 0 ? 0 : totalCompra;
    if (costoEnvio > 0) totalCompra += costoEnvio;
    $("#section-costo-total").text(`${moneda}${totalCompra.toFixed(2)}`);
}

function updatePaymentMethodDiscount(id_discount_payment_method = 0) {
    const subtotal = Number(jQuery('input[name="total_pago"]').val());
    const descuentoMetodoPago = jQuery("#descuento_metodo_pago");
    const descuentoMetodoPagoPorcentaje = jQuery("#descuento_metodo_pago_porcentaje");
    const descuentoMetodoPagoId = jQuery("#descuento_metodo_pago_id");
    const sectionDescuentoMetodoPago = jQuery("#section-descuento-metodo-pago");
    const moneda = jQuery("#symbol").val();
    descuentoMetodoPago.val('');
    descuentoMetodoPagoPorcentaje.val('');
    descuentoMetodoPagoId.val('');
    sectionDescuentoMetodoPago.addClass('d-none-important');
    sectionDescuentoMetodoPago.html('');

    const discount = discountsPaymentMethods.find(element => parseInt(element.id_discount_payment_method) === id_discount_payment_method);
    if (discount) {
        const percentage = Number(discount.percentage);
        const discountTotal = (subtotal * percentage) / 100;
        const message = 'Pagando con ' + (discount.all_payment_method ? 'todos los métodos de pago' : discount.payment_method);
        if (Number(discount.is_price_range)) {
            html = `<div class="d-flex flex-column">
                <span>Descuento</span>
                <small>${percentage.toFixed(0)}% OFF para pedidos superiores a ${moneda}${Number(discount.minimum_price).toFixed(2)}</small>
                <small>${message}</small>
            </div>
            <span class="text-discount">(${moneda}${discountTotal.toFixed(2)})</span>`;
        } else {
            html = `<div class="d-flex flex-column">
                <span>Descuento</span>
                <small>${percentage.toFixed(0)}% OFF</small>
                <small>${message}</small>
            </div>
            <span class="text-discount">(${moneda}${discountTotal.toFixed(2)})</span>`;
        }

        descuentoMetodoPagoPorcentaje.val(percentage);
        descuentoMetodoPago.val(discountTotal);
        descuentoMetodoPagoId.val(discount.id_discount_payment_method);
        sectionDescuentoMetodoPago.html(html);
        sectionDescuentoMetodoPago.removeClass('d-none-important');
    }
}