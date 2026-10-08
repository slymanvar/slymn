(() => {
  const keys = ['title','intro','email','app','topic','question','bug','subscription','suggestion','other','message','details','attachment','fileHelp','privacy','servicePrivacy','send','direct','fileError','sending'];
  const rows = {
    en: ['Contact support','Write your question or describe the problem. We will reply by email.','Your email','Application','Topic','Question','Problem / bug','Subscription / purchase','Suggestion','Other','Message','Device, iOS and app version (optional)','Screenshot (optional)','PNG, JPG or WebP, up to 10 MB. Remove private information from the image.','Your email, message and any image are sent through FormSubmit to SLYMN to answer your request. FormSubmit retains submissions for 30 days. Do not include passwords or payment details.','Service privacy policy','Send message','You can also email us directly:','Choose a PNG, JPG or WebP image smaller than 10 MB.','Sending…'],
    tr: ['Destek formu','Sorunu yaz veya yaşadığın problemi anlat. Sana e-posta ile yanıt vereceğiz.','E-posta adresin','Uygulama','Konu','Soru','Sorun / hata','Abonelik / satın alma','Öneri','Diğer','Mesajın','Cihaz, iOS ve uygulama sürümü (isteğe bağlı)','Ekran görüntüsü (isteğe bağlı)','PNG, JPG veya WebP; en fazla 10 MB. Görseldeki özel bilgileri kaldır.','E-posta adresin, mesajın ve varsa görselin, talebini yanıtlamak için FormSubmit üzerinden SLYMN’ye iletilir. FormSubmit gönderimleri 30 gün saklar. Şifre veya ödeme bilgisi ekleme.','Hizmetin gizlilik politikası','Mesajı gönder','Doğrudan e-posta da gönderebilirsin:','10 MB’den küçük bir PNG, JPG veya WebP görseli seç.','Gönderiliyor…'],
    de: ['Support kontaktieren','Stelle deine Frage oder beschreibe das Problem. Wir antworten per E-Mail.','Deine E-Mail-Adresse','App','Thema','Frage','Problem / Fehler','Abonnement / Kauf','Vorschlag','Sonstiges','Nachricht','Gerät, iOS- und App-Version (optional)','Screenshot (optional)','PNG, JPG oder WebP, bis 10 MB. Entferne private Informationen aus dem Bild.','Deine E-Mail-Adresse, Nachricht und das Bild werden über FormSubmit an SLYMN zur Beantwortung übermittelt. FormSubmit speichert Einsendungen 30 Tage. Keine Passwörter oder Zahlungsdaten angeben.','Datenschutz des Dienstes','Nachricht senden','Du kannst uns auch direkt eine E-Mail senden:','Wähle ein PNG-, JPG- oder WebP-Bild unter 10 MB.','Wird gesendet…'],
    fr: ['Contacter le support','Posez votre question ou décrivez le problème. Nous répondrons par e-mail.','Votre adresse e-mail','Application','Sujet','Question','Problème / erreur','Abonnement / achat','Suggestion','Autre','Message','Appareil, version iOS et de l’application (facultatif)','Capture d’écran (facultatif)','PNG, JPG ou WebP, jusqu’à 10 Mo. Retirez les informations privées de l’image.','Votre e-mail, message et image sont transmis à SLYMN via FormSubmit pour répondre à votre demande. FormSubmit conserve les envois pendant 30 jours. N’incluez pas de mots de passe ni de données de paiement.','Confidentialité du service','Envoyer le message','Vous pouvez aussi nous écrire directement :','Choisissez une image PNG, JPG ou WebP de moins de 10 Mo.','Envoi en cours…'],
    es: ['Contactar con soporte','Escribe tu pregunta o describe el problema. Responderemos por correo electrónico.','Tu correo electrónico','Aplicación','Tema','Pregunta','Problema / error','Suscripción / compra','Sugerencia','Otro','Mensaje','Dispositivo y versiones de iOS y de la app (opcional)','Captura de pantalla (opcional)','PNG, JPG o WebP, hasta 10 MB. Elimina la información privada de la imagen.','Tu correo, mensaje e imagen se envían a SLYMN mediante FormSubmit para responder a tu solicitud. FormSubmit conserva los envíos durante 30 días. No incluyas contraseñas ni datos de pago.','Privacidad del servicio','Enviar mensaje','También puedes escribirnos directamente:','Elige una imagen PNG, JPG o WebP de menos de 10 MB.','Enviando…'],
    it: ['Contatta l’assistenza','Scrivi la tua domanda o descrivi il problema. Risponderemo via e-mail.','La tua e-mail','Applicazione','Argomento','Domanda','Problema / errore','Abbonamento / acquisto','Suggerimento','Altro','Messaggio','Dispositivo, versione iOS e dell’app (facoltativo)','Screenshot (facoltativo)','PNG, JPG o WebP, fino a 10 MB. Rimuovi le informazioni private dall’immagine.','E-mail, messaggio e immagine vengono inviati a SLYMN tramite FormSubmit per rispondere alla richiesta. FormSubmit conserva gli invii per 30 giorni. Non includere password o dati di pagamento.','Privacy del servizio','Invia messaggio','Puoi anche scriverci direttamente:','Scegli un’immagine PNG, JPG o WebP inferiore a 10 MB.','Invio in corso…'],
    ja: ['サポートへのお問い合わせ','質問や問題の詳細をご記入ください。メールで返信します。','メールアドレス','アプリ','お問い合わせの種類','質問','問題・不具合','購読・購入','提案','その他','メッセージ','端末・iOS・アプリのバージョン（任意）','スクリーンショット（任意）','PNG、JPG、WebP、最大10 MB。画像から個人情報を削除してください。','メールアドレス、メッセージ、画像は、お問い合わせへの回答のためFormSubmit経由でSLYMNに送信されます。FormSubmitは送信内容を30日間保存します。パスワードや支払い情報を含めないでください。','サービスのプライバシーポリシー','送信する','メールで直接お問い合わせもできます：','10 MB未満のPNG、JPG、WebP画像を選択してください。','送信中…'],
    ko: ['지원 문의','질문이나 문제를 자세히 적어 주세요. 이메일로 답변해 드립니다.','이메일 주소','앱','문의 유형','질문','문제 / 오류','구독 / 구매','제안','기타','메시지','기기, iOS 및 앱 버전 (선택)','스크린샷 (선택)','PNG, JPG, WebP, 최대 10 MB. 이미지에서 개인정보를 지워 주세요.','이메일, 메시지 및 이미지는 문의에 답변하기 위해 FormSubmit을 통해 SLYMN으로 전송됩니다. FormSubmit은 제출 내용을 30일간 보관합니다. 비밀번호나 결제 정보를 포함하지 마세요.','서비스 개인정보 처리방침','메시지 보내기','이메일로 직접 문의할 수도 있습니다:','10 MB 미만의 PNG, JPG 또는 WebP 이미지를 선택하세요.','전송 중…']
  };
  const form = document.getElementById('supportRequest');
  if (!form) return;
  const button = form.querySelector('button[type=submit]');
  const attachment = form.elements.attachment;
  const error = document.getElementById('support-validation');
  const app = {'daily-planner-support.html':'Daily Planner','freebie-support.html':'K-POP FREEBIE','svar-support.html':'SVAR','svrl-support.html':'SVRL'}[location.pathname.split('/').pop()];
  if (app) form.elements.application.value = app;
  let language = 'en';
  const normalise = value => String(value || '').toLowerCase().split(/[-_]/)[0];
  function apply(value) {
    language = rows[normalise(value)] ? normalise(value) : 'en';
    const copy = Object.fromEntries(keys.map((key,index) => [key, rows[language][index]]));
    document.querySelectorAll('[data-support-text]').forEach(el => { el.textContent = copy[el.dataset.supportText]; });
    attachment.setCustomValidity('');
    error.hidden = true;
  }
  const select = document.getElementById('language');
  if (!select) {
    apply([new URLSearchParams(location.search).get('lang'),...(navigator.languages || [navigator.language])].find(value => rows[normalise(value)]));
  } else {
    apply(new URLSearchParams(location.search).get('lang') || select.value);
    select.addEventListener('change', () => apply(select.value));
    new MutationObserver(() => apply(document.documentElement.lang)).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
    window.addEventListener('slymn:language', e => apply(e.detail));
  }
  function validFile() {
    const file = attachment.files[0];
    const valid = !file || (file.size <= 10000000 && ['image/png','image/jpeg','image/webp'].includes(file.type));
    const message = rows[language][18];
    attachment.setCustomValidity(valid ? '' : message);
    error.hidden = valid;
    error.textContent = valid ? '' : message;
    return valid;
  }
  attachment.addEventListener('change', validFile);
  form.addEventListener('submit', event => {
    if (!validFile() || !form.checkValidity()) {event.preventDefault();form.reportValidity();return;}
    form.elements._subject.value = 'SLYMN — '+form.elements.application.value+' — '+form.elements.topic.value;
    button.disabled = true;
    button.textContent = rows[language][19];
    // Native multipart POST preserves attachments and the provider's CAPTCHA/error flow.
  });
  window.addEventListener('pageshow', () => {button.disabled = false;apply(select ? select.value : language);validFile();});
})();
