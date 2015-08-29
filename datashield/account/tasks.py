from datashield.settings import celery_app as celery

@celery.task
def add(x, y):
    return x + y
