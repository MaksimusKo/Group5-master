from fastapi import FastAPI, WebSocket
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from starlette.websockets import WebSocketDisconnect
import json

engine = create_engine("sqlite:///db.sqlite", connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(engine)
Base = declarative_base()

app = FastAPI()

# class Value(Base):
#     __tablename__ = "value"
#     id = Column(Integer, primary_key=True, index=True)
#     value = Column(Float, nullable=False)
#     timestamp = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

# async def fetch_coin_value(websocket: WebSocket):
#     try:
#         while True:
#             API = requests.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH').json()
#             API2 = requests.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC').json()
#             eth_value = API['data']['rates']['USD']
#             btc_value = API2['data']['rates']['USD']
#
#             await websocket.send_text(json.dumps({"ETH_Value_USD": eth_value}))
#             await websocket.send_text(json.dumps({"BTC_Value_USD": btc_value}))
#             await asyncio.sleep(0.1)
#     except Exception as e:
#         print("Error:", e)
connected_clients = []


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            data_type = next(iter(message))

            if data_type == "pow":
                af3 = json.loads(data)["pow"][:5]
                f7 = json.loads(data)["pow"][5:10]
                f3 = json.loads(data)["pow"][10:15]
                fc5 = json.loads(data)["pow"][15:20]
                t7 = json.loads(data)["pow"][20:25]
                await broadcast_message_pow({"af3": af3, "f7": f7, "f3": f3, "fc5": fc5, "t7": t7})
            elif data_type == "met":
                eng = json.loads(data)["met"][1]
                exc = json.loads(data)["met"][3]
                lex = json.loads(data)["met"][5]
                str = json.loads(data)["met"][6]
                rel = json.loads(data)["met"][8]
                int = json.loads(data)["met"][10]
                foc = json.loads(data)["met"][12]
                await broadcast_message_met({"eng": eng, "exc": exc, "lex": lex, "str123": str, "rel": rel, "int": int, "foc": foc})
            elif data_type == "mot":
                ACCX = json.loads(data)["mot"][6]
                ACCY = json.loads(data)["mot"][7]
                ACCZ = json.loads(data)["mot"][8]
                await broadcast_message_mot({"ACCX": ACCX, "ACCY":ACCY,"ACCZ":ACCZ})

    except WebSocketDisconnect:
        connected_clients.remove(websocket)
        print("WebSocket main disconnected")


async def broadcast_message_mot(message: dict):
    for client in connected_clients:
        await client.send_text(json.dumps(message))

async def broadcast_message_pow(message: dict):
    for client in connected_clients:
        await client.send_text(json.dumps(message))


# @app.websocket("/ws_met")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     connected_clients.append(websocket)
#
#     try:
#         while True:
#             data = await websocket.receive_text()
#             eng = json.loads(data)["met"][1]
#             exc = json.loads(data)["met"][3]
#             str = json.loads(data)["met"][6]
#             await broadcast_message_met({"eng": eng, "exc": exc, "str123": str})
#     except WebSocketDisconnect:
#         connected_clients.remove(websocket)
#         print("WebSocket met disconnected")


async def broadcast_message_met(message: dict):
    for client in connected_clients:
        await client.send_text(json.dumps(message))


@app.get("/", response_class=HTMLResponse)
async def read_root():
    return templates.TemplateResponse("index.html", {"request": {}})


@app.get("/epocX", response_class=HTMLResponse)
async def read_epocX():
    return templates.TemplateResponse("epocX.html", {"request": {}})


@app.get("/shimmer", response_class=HTMLResponse)
async def read_shimmer():
    return templates.TemplateResponse("shimmer.html", {"request": {}})


