const btn = document.getElementById("btn-contacto");


function solicitar(name) {
    let msj = "Me interesa este producto: " + name
        + "%0AQuiero más información, por favor..."

    window.open('https://api.whatsapp.com/send?phone=51980572154&text=' + msj)
}

function mostrarAlerta(mensaje, color) {
    Toastify({
        text: (mensaje).toUpperCase(),
        style: {
            background: color,
        },
        duration: 1500
    }).showToast();
}

function isValidated(elements) {
    var results, errors = 0;

    if (elements.length) {
        for (var j = 0; j < elements.length; j++) {

            var $input = $(elements[j]);
            if ((results = $input.regula('validate')).length) {
                for (k = 0; k < results.length; k++) {
                    errors++;
                    $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                }
            } else {
                $input.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        }

        return errors === 0;
    }
    return true;
}

document.getElementById("formContacto")
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.textContent = 'Enviando...';
        btn.disabled = true;
        btn.style.backgroundColor = "#151515";
        const serviceID = 'service_63jh0i3';
        const templateID = 'template_wri3adh';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.disabled = false;
                btn.textContent = 'Enviar';
                btn.style.backgroundColor = "#f5543f";
                document.getElementById('formContacto').reset();
                mostrarAlerta('Mensaje enviado con éxito!', '#0062cc');
            }, (err) => {
                console.log(err);
                btn.disabled = false;
                btn.textContent = 'Enviar';
                btn.style.backgroundColor = "#f5543f";
                mostrarAlerta('Ocurrió un error, volver a intentar!', 'orange');
            });

    });
