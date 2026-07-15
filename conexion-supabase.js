// 1. Configuración de Credenciales de Supabase
const SUPABASE_URL = "https://eqpgpeubuhndyuybreca.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Emty_z6kOItvo_DKUC7OzA_tNbFShWe";

// 2. Inicialización del Cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Captura del formulario y control de estado
const form = document.getElementById('leadForm');
const statusText = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Indicamos visualmente que se está procesando
        statusText.innerText = "Enviando tus datos...";
        statusText.className = "mt-4 text-sm font-semibold text-brand-accent";

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        try {
            // Guardamos el lead en la base de datos
            const { data, error } = await supabase
                .from('leads')
                .insert([
                    { 
                        nombre: nombre, 
                        telefono: telefono, 
                        email: email, 
                        mensaje: mensaje,
                        created_at: new Date()
                    }
                ]);

            if (error) {
                throw error;
            }

            // Éxito
            statusText.innerText = "¡Excelente! Nos pondremos en contacto contigo muy pronto.";
            statusText.className = "mt-4 text-sm font-semibold text-green-400";
            form.reset();

        } catch (error) {
            console.error("Error al registrar el lead en Supabase:", error);
            statusText.innerText = "Hubo un error al guardar tu solicitud. Intenta de nuevo o contáctanos por WhatsApp.";
            statusText.className = "mt-4 text-sm font-semibold text-red-400";
        }
    });
}