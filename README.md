setup:
deactivate
rm -rf venv/
virtualenv venv
source venv/bin/activate
pip install tensorflow==2.3.0 flask gunicorn numpy pillow keras==2.3.1
pip freeze > requirements.txt

run:
gunicorn app:app

todo: setup so heroku will build the react app during deploy (currently it's prebuilt in client/dist) 