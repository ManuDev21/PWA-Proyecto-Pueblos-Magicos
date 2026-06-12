"""Utilidades compartidas de servicios."""


def maps_url(lat, lng, nombre: str = "") -> str:
    """Construye una URL de Google Maps para una experiencia."""
    if lat is None or lng is None:
        query = nombre.replace(" ", "+") + "+Isla+Mujeres"
        return f"https://www.google.com/maps/search/?api=1&query={query}"
    return f"https://www.google.com/maps/search/?api=1&query={lat},{lng}"
