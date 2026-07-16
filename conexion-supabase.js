// 1. Configuración de Credenciales Reales de Supabase (MCD Lotes)
const SUPABASE_URL = "https://xqghmylbhrnbpskdoemn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_f_LScv6Eg1irzPY0JPQJKw_NVGixlgj";

// 2. Inicialización con un nombre único para evitar choques
const miSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Captura del formulario y control de estado
const form = document.getElementById('leadForm');
const statusText = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', async (e) => {
        // Evitamos que la página se reinicie
        e.preventDefault();
        
        // Indicamos visualmente que se está procesando
        statusText.innerText = "Enviando tus datos...";
        statusText.className = "mt-4 text-sm font-semibold text-brand-accent";

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        try {
            // Guardamos el lead apuntando a tu tabla "MCD Lotes" usando la variable corregida
            const { data, error } = await miSupabase
                .from('MCD Lotes') 
                .insert([
                    { 
                        nombre: nombre, 
                        telefono: telefono, 
                        email: email, 
                        mensaje: mensaje
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
