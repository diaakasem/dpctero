from datashield.settings import celery_app as app

@app.task
def add(x, y):
    return x + y
