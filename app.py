import time
from flask import Flask
from flask import send_from_directory
from flask import request
import keras
from keras.preprocessing import image
from keras.applications.resnet50 import ResNet50, preprocess_input
from keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io

app = Flask(__name__, static_folder='client/dist', static_url_path='')
base_model = None
extension_model = None
dog_names = None

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
    return {'name': dog_names[np.argmax(predictions)]}
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
    extension_model = keras.models.load_model("Resnet50_v2.1.h5")

def load_dog_names():
    global dog_names
    dog_names = [
      'Affenpinscher',
      'Afghan_hound',
      'Airedale_terrier',
      'Akita',
      'Alaskan_malamute',
      'American_eskimo_dog',
      'American_foxhound',
      'American_staffordshire_terrier',
      'American_water_spaniel',
      'Anatolian_shepherd_dog',
      'Australian_cattle_dog',
      'Australian_shepherd',
      'Australian_terrier',
      'Basenji',
      'Basset_hound',
      'Beagle',
      'Bearded_collie',
      'Beauceron',
      'Bedlington_terrier',
      'Belgian_malinois',
      'Belgian_sheepdog',
      'Belgian_tervuren',
      'Bernese_mountain_dog',
      'Bichon_frise',
      'Black_and_tan_coonhound',
      'Black_russian_terrier',
      'Bloodhound',
      'Bluetick_coonhound',
      'Border_collie',
      'Border_terrier',
      'Borzoi',
      'Boston_terrier',
      'Bouvier_des_flandres',
      'Boxer',
      'Boykin_spaniel',
      'Briard',
      'Brittany',
      'Brussels_griffon',
      'Bull_terrier',
      'Bulldog',
      'Bullmastiff',
      'Cairn_terrier',
      'Canaan_dog',
      'Cane_corso',
      'Cardigan_welsh_corgi',
      'Cavalier_king_charles_spaniel',
      'Chesapeake_bay_retriever',
      'Chihuahua',
      'Chinese_crested',
      'Chinese_shar-pei',
      'Chow_chow',
      'Clumber_spaniel',
      'Cocker_spaniel',
      'Collie',
      'Curly-coated_retriever',
      'Dachshund',
      'Dalmatian',
      'Dandie_dinmont_terrier',
      'Doberman_pinscher',
      'Dogue_de_bordeaux',
      'English_cocker_spaniel',
      'English_setter',
      'English_springer_spaniel',
      'English_toy_spaniel',
      'Entlebucher_mountain_dog',
      'Field_spaniel',
      'Finnish_spitz',
      'Flat-coated_retriever',
      'French_bulldog',
      'German_pinscher',
      'German_shepherd_dog',
      'German_shorthaired_pointer',
      'German_wirehaired_pointer',
      'Giant_schnauzer',
      'Glen_of_imaal_terrier',
      'Golden_retriever',
      'Gordon_setter',
      'Great_dane',
      'Great_pyrenees',
      'Greater_swiss_mountain_dog',
      'Greyhound',
      'Havanese',
      'Ibizan_hound',
      'Icelandic_sheepdog',
      'Irish_red_and_white_setter',
      'Irish_setter',
      'Irish_terrier',
      'Irish_water_spaniel',
      'Irish_wolfhound',
      'Italian_greyhound',
      'Japanese_chin',
      'Keeshond',
      'Kerry_blue_terrier',
      'Komondor',
      'Kuvasz',
      'Labrador_retriever',
      'Lakeland_terrier',
      'Leonberger',
      'Lhasa_apso',
      'Lowchen',
      'Maltese',
      'Manchester_terrier',
      'Mastiff',
      'Miniature_schnauzer',
      'Neapolitan_mastiff',
      'Newfoundland',
      'Norfolk_terrier',
      'Norwegian_buhund',
      'Norwegian_elkhound',
      'Norwegian_lundehund',
      'Norwich_terrier',
      'Nova_scotia_duck_tolling_retriever',
      'Old_english_sheepdog',
      'Otterhound',
      'Papillon',
      'Parson_russell_terrier',
      'Pekingese',
      'Pembroke_welsh_corgi',
      'Petit_basset_griffon_vendeen',
      'Pharaoh_hound',
      'Plott',
      'Pointer',
      'Pomeranian',
      'Poodle',
      'Portuguese_water_dog',
      'Saint_bernard',
      'Silky_terrier',
      'Smooth_fox_terrier',
      'Tibetan_mastiff',
      'Welsh_springer_spaniel',
      'Wirehaired_pointing_griffon',
      'Xoloitzcuintli',
      'Yorkshire_terrier']

if __name__ == "__main__":
    load_models()
    load_dog_names()
    app.run(host='0.0.0.0')
    # app.run()
    # app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))