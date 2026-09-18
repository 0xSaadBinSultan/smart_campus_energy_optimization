"""
Tests for GridWise Dashboard UI and Static Files.
"""

from fastapi.testclient import TestClient
import main


def test_ui_dashboard_route_serves_html():
    client = TestClient(main.app)
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "GridWise" in response.text
    assert "CAMPUS ENERGY OS" in response.text


def test_ui_dashboard_alias_route():
    client = TestClient(main.app)
    response = client.get("/dashboard")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "GridWise" in response.text


def test_static_assets_serve_correctly():
    client = TestClient(main.app)
    css = client.get("/static/styles.css")
    assert css.status_code == 200
    assert "text/css" in css.headers["content-type"]

    js = client.get("/static/app.js")
    assert js.status_code == 200
    assert "javascript" in js.headers["content-type"]
