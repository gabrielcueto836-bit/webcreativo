const formulario = document.getElementById("formulario-registro");
const password = document.getElementById("contraseña");
const password2 = document.getElementById("contraseña2");
const seguridad = document.getElementById("nivelseguridad");
const usuario = document.getElementById("nombreusuario");
const correoElectronico = document.getElementById("correo");
const botonEnviar = document.getElementById("botonenviar");
const btnLogin = document.getElementById("btn-login");
const vistaRegistro = document.getElementById("vista-registro");
const vistaLogin = document.getElementById("vista-login");
botonEnviar.disabled = true;
// para ver en vivo si la contraseña esta buena
password.addEventListener("input", actualizarFortaleza);
password.addEventListener("input", verificarPasswords);
password2.addEventListener("input", verificarPasswords);

formulario.addEventListener("submit", (e) => {
    if (!verificarPasswords() || !formulario.checkValidity()) {
        e.preventDefault();
        return;
    }

    const datosUsuario = {
        nombreusuario: usuario.value,
        email: correoElectronico.value,
        password: password.value,
        fecha: new Date().toLocaleDateString()
    };
   let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //  Verificar si ya existe el usuario
    const existe = usuarios.some(u => u.nombreusuario === datosUsuario.nombreusuario);

    if (existe) {
        alert("Ese nombre de usuario ya existe");
        return;
    }
    // Agregar nuevo usuario
    usuarios.push(datosUsuario);
    // Guardar array actualizado
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado con éxito");

    formulario.reset()
    
});



function actualizarFortaleza() {
    const valor = password.value;
    let fortaleza = 0;

    if (valor.length > 5) fortaleza += 30;
    if (valor.match(/[A-Z]/)) fortaleza += 30;
    if (valor.match(/[0-9]/)) fortaleza += 40;

    seguridad.style.width = fortaleza + "%";

    if (fortaleza < 40) seguridad.style.background = "#ef4444";
    else if (fortaleza < 70) seguridad.style.background = "#f59e0b";
    else seguridad.style.background = "#22c55e";
}



 //metodología de la pagina que te dije 

function verificarPasswords() {
    if (password.value === "" && password2.value === "") {

        botonEnviar.disabled = true;
        document.getElementById('error').classList.add('mostrar');
        document.getElementById('ok').classList.add('ocultar');
        return false;
    }

    if (password.value !== password2.value) {
        document.getElementById('error').classList.add('mostrar');
        document.getElementById('ok').classList.add('ocultar');
        botonEnviar.disabled = true;
        return false;
    } else {
        document.getElementById('error').classList.remove('mostrar');
        document.getElementById('ok').classList.remove('ocultar');
        botonEnviar.disabled = false;
        return true;
    }
}
function checkLogin() {
            event.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const inputUser = document.getElementById('userName').value;
    const inputPw = document.getElementById('userPw').value;

    const usuarioEncontrado = usuarios.find(
        u => u.nombreusuario === inputUser && u.password === inputPw
    );

    if (usuarioEncontrado) {
        alert("Inicio de sesión correcto. ¡Bienvenido " + usuarioEncontrado.nombreusuario + "!");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }   

                
            }

function mostrarLogin(){
    vistaRegistro.style.display = "none";
    vistaLogin.style.display = "block";
}
function mostrarRegistro(){
    vistaLogin.style.display = "block";
    vistaRegistro.style.display = "none"
}
