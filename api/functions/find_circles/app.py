import asyncio
import json
from lib.flow import exchange, read_edges
from lib.graph import find_circles

def lambda_handler(event, context):
    loop = asyncio.get_event_loop()
    result = loop.run_until_complete(
        asyncio.gather(
            _worker()
        )
    )[0]
    return result

async def _worker():
    try:
        edges = await read_edges()
        circles = find_circles(edges)
        for circle in circles:
            await exchange(circle)
        return json.dumps({'circles': circles})
    except Exception as e:
        print(e)
 