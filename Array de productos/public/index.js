const socket = io({ autoConnect: false });

socket.on('productos', async (productos) => {
    try {
        const listaProductosElement = document.getElementById('listaProductos');
        if (!listaProductosElement) throw new Error('No existe elemento con id listaProductos');
        const res = await fetch('/listaProductos.hbs');
        if (!res.ok) throw new Error(res);
        const listaProductosTemplate = await res.text();
        const listaProductoCompiler = Handlebars.compile(listaProductosTemplate)
        const listaProductosHTML = listaProductoCompiler({ productos });
        listaProductosElement.innerHTML = "";
        listaProductosElement.innerHTML = listaProductosHTML;
    } catch (e) {
        console.error(e);
        let msg = e;
        if (e instanceof Response) {
            msg = `${e.status} - ${e.statusText}`;
        }
        Swal.fire({
            title: `Ocurrio un error al cargar la lista de productos: ${msg}`,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    }
});

socket.on('disconnect', (reason) => {
    console.warn(`WebSocket disconnected! Reason: ${reason}`);
    socket.connect();
});

function guardar(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    const body = new URLSearchParams(new FormData(form));

    fetch(form.action, {
        method: 'POST',
        body: body
    }).then(res => {
        if (res.ok) return res.json();
        throw res;
    }).then(data => {
        Swal.fire({
            title: `Se creo el producto con id ${data.id}`,
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        }).then((result) => {
            window.location.reload();
        });
    }).catch(err => {
        console.error(err);
        Swal.fire({
            title: `Ha ocurrido un error.\n${err}`,
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    });
}

window.addEventListener('load', () => {
    socket.connect();
});




socket.on('messages', data => {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map(function (elem, index) {
        const date = new Date(elem.fecha);
        const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return (
            `
            <div>
            <b style="color:blue;">[${elem.email}]</b>
            <label style="color:brown;">${dateString}:</label>
            <i style="color:green;">${elem.texto}</i>
            </div>
            `
        )
    }).join(" ");

    document.getElementById('mensajes').innerHTML = html;
    return;
}

function addMessage(e) {
    let mensaje = {
        email: document.getElementById('email').value,
        texto: document.getElementById('text').value
    };

    socket.emit('new-message', mensaje);
    document.getElementById('text').value = '';
    return false;
}
