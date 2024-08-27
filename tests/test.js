const {remote} = require('webdriverio');

const dotenv = require('dotenv')

dotenv.config()


const capabilities = {
    platformName: 'Android',
    'appiump:platformVersion' : '15',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Pixel 8 API 35',
    'appium:app': process.env.RUTA_APK,   
    'appium:appPackage': 'com.android.settings',
    'appium:appActivity': '.Settings',
  };


  const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4724,
    logLevel: 'info',
    capabilities,
  };



    /*
      //localizamos los elementos para efectuar el login.
      const usuarioInput = await driver.$('com.example.beta:id/campoUsuario');
      const contrasenia = await driver.$('//android.widget.EditText[@resource-id="com.example.beta:id/campoContrasena"]');
      const btnLogin = await driver.$('//android.widget.Button[@resource-id="com.example.beta:id/botonIniciarSesion"]');

      await usuarioInput.sendKeys(process.env.USUARIO)
      await contrasenia.sendKeys(process.env.PASSWORD);
      await btnLogin.click()
*/


async function runTest() {
  const driver = await remote(wdOpts);
  try {
    /* Localización del campo de usuario por resource-id
    const usuarioInput = await driver.$('~com.example.beta:id/campoUsuario'); // Usar la notación ~ si el id no funciona, puedes probar con `by.resourceId`
    */
    
    // Localización del campo de contraseña por XPath
    /*
    const contrasenia = await driver.$('//android.widget.EditText[@resource-id="com.example.beta:id/campoContrasena"]');
    */
    
    /* Localización del botón de login por XPath
    
    const btnLogin = await driver.$('//android.widget.Button[@resource-id="com.example.beta:id/botonIniciarSesion"]');
    */
 
    await driver.pause(5000);

    const usuarioInput = await driver.$('//*[@text="usuario"]');
    const contrasenia = await driver.$('//*[@text="contraseña"]');
    const btnLogin = await driver.$('//*[@text="Iniciar Sesión"]');

    // Acción en los campos

    await usuarioInput.setValue(process.env.USUARIO);
    await contrasenia.setValue(process.env.PASSWORD);
    await btnLogin.click();


  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

  
  runTest().catch(console.error)



/*
{
  "platformName": "Android",
  "platformVersion": "15.0.0",
  "automationName": "UiAutomator2",
  "deviceName": "Pixel 8 API 35",
  "app": "C:/Users/Usuario/Desktop/versiones-beta-de-agosto/Android-egyt/app/build/outputs/apk/debug/app-debug.apk"
}










1. Compatibilidad entre Versiones de Appium y Appium Inspector
La discrepancia entre las versiones de Node.js que muestra Appium y la instalada globalmente en tu sistema podría ser relevante. 
Appium Inspector parece estar usando una versión diferente de Node.js (14.16.0), mientras que la versión global en tu sistema es 20.17.0.
 Aunque esto generalmente no debería causar problemas, puede haber una incompatibilidad entre las versiones de Appium Inspector y el servidor de Appium.

Acción recomendada:
Actualiza Appium Inspector a la versión más reciente para asegurar la compatibilidad con Appium 2.11.3.
Verifica la compatibilidad en la documentación de Appium Inspector respecto a la versión de Appium que estás usando.


2. Configuración del Servidor y URL
Asegúrate de que el Inspector de Appium esté apuntando a la URL correcta que corresponde al puerto en el que el servidor de Appium está escuchando.

Acción recomendada:

Usa http://127.0.0.1:4724/ o http://localhost:4724/ como la URL del servidor en el Inspector de Appium.
Asegúrate de que no haya configuraciones en el Firewall o Antivirus que puedan estar bloqueando el puerto 4724.


3. Verificación de Capacidades
Las capacidades parecen correctas, pero asegúrate de lo siguiente:

platformVersion: Confirma que estás usando el formato correcto y que es compatible con el emulador. En este caso, 15 debería ser válido para la API 35 de Android.
deviceName: Verifica que el nombre del dispositivo sea exacto y coincida con el nombre del emulador en la configuración.
Acción recomendada:

Verifica el nombre del dispositivo con el comando adb devices para asegurarte de que coincide con Pixel 8 API 35.
4. Versiones y Configuración de Node.js
La versión de Node.js que muestra Appium Inspector es más antigua que la versión instalada globalmente. Aunque esto no debería ser un problema mayor, 
asegúrate de que no haya incompatibilidades.

Acción recomendada:

Reinstala Appium Inspector para asegurarte de que esté utilizando una versión de Node.js compatible.
Verifica en la documentación de Appium Inspector si hay alguna nota sobre la compatibilidad con versiones específicas de Node.js.}


5. Pruebas y Reinicios
A veces, reiniciar los servicios puede resolver problemas temporales. Asegúrate de seguir estos pasos:

Acción recomendada:

Reinicia tanto el servidor de Appium como el Inspector de Appium.
Cierra y vuelve a abrir el emulador para asegurar que esté funcionando correctamente.


6. Depuración de Logs
Revisa los logs del servidor de Appium para obtener más detalles sobre el error. Los logs pueden proporcionar pistas adicionales sobre lo que está fallando.

Acción recomendada:
Proporciona cualquier mensaje de error específico que aparezca en los logs del servidor de Appium o en el Inspector.

a7. Verificación del Emulador
Asegúrate de que el emulador esté funcionando y accesible:

Usa adb devices para verificar que el emulador esté listado y en estado "device".
Resumen de Pasos
Actualiza Appium Inspector a la versión más reciente.
Usa http://127.0.0.1:4724/ o http://localhost:4724/ como URL del servidor en el Inspector.
Verifica que las capacidades sean correctas y que coincidan con la configuración del emulador.
Reinstala Appium Inspector si hay problemas de versión de Node.js.
Reinicia el servidor de Appium y el Inspector.
Revisa los logs para detalles adicionales sobre el error.
Confirma que el emulador esté funcionando correctamente con adb devices.
Si después de seguir estos pasos el problema persiste, por favor comparte cualquier nuevo mensaje de error o detalles adicionales que encuentres en los logs.

*/
