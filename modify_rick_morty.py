# modify_requests.py
from mitmproxy import http
import json


def request(flow: http.HTTPFlow) -> None:
    # Перехватываем HTTP запросы до редиректа
    if "rickandmortyapi.com" in flow.request.pretty_url and flow.request.pretty_url.startswith("http://"):
        print(f"🎯 Перехвачен HTTP запрос: {flow.request.pretty_url}")

        # Модифицируем ID персонажа
        if "/character/" in flow.request.pretty_url:
            original_url = flow.request.pretty_url

            # Меняем ID 1 на 2 (Rick -> Morty)
            if "/character/1" in flow.request.pretty_url:
                new_url = flow.request.pretty_url.replace(
                    "/character/1", "/character/2")
                flow.request.url = new_url
                print(f"✅ МОДИФИЦИРОВАНО: Rick (ID 1) → Morty (ID 2)")
                print(f"   URL изменен: {original_url} → {new_url}")

            # Меняем ID 2 на 3 (Morty -> Summer)
            elif "/character/2" in flow.request.pretty_url:
                new_url = flow.request.pretty_url.replace(
                    "/character/2", "/character/3")
                flow.request.url = new_url
                print(f"✅ МОДИФИЦИРОВАНО: Morty (ID 2) → Summer (ID 3)")
                print(f"   URL изменен: {original_url} → {new_url}")


def response(flow: http.HTTPFlow) -> None:
    # Логируем редиректы
    if "rickandmortyapi.com" in flow.request.pretty_url:
        print(
            f"📨 Ответ: {flow.response.status_code} - {flow.request.pretty_url}")

        if flow.response.status_code == 301:
            print(
                f"   🔄 Редирект на: {flow.response.headers.get('Location', 'Unknown')}")
