import os
import json
import requests
import pytesseract
from PIL import Image

# Configuración segura: lee desde el sistema operativo
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
CARPETA_CAPTURAS = "/sdcard/Termux/"
RUTA_SALIDA_JSON = "public/predicciones.json"

SYSTEM_PROMPT = """
Eres "Fútbol Deep Analyzer Elite". Analiza los datos estadísticos extraídos de las capturas de pantalla proporcionadas.
Estructura tu respuesta de forma muy limpia, usando viñetas o saltos de línea claros:
1. Resumen de Datos Extraídos
2. Análisis de Forma y Rendimiento
3. Probabilidades Calculadas (Gana Local/Empate/Visitante, Over 2.5, BTTS)
4. Recomendación de Apuesta Premium
"""

def analizar_imagenes():
    if not GROQ_API_KEY:
        print("[-] ERROR: No se detectó GROQ_API_KEY.")
        return

    print(f"[+] Escaneando capturas en: {CARPETA_CAPTURAS}")
    if not os.path.exists(CARPETA_CAPTURAS):
        print("[-] La carpeta de capturas no existe.")
        return

    extensiones = (".jpg", ".jpeg", ".png")
    archivos = [f for f in os.listdir(CARPETA_CAPTURAS) if f.lower().endswith(extensiones)]
    
    if not archivos:
        print("[-] No hay imágenes en la carpeta Termux.")
        return

    archivos.sort()
    print(f"[+] Procesando {len(archivos)} imágenes...")
    texto_consolidado = ""

    for i, archivo in enumerate(archivos, 1):
        try:
            texto = pytesseract.image_to_string(Image.open(os.path.join(CARPETA_CAPTURAS, archivo)), lang='eng')
            if texto.strip():
                texto_consolidado += f"--- CAPTURA {i} ---\n{texto}\n\n"
        except Exception as e:
            print(f"[-] Error en {archivo}: {e}")

    if not texto_consolidado.strip():
        print("[-] No se pudo extraer texto.")
        return

    print("[+] Conectando con Llama 3.3 de forma segura...")
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": texto_consolidado}
        ],
        "temperature": 0.2
    }
    
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        analisis_texto = response.json()["choices"][0]["message"]["content"]
        os.makedirs(os.path.dirname(RUTA_SALIDA_JSON), exist_ok=True)
        with open(RUTA_SALIDA_JSON, "w", encoding="utf-8") as f:
            json.dump({"analisis": analisis_texto}, f, ensure_ascii=False, indent=2)
        print("[+] ¡Análisis guardado exitosamente en JSON!")
    else:
        print(f"[-] Error en Groq API: {response.text}")

if __name__ == "__main__":
    analizar_imagenes()
