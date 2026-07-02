import socket

def clean_target(target):
    return target.replace("https://", "").replace("http://", "").split("/")[0].strip()

def resolve_target(target):
    try:
        cleaned = clean_target(target)
        return socket.gethostbyname(cleaned)
    except Exception:
        return None