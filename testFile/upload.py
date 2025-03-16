from pymongo import MongoClient
import json

# Connexion à MongoDB (par défaut, localhost:27017)
client = MongoClient("mongodb://localhost:27017/")

# Sélection de la base de données (crée-la si elle n'existe pas)
db = client["test"]

# Sélection des collections
courses_collection = db["courses"]
specific_courses_collection = db["specificcourses"]

# Charger les données depuis le fichier JSON
try:
    with open("courses.json", "r") as file:
        data = json.load(file)

    # Insérer les cours généraux
    courses_collection.insert_many(data["courses"])
    print("Cours généraux insérés avec succès !")

    # Insérer les cours spécifiques
    specific_courses_collection.insert_many(data["specificCourses"])
    print("Cours spécifiques insérés avec succès !")

except FileNotFoundError:
    print("Erreur : Le fichier data.json n'a pas été trouvé.")
except Exception as e:
    print(f"Une erreur s'est produite : {e}")