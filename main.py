from flask import Flask
from .tasks import tweets
# from sqlalchemy.dialects import mysql
# from sqlalchemy import types

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'


def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    import yourapplication.models
    Base.metadata.create_all(bind=engine)


@app.route("/")
def index():
    tweets.delay()
    return "delayed"

if __name__ == "__main__":
    app.debug = True
    app.run()
