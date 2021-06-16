// Этот необязательный код используется для регистрации сервис-воркера.
// register () не вызывается по умолчанию.

// Это позволяет приложению загружаться быстрее при последующих посещениях в рабочей среде и дает
// это офлайн-возможности. Однако это также означает, что разработчики (и пользователи)
// будет видеть развернутые обновления только при последующих посещениях страницы, после всех
// существующие вкладки, открытые на странице, были закрыты, так как ранее были кешированы
// ресурсы обновляются в фоновом режиме.

// Чтобы узнать больше о преимуществах этой модели и инструкции о том, как
// подписаться, прочитать https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Конструктор URL доступен во всех браузерах, поддерживающих ПО.
    const publicUrl = new URL(
      (process as { env: { [key: string]: string } }).env.PUBLIC_URL,
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      // Наш сервисный работник не будет работать, если PUBLIC_URL находится в другом источнике
      // с чего обслуживается наша страница. Это может произойти, если CDN используется для
      // обслуживаем активы; см. https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Это работает на локальном хосте. Давайте проверим, существует ли сервис-воркер или нет.
        checkValidServiceWorker(swUrl, config);

        // Добавьте дополнительное ведение журнала в localhost, указав разработчикам на
        // сервисный работник / документация PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Это не localhost. Просто зарегистрируйте сервисного работника
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // На этом этапе получено обновленное предварительно кэшированное содержимое,
              // но предыдущий сервис-воркер по-прежнему будет обслуживать более старый
              // контент, пока не будут закрыты все клиентские вкладки.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Выполнить обратный вызов
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // На этом этапе все уже кэшировано.
              // Идеальное время для отображения
              // «Контент кэшируется для использования в автономном режиме». сообщение.
              console.log('Content is cached for offline use.');

              // Выполнить обратный вызов
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Проверьте, можно ли найти сервисного работника. Если не удается перезагрузить страницу.
  fetch(swUrl)
    .then(response => {
      // Убедитесь, что сервис-воркер существует и что мы действительно получаем файл JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Сервисный работник не найден. Наверное, другое приложение. Обновите страницу.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Сервисный работник найден. Действуйте как обычно.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
