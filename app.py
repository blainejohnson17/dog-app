import time
from flask import Flask
from flask import send_from_directory
from flask import request
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io
import constants as const

app = Flask(__name__, static_folder='client/dist', static_url_path='')
base_model = None
extension_model = None

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/predictions', methods=['POST'])
def predict_breed():
    print(request.files['file'])
    image = request.files["file"].read()
    
    # image = io.BytesIO(image)
    features = extract_Resnet50(path_to_tensor(image))
    predictions = extension_model.predict(features)
    return {'name': const.DOG_NAMES[np.argmax(predictions)]}
    # return {'name': dog_names()[0]}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

def path_to_tensor(img):
    img = Image.open(io.BytesIO(img))
    if img.mode != "RGB":
      img = img.convert("RGB")

    img = img.resize((224, 224))
    # img = image.load_img()
    # img = image.load_img(BytesIO(base64.b64decode(img_data)),
                                            # target_size=(224, 224))
    # loads RGB image as PIL.Image.Image type
    # img = image.load_img(img_data, target_size=(224, 224))
    # convert PIL.Image.Image type to 3D tensor with shape (224, 224, 3)
    x = img_to_array(img)
    # convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    return np.expand_dims(x, axis=0)

def extract_Resnet50(tensor):
    return base_model.predict(preprocess_input(tensor))

def load_models():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras, but you can
    # substitute in your own networks just as easily)
    global base_model
    base_model = ResNet50(weights="imagenet", include_top=False)
    global extension_model
    extension_model = tensorflow.keras.models.load_model("Resnet50_v2.1.h5")

load_models()