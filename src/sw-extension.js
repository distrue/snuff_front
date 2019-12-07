console.log("Service Worker Loaded");

function getEndpoint() {
	return self.registration.pushManager.getSubscription().then((subscription) => {
		if (subscription) {
			return subscription.endpoint;
		}

		throw new Error('User not subscribed');
	});
}

self.addEventListener('push', (event) => {
	event.waitUntil(getEndpoint()
		.then((endpoint) => {
			return fetch(`myurl`, {
				headers: {}
			});
		})
		.then(response => response.json())
		.then((data) => {
			let cont = {
				body: data.body,
				icon: data.icon,
			};
			if (
				typeof data.click_action !== 'undefined' &&
					data.click_action &&
					typeof data.click_title !== 'undefined' &&
					data.click_title
			) {
				cont.data = { url: data.click_action };
				cont.actions = [{ action: 'open_url', title: data.click_title }];
			}
			self.registration.showNotification(data.title, cont);
		}));
});

self.addEventListener(
	'notificationclick',
	(event) => {
		switch (event.action) {
		case 'open_url':
			clients.openWindow(event.notification.data.url);
			break;
		}
		// Close notification after click and open the PWA if we've clicked the notification itself.
		event.notification.close();
		if (clients.openWindow && event.notification.data.url) {
			event.waitUntil(clients.openWindow(event.notification.data.url));
		}
	},
	false
);

self.addEventListener("activate", evt => {
	// activate 이벤트 발생 시 실행할 이벤트 리스너 등록
	evt.waitUntil(
	  caches.keys().then(keyList => {
		return Promise.all(
		  keyList.map(key => {
			if (key !== CACHE_NAME) {
			  // 캐시의 키가 변했다면
			  return caches.delete(key);
			  // 캐시 삭제
			}
		  })
		);
	  })
	);
	self.clients.claim();
  });